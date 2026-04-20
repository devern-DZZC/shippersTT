import { useRef, useState } from "react";
import { predictShipping, type PredictResponse } from "../api/predict";

interface FormErrors {
  description?: string;
  category?: string;
  price?: string;
  weight?: string;
}

const categoryOptions = [
  "bag",
  "car parts",
  "clothing",
  "electronics",
  "laptop",
  "perfume",
  "phone",
  "shoes",
  "other",
];

const categoryLabels: Record<string, string> = {
  bag: "Bags",
  "car parts": "Car Parts",
  clothing: "Clothing & Accessories",
  electronics: "Electronics",
  laptop: "Laptops & Tablets",
  perfume: "Perfume & Cologne",
  phone: "Phones",
  shoes: "Shoes",
  other: "Other",
};

const quickNotes = ["USD item price", "Weight in lbs", "Total shown in TTD"];

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
    const nextErrors: FormErrors = {};

    if (!description.trim()) nextErrors.description = "Please enter the item name.";
    if (!category) nextErrors.category = "Please choose a category.";
    if (!price || Number(price) <= 0) nextErrors.price = "Enter a valid USD price.";
    if (!weight || Number(weight) <= 0) nextErrors.weight = "Enter a valid weight in pounds.";

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const data = await predictShipping({
        category,
        price: Number(price),
        weight: Number(weight),
      });

      setResults(data);
      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page calculator-page calculator-focus-page">
      <section className="calculator-focus-section">
        <div className="container calculator-focus-wrap">
          <div className="calculator-focus-intro fade-in">
            <h1>Estimate your order.</h1>
            <p>Fast, clear, and centered on the tool itself.</p>
            <div className="calculator-quick-notes">
              {quickNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>

          <div className="calculator-stage fade-in">
            <div className="calculator-card calculator-card-featured">
              <div className="calculator-card-topline">
                <span>ShippersTT estimator</span>
                <span>Live quote</span>
              </div>

              <form className="quote-form calculator-form-featured" onSubmit={handleSubmit} noValidate>
                <div className="input-group input-group-featured">
                  <label htmlFor="description">Item name</label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Example: Nike Air Max 270"
                  />
                  {errors.description && <p className="error-message">{errors.description}</p>}
                </div>

                <div className="input-group input-group-featured">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {categoryLabels[option]}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="error-message">{errors.category}</p>}
                </div>

                <div className="input-row calculator-main-grid">
                  <div className="input-group input-group-featured">
                    <label htmlFor="price">Item price (USD)</label>
                    <input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      placeholder="150.00"
                    />
                    {errors.price && <p className="error-message">{errors.price}</p>}
                  </div>

                  <div className="input-group input-group-featured">
                    <label htmlFor="weight">Weight (lbs)</label>
                    <input
                      id="weight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={weight}
                      onChange={(event) => setWeight(event.target.value)}
                      placeholder="2.5"
                    />
                    {errors.weight && <p className="error-message">{errors.weight}</p>}
                  </div>
                </div>

                <button type="submit" className="button-primary wide-button calculator-submit" disabled={loading}>
                  {loading ? "Calculating estimate..." : "Calculate estimate"}
                </button>
              </form>
            </div>

            {results && (
              <div className="results-wrap results-wrap-centered" ref={resultsRef}>
                <div className="results-card results-card-featured">
                  <div className="results-header-minimal">
                    <span className="eyebrow">Estimate result</span>
                    <h2>{description || "Your item"}</h2>
                    <p>{category ? categoryLabels[category] : "Selected item"}</p>
                  </div>

                  <div className="results-list results-list-featured">
                    <div>
                      <span>Item cost</span>
                      <strong>TTD ${results.item_cost.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>U.S. sales tax</span>
                      <strong>TTD ${results.tax.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>Shipping &amp; clearing</span>
                      <strong>TTD ${results.shipping.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>Logistics fee</span>
                      <strong>TTD ${results.service_charge.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="results-total results-total-featured">
                    <span>Estimated total</span>
                    <strong>TTD ${results.total_cost.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
