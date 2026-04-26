import unittest
from unittest.mock import patch

import app as app_module  # noqa: E402
from models import db  # noqa: E402
from services.classification import classify_extension_payload  # noqa: E402


class ClassificationRuleTests(unittest.TestCase):
    def setUp(self) -> None:
        app_module.app.config.update(TESTING=True)
        with app_module.app.app_context():
            db.session.remove()
            db.drop_all()
            db.create_all()

    def test_console_rule_sets_electronics_and_realistic_weight(self) -> None:
        with app_module.app.app_context(), patch(
            "services.classification.classify_with_llm",
            return_value=(None, "LLM unavailable"),
        ):
            classification, warnings = classify_extension_payload(
                {
                    "source": "amazon",
                    "page_url": "https://www.amazon.com/dp/B000TEST06",
                    "product_id": "B000TEST06",
                    "title": "Newest Play Station 5 Digital Edition PS 5 Gaming Console (Disc Free) Console (Renewed)",
                    "scraped_weight_lbs": None,
                    "scraped_category_hint": None,
                    "overrides": {"category": None, "weight_lbs": None},
                }
            )

        self.assertEqual(classification["category"], "electronics")
        self.assertGreaterEqual(classification["estimated_weight_lbs"], 7.0)
        self.assertGreaterEqual(classification["billable_weight_lbs"], 7)
        self.assertEqual(classification["source"], "rule")
        self.assertNotIn("Weight was estimated conservatively at 1 lb.", warnings)

    def test_headset_for_ps5_does_not_inherit_console_weight(self) -> None:
        with app_module.app.app_context(), patch(
            "services.classification.classify_with_llm",
            return_value=(None, "LLM unavailable"),
        ):
            classification, warnings = classify_extension_payload(
                {
                    "source": "amazon",
                    "page_url": "https://www.amazon.com/dp/B0C1MWBQLZ",
                    "product_id": "B0C1MWBQLZ",
                    "title": "NUBWO Wireless Gaming Headset with Mic for Ps5 Ps4 PC, Triple Mode All Devices Compatible - Blue",
                    "scraped_weight_lbs": None,
                    "scraped_category_hint": None,
                    "overrides": {"category": None, "weight_lbs": None},
                }
            )

        self.assertEqual(classification["category"], "electronics")
        self.assertLessEqual(classification["estimated_weight_lbs"], 2.0)
        self.assertLessEqual(classification["billable_weight_lbs"], 2)
        self.assertEqual(classification["source"], "rule")
        self.assertNotIn("Weight was estimated conservatively at 1 lb.", warnings)


if __name__ == "__main__":
    unittest.main()
