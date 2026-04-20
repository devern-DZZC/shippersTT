import { Link } from "react-router-dom";

const contactItems = [
  {
    label: "Email",
    value: "shippers.tt@gmail.com",
    href: "mailto:shippers.tt@gmail.com",
  },
  {
    label: "Phone",
    value: "(868) 463-2790",
    href: "tel:+18684632790",
  },
  {
    label: "Instagram",
    value: "@shippers.tt_",
    href: "https://www.instagram.com/shippers.tt_",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-brand-800 to-brand-700 px-4 pb-8 pt-[4.5rem] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_0.7fr_0.7fr]">
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/shippers_logo.jpeg"
              alt="ShippersTT logo"
              className="h-[3.75rem] w-[3.75rem] rounded-[22px] object-cover"
            />
            <div>
              <h3 className="text-xl font-bold">ShippersTT</h3>
              <p className="mt-1 text-sm text-white/80">
                International shopping, quoted clearly and delivered reliably.
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-[42ch] text-sm leading-6 text-white/78">
            We help customers across Trinidad and Tobago access global brands with a
            smoother, more transparent shipping experience.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/shippers.tt_"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@shippers.tt"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Explore</h4>
          <div className="mt-4 grid gap-2 text-sm text-white/78">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/calculator" className="hover:text-white">
              Calculator
            </Link>
            <Link to="/about" className="hover:text-white">
              Shop
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Reach Us</h4>
          <div className="mt-4 grid gap-3 text-sm text-white/78">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-white"
              >
                <span className="block">{item.label}</span>
                <strong className="mt-1 block text-white">{item.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-9 flex w-full max-w-6xl flex-col items-start justify-between gap-4 border-t border-white/14 pt-6 text-sm text-white/78 md:flex-row md:items-center">
        <p>&copy; 2026 ShippersTT. Built for confident international shopping.</p>
        <Link to="/calculator" className="font-extrabold text-white hover:text-accent-400">
          Get your estimate
        </Link>
      </div>
    </footer>
  );
}

