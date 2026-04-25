import math
from pathlib import Path

import joblib
import pandas as pd


MODEL_DIR = Path(__file__).resolve().parent.parent / "model"
PREDICTOR = joblib.load(MODEL_DIR / "predictor.pkl")
TRANSFORMER = joblib.load(MODEL_DIR / "transformer.pkl")


def billable_weight_lbs(weight_lbs: float) -> int:
    return max(1, math.ceil(weight_lbs))


def generate_quote_breakdown(category: str, price_usd: float, weight_lbs: int) -> dict[str, float]:
    input_df = pd.DataFrame({"category": [category], "weight": [weight_lbs]})
    transformed_df = TRANSFORMER.transform(input_df)
    shipping = float(PREDICTOR.predict(transformed_df)[0])

    item_cost = round(price_usd * 6.8, 2)
    tax = round(item_cost * 0.07, 2)
    service_charge = round((item_cost + tax + shipping) * 0.15, 2)
    total_cost = round(item_cost + tax + shipping + service_charge, 2)

    return {
        "item_cost": item_cost,
        "tax": tax,
        "shipping": shipping,
        "service_charge": service_charge,
        "total_cost": total_cost,
    }
