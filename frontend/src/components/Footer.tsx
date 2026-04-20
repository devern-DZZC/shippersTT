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
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <div className="brand-footer">
            <img src="/shippers_logo.jpeg" alt="ShippersTT logo" />
            <div>
              <h3>ShippersTT</h3>
              <p>International shopping, quoted clearly and delivered reliably.</p>
            </div>
          </div>
          <p className="footer-description">
            We help customers across Trinidad and Tobago access global brands
            with a smoother, more transparent shipping experience.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/shippers.tt_"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@shippers.tt"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/about">Shop</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4>Reach Us</h4>
          <div className="footer-links footer-contact-list">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 ShippersTT. Built for confident international shopping.</p>
        <Link to="/calculator">Get your estimate</Link>
      </div>
    </footer>
  );
}
