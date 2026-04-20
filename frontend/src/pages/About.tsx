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
    <div className="page shop-page">
      <section className="page-hero shop-hero">
        <div className="container shop-hero-grid fade-in">
          <div>
            <span className="eyebrow">Supported retailers</span>
            <h1>Shop the brands you already love. We will handle the journey home.</h1>
            <p>
              From fashion to electronics, ShippersTT supports a broad mix of
              U.S. stores so customers can order confidently with one trusted
              local shipping partner.
            </p>
          </div>
          <div className="stat-ribbon">
            {partnerStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container grouped-stores">
          {storeGroups.map((group) => (
            <div className="store-group" key={group.title}>
              <div className="section-heading fade-in align-left">
                <span className="eyebrow">Store collection</span>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>

              <div className="store-grid">
                {group.stores.map((store) => (
                  <article className="store-card fade-in" key={store.name}>
                    <div className="store-mark">{store.name.slice(0, 2).toUpperCase()}</div>
                    <h3>{store.name}</h3>
                    <p>{store.specialty}</p>
                    <div className="store-tags">
                      {store.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="shop-note fade-in">
            <div>
              <span className="eyebrow">Need another store?</span>
              <h2>Custom requests are welcome.</h2>
              <p>
                If your preferred retailer is not listed here, reach out first.
                We can confirm whether it fits the same shipping and quoting
                workflow.
              </p>
            </div>
            <a
              className="button-primary"
              href="https://www.instagram.com/shippers.tt_"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
