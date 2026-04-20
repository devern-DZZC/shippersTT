export interface PredictRequest {
  category: string;
  price: number;
  weight: number;
}

export interface PredictResponse {
  item_cost: number;
  tax: number;
  shipping: number;
  service_charge: number;
  total_cost: number;
}

export interface PredictError {
  error: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function predictShipping(
  payload: PredictRequest
): Promise<PredictResponse> {
  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: PredictResponse | PredictError = await response.json();

  if (!response.ok || "error" in data) {
    throw new Error((data as PredictError).error ?? "Unexpected error");
  }

  return data as PredictResponse;
}
