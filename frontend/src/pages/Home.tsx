import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Send us the product link",
    description:
      "Share the exact item from Amazon, SHEIN, Apple, Nike, or your preferred U.S. retailer.",
  },
  {
    number: "02",
    title: "Get a transparent estimate",
    description:
      "We break down item cost, tax, shipping, and service fees before you commit.",
  },
  {
    number: "03",
    title: "Receive it in Trinidad",
    description:
      "We purchase, coordinate delivery, and keep you updated until your package arrives.",
  },
];

const serviceHighlights = [
  {
    title: "No hidden charges",
    description:
      "Every quote is structured so customers understand where the total comes from.",
  },
  {
    title: "Support that feels personal",
    description:
      "Questions, order updates, and custom requests are handled directly and quickly.",
  },
  {
    title: "Reliable delivery windows",
    description:
      "Most standard orders arrive within two to four weeks depending on retailer lead times.",
  },
  {
    title: "Built for repeat shoppers",
    description:
      "From single items to monthly orders, the process stays simple and consistent.",
  },
];

const trustPoints = [
  { label: "Customers supported", value: "1,000+" },
  { label: "Typical delivery", value: "2-4 weeks" },
  { label: "Quote clarity", value: "Full breakdown" },
];

const testimonials = [
  {
    quote:
      "The process felt effortless. I knew the full cost upfront and my order arrived exactly as promised.",
    name: "Marcia R.",
    detail: "Port of Spain",
  },
  {
    quote:
      "Great communication, fair pricing, and a very polished customer experience from start to finish.",
    name: "Sarah L.",
    detail: "San Fernando",
  },
];

const retailerList = ["Amazon", "SHEIN", "Nike", "Apple", "Best Buy", "Macy's"];
const heroTags = ["Fast quotes", "Blue + white delivery", "Nationwide support"];

export default function Home() {
  return (
    <div className="overflow-x-clip px-4 pb-24">
      <section className="pt-8 sm:pt-10">
        <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="fade-in max-w-2xl lg:pr-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
              Trusted shipping for Trinidad &amp; Tobago
            </span>
            <h1 className="mt-5 max-w-[11ch] text-[clamp(3rem,5vw,5.2rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-ink-900">
              Shop the world. We bring it home beautifully.
            </h1>
            <p className="mt-5 max-w-[34ch] text-lg leading-8 text-ink-700">
              Cleaner quotes, reliable delivery, and a shopping experience that
              feels premium from first link to final pickup.
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link
                to="/calculator"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 text-base font-bold text-white shadow-[0_16px_30px_rgba(15,94,156,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,94,156,0.28)]"
              >
                Calculate your order
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-brand-200/70 bg-white/90 px-7 text-base font-bold text-brand-700 shadow-brand-soft transition hover:-translate-y-0.5 hover:border-brand-300"
              >
                Browse supported stores
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-200/70 bg-white/80 px-3.5 py-2 text-sm font-extrabold text-brand-700 shadow-brand-soft"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point.label}
                  className="rounded-3xl border border-brand-200/70 bg-white/85 p-5 shadow-brand-soft"
                >
                  <strong className="block text-2xl font-extrabold text-brand-700">
                    {point.value}
                  </strong>
                  <span className="mt-1 block text-sm text-ink-600">{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in">
            <div
              className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-brand-200/70 bg-white shadow-brand-card max-lg:min-h-[520px] max-md:min-h-[460px]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(9,29,52,0.1), rgba(9,29,52,0.26)), url('/shein_items.jpg')",
                backgroundPosition: "center 42%",
                backgroundSize: "cover",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.32),transparent_22%),linear-gradient(180deg,rgba(8,23,41,0.06),rgba(8,23,41,0.38))]"></div>

              <div className="absolute left-6 top-6 z-10 max-w-[360px] rounded-[1.75rem] border border-white/30 bg-white/20 px-6 py-5 backdrop-blur-sm shadow-[0_20px_40px_rgba(15,39,68,0.14)] max-sm:left-4 max-sm:right-4 max-sm:max-w-none max-sm:px-5 max-sm:py-4">
                <span className="inline-block text-xs font-extrabold uppercase tracking-[0.12em] text-white/85">
                  Styled for global shopping
                </span>
                <h2 className="mt-3 text-balance text-[clamp(2rem,3vw,3rem)] font-extrabold tracking-[-0.04em] text-white">
                  The package should feel exciting before it even lands.
                </h2>
              </div>

              <div className="absolute right-6 top-1/2 z-10 max-w-[220px] -translate-y-1/2 rounded-[1.4rem] bg-white/92 px-5 py-4 shadow-brand-soft backdrop-blur-sm max-md:bottom-22 max-md:right-4 max-md:top-auto max-md:translate-y-0 max-sm:left-4 max-sm:right-4 max-sm:max-w-none">
                <strong className="block text-base font-extrabold text-brand-700">
                  Transparent quotes
                </strong>
                <span className="mt-1 block text-sm text-ink-600">
                  TTD breakdown before checkout
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-2.5 max-sm:bottom-4 max-sm:left-4 max-sm:right-4">
                {retailerList.map((retailer) => (
                  <span
                    key={retailer}
                    className="rounded-full border border-brand-200/70 bg-white/90 px-4 py-3 text-sm font-extrabold text-brand-700 shadow-[0_18px_34px_rgba(15,39,68,0.12)]"
                  >
                    {retailer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="fade-in mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
              How it works
            </span>
            <h2 className="mt-5 text-balance text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold tracking-[-0.04em] text-ink-900">
              A simple three-step flow built for busy shoppers.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-700">
              We designed the experience to be straightforward, responsive, and
              easy to trust from the first message onward.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="fade-in rounded-[1.4rem] border border-ink-200 bg-white/92 p-7 shadow-brand-soft"
              >
                <span className="inline-flex text-sm font-extrabold tracking-[0.08em] text-brand-700">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-24">
        <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[1fr_0.88fr] lg:items-start">
          <div className="fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
              Why customers stay with us
            </span>
            <h2 className="mt-5 max-w-[14ch] text-balance text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold tracking-[-0.04em] text-ink-900">
              Professional service without the corporate distance.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700">
              The ShippersTT experience combines human support with a cleaner,
              more transparent ordering process so customers always know what is
              happening next.
            </p>

            <div className="mt-8 grid gap-4">
              {serviceHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-[1.5rem] border border-brand-200/70 bg-white/82 px-5 py-5 shadow-brand-soft transition hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-base leading-7 text-ink-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in rounded-[2rem] border border-brand-200/70 bg-[radial-gradient(circle_at_top_right,rgba(48,227,255,0.16),transparent_32%),linear-gradient(180deg,#ffffff,#f0f7ff)] p-8 shadow-brand-card">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
                <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
                Customer confidence
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-ink-900">
                Real feedback from repeat shoppers.
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-[1.4rem] border border-ink-200 bg-white/92 p-6 shadow-brand-soft"
                >
                  <p className="text-base leading-7 text-ink-700">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="mt-5 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <strong className="font-bold text-ink-900">{testimonial.name}</strong>
                    <span className="text-ink-600">{testimonial.detail}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6">
        <div className="fade-in mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-5 rounded-[1.6rem] bg-gradient-to-r from-brand-800 to-brand-600 px-8 py-8 text-white shadow-brand-card md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-white">
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.15)]"></span>
              Ready to price an order?
            </span>
            <h2 className="mt-5 max-w-[16ch] text-balance text-[clamp(2rem,3vw,2.8rem)] font-extrabold tracking-[-0.04em] text-white">
              Use the calculator to preview your total before you shop.
            </h2>
          </div>
          <Link
            to="/calculator"
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-white px-7 text-base font-bold text-brand-700 shadow-brand-soft transition hover:-translate-y-0.5 hover:text-brand-800"
          >
            Open calculator
          </Link>
        </div>
      </section>
    </div>
  );
}

