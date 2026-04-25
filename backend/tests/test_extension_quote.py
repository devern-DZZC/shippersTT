import unittest

import app as app_module  # noqa: E402
from models import db  # noqa: E402


class ExtensionQuoteRouteTests(unittest.TestCase):
    def setUp(self) -> None:
        app_module.app.config.update(TESTING=True, EXTENSION_BEARER_TOKEN="test-extension-token")
        self.client = app_module.app.test_client()
        with app_module.app.app_context():
            db.session.remove()
            db.drop_all()
            db.create_all()

    def _auth_headers(self) -> dict[str, str]:
        return {"Authorization": "Bearer test-extension-token"}

    def test_extension_quote_requires_bearer_token(self) -> None:
        response = self.client.post(
            "/extension/quote",
            json={
                "source": "amazon",
                "page_url": "https://www.amazon.com/dp/B000TEST00",
                "product_id": "B000TEST00",
                "title": "Cotton T-Shirt",
                "price_usd": 25.0,
                "currency": "USD",
                "scraped_weight_lbs": 1.0,
                "scraped_category_hint": "clothing",
                "overrides": {"category": None, "weight_lbs": None},
            },
        )

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {"error": "Unauthorized"})

    def test_extension_quote_matches_predict_breakdown(self) -> None:
        response = self.client.post(
            "/extension/quote",
            headers=self._auth_headers(),
            json={
                "source": "amazon",
                "page_url": "https://www.amazon.com/dp/B000TEST01",
                "product_id": "B000TEST01",
                "title": "Cotton T-Shirt",
                "price_usd": 100.0,
                "currency": "USD",
                "scraped_weight_lbs": 2.1,
                "scraped_category_hint": "clothing",
                "overrides": {"category": None, "weight_lbs": None},
            },
        )

        predict_response = self.client.post(
            "/predict",
            json={"category": "clothing", "price": 100.0, "weight": 3},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(predict_response.status_code, 200)

        payload = response.get_json()
        predict_payload = predict_response.get_json()

        self.assertEqual(payload["classification"]["category"], "clothing")
        self.assertEqual(payload["classification"]["billable_weight_lbs"], 3)
        self.assertEqual(payload["quote"], predict_payload)

    def test_manual_override_is_cached_for_future_quotes(self) -> None:
        initial_response = self.client.post(
            "/extension/quote",
            headers=self._auth_headers(),
            json={
                "source": "amazon",
                "page_url": "https://www.amazon.com/dp/B000TEST02",
                "product_id": "B000TEST02",
                "title": "Wireless Earbuds",
                "price_usd": 80.0,
                "currency": "USD",
                "scraped_weight_lbs": None,
                "scraped_category_hint": None,
                "overrides": {"category": "electronics", "weight_lbs": 1.2},
            },
        )

        cached_response = self.client.post(
            "/extension/quote",
            headers=self._auth_headers(),
            json={
                "source": "amazon",
                "page_url": "https://www.amazon.com/dp/B000TEST02",
                "product_id": "B000TEST02",
                "title": "Wireless Earbuds",
                "price_usd": 80.0,
                "currency": "USD",
                "scraped_weight_lbs": None,
                "scraped_category_hint": None,
                "overrides": {"category": None, "weight_lbs": None},
            },
        )

        self.assertEqual(initial_response.status_code, 200)
        self.assertEqual(cached_response.status_code, 200)

        initial_payload = initial_response.get_json()
        cached_payload = cached_response.get_json()

        self.assertEqual(initial_payload["classification"]["source"], "manual")
        self.assertEqual(cached_payload["classification"]["source"], "cache")
        self.assertEqual(cached_payload["classification"]["category"], "electronics")
        self.assertEqual(cached_payload["classification"]["billable_weight_lbs"], 2)


if __name__ == "__main__":
    unittest.main()
