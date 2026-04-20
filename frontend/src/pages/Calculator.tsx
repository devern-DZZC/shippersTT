import { useState, useRef } from "react";
import { predictShipping, type PredictResponse } from "../api/predict";

interface FormErrors {
  description?: string;
  category?: string;
  price?: string;
  weight?: string;
}

export default function Calculator() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictResponse | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!description.trim()) errs.description = "This is required";
    if (!category) errs.category = "This is required";
    if (!price || parseFloat(price) <= 0) errs.price = "Enter a valid price";
    if (!weight || parseFloat(weight) <= 0) errs.weight = "Enter a valid weight";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setResults(null);
    try {
      const data = await predictShipping({
        category,
        price: parseFloat(price),
        weight: parseInt(weight, 10),
      });
      setResults(data);
      // Scroll to results after render
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert("Error: " + message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <h2>ESTIMATE YOUR COST</h2>

        <form id="quote-form" onSubmit={handleSubmit} noValidate>
          {/* Item Name */}
          <div className="form-group">
            <input
              type="text"
              id="description"
              placeholder=" "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="description">Item Name</label>
            {errors.description && (
              <div className="error visible">{errors.description}</div>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <select
              id="item-type"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled hidden></option>
              <option value="bag">Bags</option>
              <option value="car parts">Car Parts</option>
              <option value="clothing">Clothing and Accessories</option>
              <option value="electronics">Electronics</option>
              <option value="laptop">Laptops/Tablets</option>
              <option value="perfume">Perfume/Cologne</option>
              <option value="phone">Phones</option>
              <option value="shoes">Shoes</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="item-type">Item Category</label>
            {errors.category && (
              <div className="error visible">{errors.category}</div>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              placeholder=" "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="price">Item price (USD)</label>
            {errors.price && (
              <div className="error visible">{errors.price}</div>
            )}
          </div>

          {/* Weight */}
          <div className="form-group">
            <input
              type="number"
              id="weight"
              name="weight"
              min="0"
              placeholder=" "
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <label htmlFor="weight">Weight (lbs)</label>
            {errors.weight && (
              <div className="error visible">{errors.weight}</div>
            )}
          </div>

          <button
            type="submit"
            className="calculate-btn"
            disabled={loading}
          >
            {loading ? "Calculating..." : "CALCULATE"}
          </button>
        </form>

        {results && (
          <div className="quote-results" ref={resultsRef}>
            <p>
              Item Cost <span>TTD ${results.item_cost.toFixed(2)}</span>
            </p>
            <p>
              US Sales Tax <span>TTD ${results.tax.toFixed(2)}</span>
            </p>
            <p>
              Shipping &amp; Clearing{" "}
              <span>TTD ${results.shipping.toFixed(2)}</span>
            </p>
            <p>
              Service Charge{" "}
              <span>TTD ${results.service_charge.toFixed(2)}</span>
            </p>
            <hr />
            <p>
              <strong>Estimated Total (TTD)</strong>{" "}
              <span>${results.total_cost.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
