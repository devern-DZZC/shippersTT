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
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png",
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
    <>
      {/* Page Header */}
      <section className="relative py-10 md:py-14 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-brand-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-accent-400/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-[8%] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-accent-400 text-sm font-medium font-display mb-4">
            <i className="fas fa-store text-xs" />
            Shop With Us
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-2">
            Stores We <span className="gradient-text">Ship From</span>
          </h1>
          <p className="text-white/50 text-base max-w-md mx-auto m-0">
            Shop from your favorite US stores and we'll handle the shipping to
            Trinidad &amp; Tobago
          </p>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16 md:py-24 bg-cloud-50 relative">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0077b6 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />

        <div className="relative max-w-6xl mx-auto px-[8%]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {stores.map((store, i) => (
              <a
                key={store.name}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fade-in group bg-white rounded-2xl p-6 text-center no-underline border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,119,182,0.1)] hover:border-brand-500/20"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="w-full aspect-square flex items-center justify-center mb-4 p-2">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <span className="font-display font-semibold text-sm text-navy-900 group-hover:text-brand-500 transition-colors duration-300">
                  {store.name}
                </span>
              </a>
            ))}
          </div>

          {/* CTA Note */}
          <div className="fade-in mt-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-question-circle text-2xl text-brand-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                Don't see your favorite store?
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                We can shop from almost any US-based retailer. Just ask!
              </p>
              <a
                href="https://www.instagram.com/shippers.tt_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-400 text-white font-display font-semibold text-sm rounded-xl no-underline transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,212,255,0.3)] hover:-translate-y-0.5"
              >
                <i className="fab fa-instagram" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
