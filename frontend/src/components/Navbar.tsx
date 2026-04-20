import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Calculator", to: "/calculator" },
  { label: "Shop", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar" id="navbar" aria-label="Primary navigation">
      <div className="navbar-shell">
        <Link to="/" className="brand" aria-label="ShippersTT home">
          <img src="/shippers_logo.jpeg" alt="ShippersTT logo" />
          <span>
            <strong>ShippersTT</strong>
            <small>Shipping concierge</small>
          </span>
        </Link>

        <button
          type="button"
          className={`nav-toggle ${isOpen ? "open" : ""}`}
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>

        <div className={`nav-panel ${isOpen ? "open" : ""}`} id="primary-menu">
          <div className="nav-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Link to="/calculator" className="nav-cta">
            Estimate shipment
          </Link>
        </div>
      </div>
    </nav>
  );
}
