import { Link } from "react-router-dom";

const contactCards = [
  {
    title: "Email",
    detail: "shippers.tt@gmail.com",
    href: "mailto:shippers.tt@gmail.com",
    icon: "fa-regular fa-envelope",
  },
  {
    title: "Phone",
    detail: "(868) 463-2790",
    href: "tel:+18684632790",
    icon: "fa-solid fa-phone",
  },
  {
    title: "Instagram",
    detail: "@shippers.tt_",
    href: "https://www.instagram.com/shippers.tt_",
    icon: "fab fa-instagram",
  },
];

const serviceDetails = [
  {
    title: "Response time",
    detail: "Most questions are answered within one business day.",
  },
  {
    title: "Location",
    detail: "Based in San Fernando and serving customers across Trinidad and Tobago.",
  },
  {
    title: "Best for",
    detail: "Quote questions, custom store checks, and order coordination.",
  },
];

export default function Contact() {
  return (
    <div className="overflow-x-clip px-4 pb-24">
      <section className="py-10">
        <div className="fade-in mx-auto max-w-5xl rounded-[2rem] border border-brand-200/70 bg-[radial-gradient(circle_at_top_right,rgba(48,227,255,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(237,247,255,0.9))] p-8 shadow-brand-card text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
            <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
            Contact ShippersTT
          </span>
          <h1 className="mx-auto mt-5 max-w-[14ch] text-balance text-[clamp(2.4rem,4vw,3.8rem)] font-extrabold tracking-[-0.05em] text-ink-900">
            Reach out when you need a quote, a store check, or help with an order.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-700">
            We keep communication simple and direct so you can get answers quickly
            and move forward with confidence.
          </p>
        </div>
      </section>

      <section className="pt-6">
        <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[0.82fr_1fr] lg:items-start">
          <div className="grid gap-4">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="fade-in flex items-center gap-4 rounded-[1.4rem] border border-ink-200 bg-white/92 p-5 shadow-brand-soft transition hover:-translate-y-0.5"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-brand-100 to-brand-50 text-xl text-brand-700">
                  <i className={card.icon}></i>
                </span>
                <div>
                  <span className="block text-sm text-ink-600">{card.title}</span>
                  <strong className="mt-1 block text-lg font-bold text-ink-900">
                    {card.detail}
                  </strong>
                </div>
              </a>
            ))}
          </div>

          <div className="fade-in rounded-[2rem] border border-brand-200/70 bg-[radial-gradient(circle_at_top_right,rgba(48,227,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(237,247,255,0.92))] p-8 shadow-brand-card">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
              What to expect
            </span>
            <h2 className="mt-5 max-w-[14ch] text-balance text-[clamp(2rem,3vw,3rem)] font-extrabold tracking-[-0.04em] text-ink-900">
              Helpful support, without the back-and-forth.
            </h2>

            <div className="mt-6 grid gap-5">
              {serviceDetails.map((item) => (
                <article key={item.title}>
                  <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-ink-600">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                to="/calculator"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 text-base font-bold text-white shadow-[0_16px_30px_rgba(15,94,156,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,94,156,0.28)]"
              >
                Start with a quote
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-brand-200/70 bg-white/90 px-7 text-base font-bold text-brand-700 shadow-brand-soft transition hover:-translate-y-0.5 hover:border-brand-300"
              >
                View supported stores
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

