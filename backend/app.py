import os
import threading
import time
from collections import defaultdict, deque
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db
from services.classification import classify_extension_payload
from services.quote_engine import generate_quote_breakdown


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///" + os.path.join(app.root_path, "data.db")
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "fallback_secret_key")
app.config["EXTENSION_BEARER_TOKEN"] = os.environ.get("EXTENSION_BEARER_TOKEN", "")
app.config["EXTENSION_RATE_LIMIT"] = int(os.environ.get("EXTENSION_RATE_LIMIT", "60"))
app.config["EXTENSION_RATE_WINDOW_SECONDS"] = int(
    os.environ.get("EXTENSION_RATE_WINDOW_SECONDS", "60")
)

db.init_app(app)
app.app_context().push()

_raw_origins = os.environ.get("CORS_ORIGINS", "http://localhost:5173")
allowed_origins = [origin.strip() for origin in _raw_origins.split(",") if origin.strip()]
CORS(app, origins=allowed_origins, supports_credentials=True)


class InMemoryRateLimiter:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._requests: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str, limit: int, window_seconds: int) -> bool:
        now = time.time()
        with self._lock:
            queue = self._requests[key]
            while queue and now - queue[0] > window_seconds:
                queue.popleft()
            if len(queue) >= limit:
                return False
            queue.append(now)
            return True


extension_rate_limiter = InMemoryRateLimiter()


with app.app_context():
    db.create_all()


def initialize_db() -> None:
    db.drop_all()
    db.create_all()


def _require_extension_auth() -> tuple[dict[str, str], int] | None:
    expected_token = app.config.get("EXTENSION_BEARER_TOKEN", "").strip()
    if not expected_token:
        return None

    auth_header = request.headers.get("Authorization", "")
    scheme, _, provided_token = auth_header.partition(" ")
    if scheme != "Bearer" or provided_token != expected_token:
        return {"error": "Unauthorized"}, 401

    return None


def _enforce_extension_rate_limit() -> tuple[dict[str, str], int] | None:
    identifier = request.headers.get("Authorization") or request.remote_addr or "anonymous"
    limit = int(app.config["EXTENSION_RATE_LIMIT"])
    window_seconds = int(app.config["EXTENSION_RATE_WINDOW_SECONDS"])
    if not extension_rate_limiter.allow(identifier, limit, window_seconds):
        return {"error": "Rate limit exceeded"}, 429
    return None


def _parse_predict_request() -> tuple[float, str, int]:
    data: Any
    if request.is_json:
        data = request.get_json() or {}
        price = float(data["price"])
        category = str(data["category"])
        weight = int(data["weight"])
    else:
        data = request.form
        price = float(data["price"])
        category = str(data["category"])
        weight = int(data["weight"])

    return price, category, weight


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/init", methods=["GET"])
def init():
    initialize_db()
    return jsonify({"message": "database initialised"}), 200


@app.route("/predict", methods=["POST"])
def calculate():
    try:
        price, category, weight = _parse_predict_request()
        return jsonify(generate_quote_breakdown(category, price, weight))
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400

        # Impose a minimum billable weight of 2 lbs for the model to prevent undercharging
        prediction_weight = max(2, weight)
        
        input_data = {"category": [category], "weight": [prediction_weight]}
        input_df = pd.DataFrame(input_data)
        transformed_df = transformer.transform(input_df)
        shipping = float(model.predict(transformed_df)[0])

        tt_cost = round(price * 6.8, 2)
        tax = round(tt_cost * 0.07, 2)
        
        # Calculate base service charge (15%)
        base_service_charge = (tt_cost + tax + shipping) * 0.15
        
        # Enforce a minimum service charge (profit) of $50 TTD
        raw_service_charge = round(max(50.0, base_service_charge), 2)
        raw_total_cost = tt_cost + tax + shipping + raw_service_charge
        
        # Round final cost to the nearest ten (1-4 down, 5-9 up)
        rounded_total_cost = int((raw_total_cost + 5) // 10 * 10)
        
        # Adjust service charge so that all fees add up to the rounded final cost
        service_charge = round(rounded_total_cost - tt_cost - tax - shipping, 2)
        total_cost = float(rounded_total_cost)

@app.route("/extension/quote", methods=["POST"])
def extension_quote():
    auth_error = _require_extension_auth()
    if auth_error:
        body, status = auth_error
        return jsonify(body), status

    rate_limit_error = _enforce_extension_rate_limit()
    if rate_limit_error:
        body, status = rate_limit_error
        return jsonify(body), status

    try:
        payload = request.get_json() or {}
        title = str(payload.get("title") or "").strip()
        page_url = str(payload.get("page_url") or "").strip()
        price_usd = float(payload["price_usd"])
        currency = str(payload.get("currency") or "").strip().upper()
        if not title:
            raise ValueError("Product title is required")
        if not page_url:
            raise ValueError("Product URL is required")
        if currency != "USD":
            raise ValueError("Only USD prices are currently supported")

        classification, warnings = classify_extension_payload(payload)
        quote = generate_quote_breakdown(
            classification["category"],
            price_usd,
            classification["billable_weight_lbs"],
        )

        app.logger.info(
            "extension_quote source=%s product_id=%s category=%s weight=%s confidence=%s",
            payload.get("source"),
            payload.get("product_id"),
            classification["category"],
            classification["billable_weight_lbs"],
            classification["confidence"],
        )

        return (
            jsonify(
                {
                    "product": {
                        "title": title,
                        "product_id": payload.get("product_id"),
                        "page_url": page_url,
                        "price_usd": price_usd,
                        "currency": currency,
                    },
                    "classification": classification,
                    "quote": quote,
                    "warnings": warnings,
                }
            ),
            200,
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception:
        app.logger.exception("Failed to generate extension quote")
        return jsonify({"error": "Unable to generate quote"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003)
