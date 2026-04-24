import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden">
      {/* Wave SVG Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-white"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-[8%] pt-24 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/shippers_logo.jpeg"
                alt="ShippersTT Logo"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-accent-400/30"
              />
              <h3 className="font-display font-bold text-xl m-0">
                Shippers<span className="text-accent-400">TT</span>
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Your trusted partner for international shopping and reliable
              delivery throughout Trinidad and Tobago.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/shippers.tt_"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-white/60 transition-all duration-300 hover:bg-accent-400/20 hover:text-accent-400 hover:-translate-y-0.5 no-underline"
              >
                <i className="fab fa-instagram text-lg" />
              </a>
              <a
                href="https://www.tiktok.com/@shippers.tt"
                title="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-white/60 transition-all duration-300 hover:bg-accent-400/20 hover:text-accent-400 hover:-translate-y-0.5 no-underline"
              >
                <i className="fab fa-tiktok text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-white/60 text-sm no-underline transition-colors hover:text-accent-400">Home</Link>
              <Link to="/calculator" className="text-white/60 text-sm no-underline transition-colors hover:text-accent-400">Calculator</Link>
              <Link to="/about" className="text-white/60 text-sm no-underline transition-colors hover:text-accent-400">Shop</Link>
              <Link to="/contact" className="text-white/60 text-sm no-underline transition-colors hover:text-accent-400">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-white/60 text-sm m-0">shippers.tt@gmail.com</p>
              <p className="text-white/60 text-sm m-0">(868) 463-2790</p>
              <p className="text-white/60 text-sm m-0">San Fernando, Trinidad</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-white/60 text-sm m-0">International Shopping</p>
              <p className="text-white/60 text-sm m-0">Shipping &amp; Delivery</p>
              <p className="text-white/60 text-sm m-0">Cost Estimation</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs m-0">
            &copy; {new Date().getFullYear()} ShippersTT. All rights reserved.
          </p>
          <p className="text-white/30 text-xs m-0">
            Delivering the world to Trinidad &amp; Tobago ✈️
          </p>
        </div>
      </div>
    </footer>
  );
}
