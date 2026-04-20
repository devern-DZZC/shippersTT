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

function labelClass(active: boolean) {
  return `pointer-events-none absolute left-4 rounded-full bg-white px-2 font-medium text-ink-500 transition-all duration-200 ${
    active ? "top-0 -translate-y-1/2 text-xs text-brand-500" : "top-1/2 -translate-y-1/2 text-sm"
  }`;
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
    <div className="px-4 pb-24">
      <section className="flex min-h-[calc(100svh-7rem)] items-center py-5 lg:py-10">
        <div className="mx-auto grid w-full max-w-4xl gap-5">
          <div className="fade-in mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-[clamp(2.8rem,5vw,4.7rem)] font-extrabold tracking-[-0.05em] text-ink-900 lg:whitespace-nowrap">
              Estimate your order.
            </h1>
            <p className="mx-auto mt-3 max-w-[30ch] text-base leading-7 text-ink-600 sm:text-lg">
              Fast, clear, and centered on the tool itself.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              {quickNotes.map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-brand-200/70 bg-white/80 px-3.5 py-2 text-xs font-extrabold tracking-[0.04em] text-brand-700 shadow-brand-soft sm:text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="fade-in mx-auto w-full max-w-3xl">
            <div className="rounded-[2rem] border border-brand-200/70 bg-[radial-gradient(circle_at_top_right,rgba(48,227,255,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,248,255,0.96))] p-7 shadow-brand-card sm:p-8">
              <div className="flex items-center justify-between gap-4 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-500">
                <span>ShippersTT estimator</span>
                <span>Live quote</span>
              </div>

              <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-2">
                  <div className="relative">
                    <input
                      id="description"
                      type="text"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder=" "
                      className="peer h-[3.75rem] w-full rounded-3xl border border-ink-200 bg-white/92 px-4 pt-5 text-base text-ink-900 shadow-brand-soft outline-none transition focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(48,227,255,0.16)]"
                    />
                    <label htmlFor="description" className={labelClass(Boolean(description))}>
                      Item name
                    </label>
                  </div>
                  {errors.description && (
                    <p className="text-sm font-semibold text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="relative">
                    <select
                      id="category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="h-[3.75rem] w-full rounded-3xl border border-ink-200 bg-white/92 px-4 pt-5 text-base text-ink-900 shadow-brand-soft outline-none transition focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(48,227,255,0.16)]"
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {categoryLabels[option]}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="category" className={labelClass(Boolean(category))}>
                      Category
                    </label>
                  </div>
                  {errors.category && (
                    <p className="text-sm font-semibold text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <div className="relative">
                      <input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder=" "
                        className="peer h-[3.75rem] w-full rounded-3xl border border-ink-200 bg-white/92 px-4 pt-5 text-base text-ink-900 shadow-brand-soft outline-none transition focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(48,227,255,0.16)]"
                      />
                      <label htmlFor="price" className={labelClass(Boolean(price))}>
                        Item price (USD)
                      </label>
                    </div>
                    {errors.price && (
                      <p className="text-sm font-semibold text-red-500">{errors.price}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="relative">
                      <input
                        id="weight"
                        type="number"
                        min="0"
                        step="0.1"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                        placeholder=" "
                        className="peer h-[3.75rem] w-full rounded-3xl border border-ink-200 bg-white/92 px-4 pt-5 text-base text-ink-900 shadow-brand-soft outline-none transition focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(48,227,255,0.16)]"
                      />
                      <label htmlFor="weight" className={labelClass(Boolean(weight))}>
                        Weight (lbs)
                      </label>
                    </div>
                    {errors.weight && (
                      <p className="text-sm font-semibold text-red-500">{errors.weight}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-[3.75rem] w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 text-base font-bold text-white shadow-[0_16px_30px_rgba(15,94,156,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,94,156,0.28)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading ? "Calculating estimate..." : "Calculate estimate"}
                </button>
              </form>
            </div>

            {results && (
              <div ref={resultsRef} className="mt-5">
                <div className="rounded-[2rem] border border-brand-200/70 bg-[radial-gradient(circle_at_top_right,rgba(48,227,255,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(242,249,255,0.95))] p-7 shadow-brand-card sm:p-8">
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
                      <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
                      Estimate result
                    </span>
                    <h2 className="mt-4 text-balance text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold tracking-[-0.04em] text-ink-900 lg:whitespace-nowrap">
                      {description || "Your item"}
                    </h2>
                    <p className="mt-2 text-sm text-ink-600 sm:text-base">
                      {category ? categoryLabels[category] : "Selected item"}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="flex flex-col gap-1 rounded-[1.25rem] border border-brand-100 bg-white/88 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-ink-600 sm:text-base">Item cost</span>
                      <strong className="text-lg font-bold text-ink-900">
                        TTD ${results.item_cost.toFixed(2)}
                      </strong>
                    </div>
                    <div className="flex flex-col gap-1 rounded-[1.25rem] border border-brand-100 bg-white/88 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-ink-600 sm:text-base">U.S. sales tax</span>
                      <strong className="text-lg font-bold text-ink-900">
                        TTD ${results.tax.toFixed(2)}
                      </strong>
                    </div>
                    <div className="flex flex-col gap-1 rounded-[1.25rem] border border-brand-100 bg-white/88 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-ink-600 sm:text-base">
                        Shipping &amp; clearing
                      </span>
                      <strong className="text-lg font-bold text-ink-900">
                        TTD ${results.shipping.toFixed(2)}
                      </strong>
                    </div>
                    <div className="flex flex-col gap-1 rounded-[1.25rem] border border-brand-100 bg-white/88 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-ink-600 sm:text-base">Logistics fee</span>
                      <strong className="text-lg font-bold text-ink-900">
                        TTD ${results.service_charge.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-1 border-t border-brand-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-base font-semibold text-ink-600">Estimated total</span>
                    <strong className="text-2xl font-extrabold text-brand-700">
                      TTD ${results.total_cost.toFixed(2)}
                    </strong>
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

