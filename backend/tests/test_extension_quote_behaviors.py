import os
import unittest
from unittest.mock import patch

import app as app_module  # noqa: E402
from models import db  # noqa: E402
from services.classification import classify_extension_payload, normalize_litellm_model_name  # noqa: E402


class ExtensionQuoteBehaviorTests(unittest.TestCase):
    def setUp(self) -> None:
        app_module.app.config.update(
            TESTING=True,
            EXTENSION_BEARER_TOKEN="test-extension-token",
            EXTENSION_RATE_LIMIT=60,
            EXTENSION_RATE_WINDOW_SECONDS=60,
        )
        app_module.extension_rate_limiter._requests.clear()
        self.client = app_module.app.test_client()
        with app_module.app.app_context():
            db.session.remove()
            db.drop_all()
            db.create_all()

    def _auth_headers(self) -> dict[str, str]:
        return {"Authorization": "Bearer test-extension-token"}

    def test_groq_models_are_normalized_for_litellm(self) -> None:
        with patch.dict(
            os.environ,
            {
                "GROQ_API_KEY": "test-groq-key",
                "LITELLM_BASE_URL": "https://api.groq.com/openai/v1",
            },
            clear=False,
        ):
            self.assertEqual(
                normalize_litellm_model_name("openai/gpt-oss-20b", os.environ["LITELLM_BASE_URL"]),
                "groq/openai/gpt-oss-20b",
            )
            self.assertEqual(
                normalize_litellm_model_name("groq/openai/gpt-oss-20b", os.environ["LITELLM_BASE_URL"]),
                "groq/openai/gpt-oss-20b",
            )

    def test_llm_category_overrides_scraped_category_and_scraped_weight_wins(self) -> None:
        with app_module.app.app_context(), patch(
            "services.classification.classify_with_llm",
            return_value=(
                {
                    "category": "shoes",
                    "estimated_weight_lbs": 1.4,
                    "confidence": 0.91,
                    "source": "llm",
                    "reason": "Matched footwear keywords from the title",
                },
                None,
            ),
        ) as llm_mock:
            classification, warnings = classify_extension_payload(
                {
                    "source": "amazon",
                    "page_url": "https://www.amazon.com/dp/B000TEST03",
                    "product_id": "B0C4DZGKYZ",
                    "title": "SERNIAL Womens White Tennis Shoes PU Leather Sneakers Casual Walking Shoes for Women",
                    "scraped_weight_lbs": 2.4,
                    "scraped_category_hint": "clothing",
                    "overrides": {"category": None, "weight_lbs": None},
                }
            )

        self.assertEqual(classification["category"], "shoes")
        self.assertEqual(classification["billable_weight_lbs"], 3)
        self.assertEqual(classification["estimated_weight_lbs"], 2.4)
        self.assertEqual(classification["source"], "llm")
        self.assertEqual(warnings, [])
        llm_mock.assert_called_once()

    def test_invalid_llm_output_falls_back_to_safe_defaults(self) -> None:
        with app_module.app.app_context(), patch(
            "services.classification.classify_by_rules",
            return_value=(None, None),
        ), patch(
            "services.classification.classify_with_llm",
            return_value=(None, "LLM output was invalid"),
        ):
            classification, warnings = classify_extension_payload(
                {
                    "source": "amazon",
                    "page_url": "https://www.amazon.com/dp/B000TEST04",
                    "product_id": "B000TEST04",
                    "title": "Mystery Product Bundle",
                    "scraped_weight_lbs": None,
                    "scraped_category_hint": None,
                    "overrides": {"category": None, "weight_lbs": None},
                }
            )

        self.assertEqual(classification["category"], "other")
        self.assertEqual(classification["estimated_weight_lbs"], 1.0)
        self.assertEqual(classification["billable_weight_lbs"], 1)
        self.assertIn("LLM output was invalid", warnings)
        self.assertIn("Classification confidence is low. Edit category or weight if needed.", warnings)

    def test_extension_quote_rate_limits_repeated_requests(self) -> None:
        app_module.app.config["EXTENSION_RATE_LIMIT"] = 1
        first_response = self.client.post(
            "/extension/quote",
            headers=self._auth_headers(),
            json={
                "source": "amazon",
                "page_url": "https://www.amazon.com/dp/B000TEST05",
                "product_id": "B000TEST05",
                "title": "Cotton T-Shirt",
                "price_usd": 50.0,
                "currency": "USD",
                "scraped_weight_lbs": 1.0,
                "scraped_category_hint": "clothing",
                "overrides": {"category": None, "weight_lbs": None},
            },
        )

        second_response = self.client.post(
            "/extension/quote",
            headers=self._auth_headers(),
            json={
                "source": "amazon",
                "page_url": "https://www.amazon.com/dp/B000TEST05",
                "product_id": "B000TEST05",
                "title": "Cotton T-Shirt",
                "price_usd": 50.0,
                "currency": "USD",
                "scraped_weight_lbs": 1.0,
                "scraped_category_hint": "clothing",
                "overrides": {"category": None, "weight_lbs": None},
            },
        )

        self.assertEqual(first_response.status_code, 200)
        self.assertEqual(second_response.status_code, 429)
        self.assertEqual(second_response.get_json(), {"error": "Rate limit exceeded"})


if __name__ == "__main__":
    unittest.main()
