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
    <>
      {/* Page Header */}
      <section className="relative py-10 md:py-14 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-brand-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-accent-400/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-[8%] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-accent-400 text-sm font-medium font-display mb-4">
            <i className="fas fa-calculator text-xs" />
            Cost Estimator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-2">
            Estimate Your <span className="gradient-text">Cost</span>
          </h1>
          <p className="text-white/50 text-base max-w-md mx-auto m-0">
            Get an instant quote for shipping any item to Trinidad &amp; Tobago
          </p>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16 md:py-24 bg-cloud-50 relative">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0077b6 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />

        <div className="relative max-w-3xl mx-auto px-[8%]">
          <div className="bg-white rounded-3xl shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
            {/* Gradient accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-brand-500 via-accent-400 to-brand-300" />

            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Item Name */}
                <div>
                  <label
                    htmlFor="description"
                    className="block font-display text-sm font-semibold text-navy-900 mb-2"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="description"
                    placeholder="e.g. iPhone 15 Pro Max"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-cloud-50 text-navy-900 placeholder:text-gray-400 text-base transition-all duration-300 focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 focus:bg-white"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-2 m-0">
                      <i className="fas fa-exclamation-circle mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="item-type"
                    className="block font-display text-sm font-semibold text-navy-900 mb-2"
                  >
                    Item Category
                  </label>
                  <div className="relative">
                    <select
                      id="item-type"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-cloud-50 text-navy-900 text-base appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 focus:bg-white"
                    >
                      <option value="" disabled hidden>Select a category</option>
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
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                  </div>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-2 m-0">
                      <i className="fas fa-exclamation-circle mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Price & Weight Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="price"
                      className="block font-display text-sm font-semibold text-navy-900 mb-2"
                    >
                      Item Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 bg-cloud-50 text-navy-900 placeholder:text-gray-400 text-base transition-all duration-300 focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 focus:bg-white"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-2 m-0">
                        <i className="fas fa-exclamation-circle mr-1" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="weight"
                      className="block font-display text-sm font-semibold text-navy-900 mb-2"
                    >
                      Weight (lbs)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        min="0"
                        placeholder="0"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-cloud-50 text-navy-900 placeholder:text-gray-400 text-base transition-all duration-300 focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 focus:bg-white"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lbs</span>
                    </div>
                    {errors.weight && (
                      <p className="text-red-500 text-sm mt-2 m-0">
                        <i className="fas fa-exclamation-circle mr-1" />
                        {errors.weight}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow w-full py-4 bg-gradient-to-r from-brand-500 to-accent-400 text-white font-display font-semibold text-base rounded-xl border-none cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner animate-spin" />
                      Calculating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-paper-plane" />
                      CALCULATE
                    </span>
                  )}
                </button>
              </form>

              {/* Results */}
              {results && (
                <div
                  ref={resultsRef}
                  className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-cloud-50 to-white border border-gray-100"
                  style={{ animation: "fade-up 0.5s ease forwards" }}
                >
                  <h3 className="font-display text-lg font-bold text-navy-900 mb-5 flex items-center gap-2">
                    <i className="fas fa-receipt text-brand-500" />
                    Quote Breakdown
                  </h3>

                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Item Cost", value: results.item_cost },
                      { label: "US Sales Tax", value: results.tax },
                      { label: "Shipping & Clearing", value: results.shipping },
                      { label: "Logistics Fee", value: results.service_charge },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between py-2 gap-2"
                      >
                        <span className="text-gray-500 text-[13px] sm:text-sm whitespace-nowrap">{row.label}</span>
                        <span className="font-display font-semibold text-navy-900 text-sm sm:text-base whitespace-nowrap">
                          TTD ${row.value.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-navy-900">
                      Estimated Total (TTD)
                    </span>
                    <span className="font-display font-extrabold text-2xl gradient-text">
                      ${results.total_cost.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
