import json
import math
import os
import re
from typing import Any

from models import ClassificationCache, db
from services.constants import ALLOWED_CATEGORIES, CATEGORY_ALIASES, RULE_KEYWORDS, WEIGHT_HINTS_LBS
from services.quote_engine import billable_weight_lbs


DEFAULT_LLM_MODEL = "openai/gpt-oss-20b"
MAX_REASONABLE_WEIGHT_LBS = 150.0


def normalize_title(value: str | None) -> str:
    text = re.sub(r"[^a-z0-9]+", " ", (value or "").lower())
    return re.sub(r"\s+", " ", text).strip()


def coerce_category(value: str | None) -> str | None:
    normalized = normalize_title(value)
    if not normalized:
        return None
    if normalized in ALLOWED_CATEGORIES:
        return normalized
    if normalized in CATEGORY_ALIASES:
        return CATEGORY_ALIASES[normalized]
    for alias, category in CATEGORY_ALIASES.items():
        if alias in normalized:
            return category
    return None


def parse_weight_lbs(value: Any) -> float | None:
    if value in (None, ""):
        return None
    try:
        weight = float(value)
    except (TypeError, ValueError):
        return None
    if weight <= 0 or weight > MAX_REASONABLE_WEIGHT_LBS:
        return None
    return round(weight, 2)


def classify_by_rules(title: str, breadcrumb: str | None, variant: str | None) -> tuple[str | None, str | None]:
    searchable = " ".join(filter(None, [normalize_title(title), normalize_title(breadcrumb), normalize_title(variant)]))
    for category, keywords in RULE_KEYWORDS:
        if any(keyword in searchable for keyword in keywords):
            return category, f"Matched keyword rule for {category}"
    return None, None


def estimate_weight_by_rules(title: str, breadcrumb: str | None, variant: str | None) -> tuple[float | None, str | None]:
    searchable = " ".join(filter(None, [normalize_title(title), normalize_title(breadcrumb), normalize_title(variant)]))
    for keywords, weight_lbs in WEIGHT_HINTS_LBS:
        if any(keyword in searchable for keyword in keywords):
            return weight_lbs, f"Matched weight rule for {', '.join(keywords[:2])}"
    return None, None


def lookup_cached_classification(source: str, product_id: str | None, normalized_title: str) -> ClassificationCache | None:
    if product_id:
        cached = (
            ClassificationCache.query.filter_by(source=source, product_id=product_id)
            .order_by(ClassificationCache.manual_override.desc(), ClassificationCache.updated_at.desc())
            .first()
        )
        if cached:
            return cached

    if normalized_title:
        return (
            ClassificationCache.query.filter_by(source=source, normalized_title=normalized_title)
            .order_by(ClassificationCache.manual_override.desc(), ClassificationCache.updated_at.desc())
            .first()
        )

    return None


def persist_classification(
    *,
    source: str,
    product_id: str | None,
    title: str,
    category: str,
    estimated_weight_lbs: float,
    confidence: float,
    classification_source: str,
    reason: str | None,
    manual_override: bool,
) -> ClassificationCache:
    normalized_title = normalize_title(title)
    record = lookup_cached_classification(source, product_id, normalized_title)
    if record is None:
        record = ClassificationCache(
            source=source,
            product_id=product_id,
            normalized_title=normalized_title,
        )

    record.source = source
    record.product_id = product_id
    record.normalized_title = normalized_title
    record.category = category
    record.estimated_weight_lbs = estimated_weight_lbs
    record.confidence = confidence
    record.classification_source = classification_source
    record.reason = reason
    record.manual_override = manual_override

    db.session.add(record)
    db.session.commit()
    return record


def _llm_enabled() -> bool:
    return bool(os.environ.get("GROQ_API_KEY") or os.environ.get("LITELLM_BASE_URL"))


def normalize_litellm_model_name(model_name: str, api_base: str | None) -> str:
    normalized = (model_name or "").strip()
    if not normalized:
        return DEFAULT_LLM_MODEL

    is_groq = bool(os.environ.get("GROQ_API_KEY")) or (api_base or "").startswith("https://api.groq.com/")
    if is_groq and not normalized.startswith("groq/"):
        return f"groq/{normalized}"

    return normalized


def classify_with_llm(title: str, breadcrumb: str | None, variant: str | None) -> tuple[dict[str, Any] | None, str | None]:
    if not _llm_enabled():
        return None, "LLM enrichment unavailable"

    try:
        from litellm import completion
    except ImportError:
        return None, "LiteLLM is not installed"

    model_name = normalize_litellm_model_name(
        os.environ.get("LITELLM_MODEL", DEFAULT_LLM_MODEL),
        os.environ.get("LITELLM_BASE_URL"),
    )
    api_base = os.environ.get("LITELLM_BASE_URL")
    api_key = os.environ.get("GROQ_API_KEY") or os.environ.get("OPENAI_API_KEY")

    prompt = (
        "Classify the product into one supported shipping category and estimate its weight in pounds. "
        f"Allowed categories: {', '.join(ALLOWED_CATEGORIES)}. "
        "Return JSON only."
    )
    response_format = {
        "type": "json_schema",
        "json_schema": {
            "name": "shipping_classification",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "category": {"type": "string", "enum": list(ALLOWED_CATEGORIES)},
                    "estimated_weight_lbs": {"type": "number"},
                    "confidence": {"type": "number"},
                    "reason": {"type": "string"},
                },
                "required": ["category", "estimated_weight_lbs", "confidence", "reason"],
                "additionalProperties": False,
            },
        },
    }

    request_kwargs = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": prompt},
            {
                "role": "user",
                "content": json.dumps(
                    {
                        "title": title,
                        "breadcrumb": breadcrumb,
                        "variant": variant,
                        "allowed_categories": list(ALLOWED_CATEGORIES),
                    }
                ),
            },
        ],
        "temperature": 0,
        "response_format": response_format,
    }
    if api_base:
        request_kwargs["api_base"] = api_base
    if api_key:
        request_kwargs["api_key"] = api_key

    try:
        response = completion(**request_kwargs)
        content = response.choices[0].message.content
        payload = json.loads(content)
        category = coerce_category(payload.get("category"))
        estimated_weight_lbs = parse_weight_lbs(payload.get("estimated_weight_lbs"))
        confidence = max(0.0, min(float(payload.get("confidence", 0.0)), 1.0))
        reason = payload.get("reason")
        if not category or estimated_weight_lbs is None:
            return None, "LLM output was invalid"
        return {
            "category": category,
            "estimated_weight_lbs": estimated_weight_lbs,
            "confidence": confidence,
            "source": "llm",
            "reason": reason,
        }, None
    except Exception as exc:  # pragma: no cover - defensive around third-party network behavior
        return None, f"LLM enrichment failed: {exc}"


def classify_extension_payload(payload: dict[str, Any]) -> tuple[dict[str, Any], list[str]]:
    source = str(payload.get("source") or "").strip().lower()
    title = str(payload.get("title") or "").strip()
    product_id = payload.get("product_id")
    breadcrumb = payload.get("scraped_category_hint")
    variant = payload.get("variant")
    overrides = payload.get("overrides") or {}

    if source != "amazon":
        raise ValueError("Unsupported source")
    if not title:
        raise ValueError("Product title is required")

    warnings: list[str] = []
    normalized_title = normalize_title(title)
    override_category = coerce_category(overrides.get("category"))
    override_weight = parse_weight_lbs(overrides.get("weight_lbs"))
    scraped_weight = parse_weight_lbs(payload.get("scraped_weight_lbs"))
    cached = lookup_cached_classification(source, product_id, normalized_title)

    category = override_category
    estimated_weight = override_weight
    confidence = 1.0 if (override_category or override_weight is not None) else 0.0
    classification_source = "manual" if (override_category or override_weight is not None) else None
    reason = "Manual override applied" if classification_source == "manual" else None

    if estimated_weight is None and scraped_weight is not None:
        estimated_weight = scraped_weight
        confidence = max(confidence, 0.95)
        reason = reason or "Used scraped Amazon weight"

    if category is None or (override_weight is None and scraped_weight is None):
        llm_result, llm_warning = classify_with_llm(title, breadcrumb, variant)
        if llm_result:
            if category is None:
                category = llm_result["category"]
                classification_source = classification_source or "llm"
                reason = reason or llm_result["reason"]
            if estimated_weight is None:
                estimated_weight = llm_result["estimated_weight_lbs"]
                classification_source = classification_source or "llm"
                reason = reason or llm_result["reason"]
            confidence = max(confidence, llm_result["confidence"])
        elif llm_warning:
            warnings.append(llm_warning)

    if cached:
        if category is None:
            category = cached.category
            confidence = max(confidence, cached.confidence)
            classification_source = classification_source or "cache"
            reason = reason or cached.reason or "Used cached category"
        if estimated_weight is None:
            estimated_weight = cached.estimated_weight_lbs
            confidence = max(confidence, cached.confidence)
            classification_source = classification_source or "cache"
            reason = reason or cached.reason or "Used cached weight"

    if category is None:
        rule_category, rule_reason = classify_by_rules(title, breadcrumb, variant)
        if rule_category:
            category = rule_category
            confidence = max(confidence, 0.72)
            classification_source = classification_source or "rule"
            reason = reason or rule_reason

    if estimated_weight is None:
        rule_weight, weight_reason = estimate_weight_by_rules(title, breadcrumb, variant)
        if rule_weight is not None:
            estimated_weight = rule_weight
            confidence = max(confidence, 0.72)
            classification_source = classification_source or "rule"
            reason = reason or weight_reason

    if category is None:
        category = "other"
        confidence = max(confidence, 0.1)
        classification_source = classification_source or "rule"
        reason = reason or "Fell back to other because classification confidence was low"
        warnings.append("Category confidence was low, review before purchasing.")

    if estimated_weight is None:
        estimated_weight = 1.0
        confidence = max(confidence, 0.1)
        classification_source = classification_source or "rule"
        reason = reason or "Fell back to 1 lb because no weight was available"
        warnings.append("Weight was estimated conservatively at 1 lb.")

    result = {
        "category": category,
        "estimated_weight_lbs": estimated_weight,
        "billable_weight_lbs": billable_weight_lbs(estimated_weight),
        "confidence": round(confidence, 2),
        "source": classification_source or "rule",
        "reason": reason,
    }

    persist_classification(
        source=source,
        product_id=product_id,
        title=title,
        category=result["category"],
        estimated_weight_lbs=result["estimated_weight_lbs"],
        confidence=result["confidence"],
        classification_source=result["source"],
        reason=result["reason"],
        manual_override=result["source"] == "manual",
    )

    if result["confidence"] < 0.6:
        warnings.append("Classification confidence is low. Edit category or weight if needed.")

    return result, warnings
