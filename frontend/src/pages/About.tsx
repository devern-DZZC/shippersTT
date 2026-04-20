const storeGroups = [
  {
    title: "Fashion & everyday favorites",
    description: "Reliable options for clothing, footwear, beauty, and trend-driven retail orders.",
    stores: [
      { name: "SHEIN", specialty: "Fast fashion and accessories", tags: ["Trending", "Apparel", "Accessories"] },
      { name: "Nike", specialty: "Sneakers, sportswear, and drops", tags: ["Footwear", "Athletic", "Popular"] },
      { name: "Fashion Nova", specialty: "Statement fashion pieces", tags: ["Women", "Style", "Seasonal"] },
      { name: "Sephora", specialty: "Beauty and skincare", tags: ["Beauty", "Care", "Giftable"] },
    ],
  },
  {
    title: "Tech & premium electronics",
    description: "Ideal for higher-value orders that need careful handling and dependable communication.",
    stores: [
      { name: "Apple", specialty: "Phones, tablets, and accessories", tags: ["Premium", "Tech", "High value"] },
      { name: "Best Buy", specialty: "Electronics and home tech", tags: ["Devices", "Gaming", "Audio"] },
      { name: "Amazon", specialty: "Everything from gadgets to essentials", tags: ["Marketplace", "Wide range", "Convenient"] },
      { name: "eBay", specialty: "Specialty finds and collector items", tags: ["Deals", "Unique", "Flexible"] },
    ],
  },
  {
    title: "Home, lifestyle, and specialty buying",
    description: "Great for mixed baskets, gift orders, and brands with more niche product lines.",
    stores: [
      { name: "Macy's", specialty: "Home, apparel, and department store finds", tags: ["Home", "Fashion", "Gifting"] },
      { name: "Walmart", specialty: "Household items and essentials", tags: ["Essentials", "Value", "Bulk"] },
      { name: "Temu", specialty: "Low-cost variety shopping", tags: ["Budget", "Variety", "Accessories"] },
      { name: "GOAT", specialty: "Sneaker and streetwear marketplace", tags: ["Sneakers", "Collectibles", "Limited"] },
    ],
  },
];

const partnerStats = [
  { label: "Popular retailers", value: "12+" },
  { label: "Categories covered", value: "Fashion to tech" },
  { label: "Order support", value: "Personal guidance" },
];

export default function About() {
  return (
    <div className="overflow-x-clip px-4 pb-24">
      <section className="py-10">
        <div className="fade-in mx-auto grid w-full max-w-6xl gap-6 rounded-[2rem] border border-brand-200/70 bg-[radial-gradient(circle_at_top_right,rgba(48,227,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(237,247,255,0.88))] p-8 shadow-brand-card lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
              <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
              Supported retailers
            </span>
            <h1 className="mt-5 max-w-[14ch] text-balance text-[clamp(2.4rem,4vw,3.8rem)] font-extrabold tracking-[-0.05em] text-ink-900">
              Shop the brands you already love. We will handle the journey home.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700">
              From fashion to electronics, ShippersTT supports a broad mix of
              U.S. stores so customers can order confidently with one trusted
              local shipping partner.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {partnerStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-brand-200/70 bg-white/82 p-5 shadow-brand-soft">
                <strong className="block text-xl font-extrabold text-brand-700">{stat.value}</strong>
                <span className="mt-1 block text-sm text-ink-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10">
          {storeGroups.map((group) => (
            <div key={group.title} className="grid gap-5">
              <div className="fade-in max-w-3xl text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
                  <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
                  Store collection
                </span>
                <h2 className="mt-5 text-balance text-[clamp(2rem,3vw,3rem)] font-extrabold tracking-[-0.04em] text-ink-900">
                  {group.title}
                </h2>
                <p className="mt-4 text-lg leading-8 text-ink-700">{group.description}</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {group.stores.map((store) => (
                  <article
                    key={store.name}
                    className="fade-in rounded-[1.5rem] border border-ink-200 bg-white/92 p-6 shadow-brand-soft transition hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-brand-700 to-brand-500 text-sm font-extrabold tracking-[0.08em] text-white">
                      {store.name.slice(0, 2).toUpperCase()}
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-ink-900">{store.name}</h3>
                    <p className="mt-3 text-base leading-7 text-ink-600">{store.specialty}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {store.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-50 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.05em] text-brand-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="fade-in flex flex-col items-start justify-between gap-5 rounded-[1.8rem] border border-brand-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(237,247,255,0.9))] p-8 shadow-brand-soft md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-600">
                <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgba(48,227,255,0.16)]"></span>
                Need another store?
              </span>
              <h2 className="mt-5 text-balance text-[clamp(2rem,3vw,2.8rem)] font-extrabold tracking-[-0.04em] text-ink-900">
                Custom requests are welcome.
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink-700">
                If your preferred retailer is not listed here, reach out first.
                We can confirm whether it fits the same shipping and quoting
                workflow.
              </p>
            </div>
            <a
              href="https://www.instagram.com/shippers.tt_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 text-base font-bold text-white shadow-[0_16px_30px_rgba(15,94,156,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,94,156,0.28)]"
            >
              Ask on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

