import math
from pathlib import Path

import joblib
import pandas as pd


MODEL_DIR = Path(__file__).resolve().parent.parent / "model"
PREDICTOR = joblib.load(MODEL_DIR / "predictor.pkl")
TRANSFORMER = joblib.load(MODEL_DIR / "transformer.pkl")


def normalized_weight_lbs(weight_lbs: float) -> int:
    return max(1, math.ceil(weight_lbs))


def billable_weight_lbs(weight_lbs: float) -> int:
    return max(2, normalized_weight_lbs(weight_lbs))


def generate_quote_breakdown(category: str, price_usd: float, weight_lbs: int) -> dict[str, float]:
    prediction_weight = billable_weight_lbs(weight_lbs)
    input_df = pd.DataFrame({"category": [category], "weight": [prediction_weight]})
    transformed_df = TRANSFORMER.transform(input_df)
    shipping = float(PREDICTOR.predict(transformed_df)[0])

    item_cost = round(price_usd * 6.8, 2)
    tax = round(item_cost * 0.07, 2)
    base_service_charge = (item_cost + tax + shipping) * 0.15
    raw_service_charge = round(max(50.0, base_service_charge), 2)
    raw_total_cost = item_cost + tax + shipping + raw_service_charge
    rounded_total_cost = int((raw_total_cost + 5) // 10 * 10)
    service_charge = round(rounded_total_cost - item_cost - tax - shipping, 2)
    total_cost = float(rounded_total_cost)

    return {
        "item_cost": item_cost,
        "tax": tax,
        "shipping": shipping,
        "service_charge": service_charge,
        "total_cost": total_cost,
    }
