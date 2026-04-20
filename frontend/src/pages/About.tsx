const stores = [
  {
    name: "Amazon",
    href: "https://www.amazon.com",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg",
  },
  {
    name: "SHEIN",
    href: "https://www.shein.com",
    logo: "https://img.icons8.com/?size=512&id=V3r2kWDPwZgQ&format=png",
  },
  {
    name: "Temu",
    href: "https://www.temu.com",
    logo: "https://1000logos.net/wp-content/uploads/2023/11/Temu-Logo.jpg",
  },
  {
    name: "Nike",
    href: "https://www.nike.com",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
  },
  {
    name: "Macy's",
    href: "https://www.macys.com",
    logo: "https://logos-world.net/wp-content/uploads/2021/09/Macys-Emblem.png",
  },
  {
    name: "Apple",
    href: "https://www.apple.com",
    logo: "https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-index-content-uploads-10.png",
  },
  {
    name: "Fashion Nova",
    href: "https://www.fashionnova.com",
    logo: "https://uspto.report/TM/87771039/mark.png",
  },
  {
    name: "Best Buy",
    href: "https://www.bestbuy.com",
    logo: "https://corporate.bestbuy.com/wp-content/uploads/2022/11/BBY-logo-white-background.jpeg",
  },
  {
    name: "Walmart",
    href: "https://www.walmart.com",
    logo: "https://logoeps.com/wp-content/uploads/2013/06/walmart-new-vector-logo.png",
  },
  {
    name: "eBay",
    href: "https://www.ebay.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png",
  },
  {
    name: "Sephora",
    href: "https://www.sephora.com",
    logo: "https://images.seeklogo.com/logo-png/20/2/sephora-logo-png_seeklogo-208666.png",
  },
  {
    name: "GOAT",
    href: "https://www.goat.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/GOAT_LOGO_BLACK_2024.png",
  },
  {
    name: "StockX",
    href: "https://www.stockx.com",
    logo: "https://images.seeklogo.com/logo-png/39/1/stockx-logo-png_seeklogo-393737.png",
  },
];

export default function About() {
  return (
    <section className="stores-section">
      <div className="container">
        <h1>Stores We Ship From</h1>
        <p className="subtitle">
          Shop from your favorite US stores and we'll handle the shipping to
          Trinidad &amp; Tobago
        </p>

        <div className="stores-grid">
          {stores.map((store) => (
            <div className="store-card" key={store.name}>
              <a
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={store.logo}
                  alt={store.name}
                  className="store-logo"
                />
                <span className="store-name">{store.name}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="more-stores-note">
          <p>
            Don't see your favorite store listed?{" "}
            <a
              href="https://www.instagram.com/shippers.tt_"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us
            </a>{" "}
            to ask if we can shop from them!
          </p>
        </div>
      </div>
    </section>
  );
}
