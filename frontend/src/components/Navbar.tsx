import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Calculator", to: "/calculator" },
  { label: "Shop", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const linkBaseClass =
  "relative rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-700";
const linkActiveClass =
  "bg-brand-50 text-brand-700 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-accent-400";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav id="navbar" aria-label="Primary navigation" className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="navbar-shell mx-auto flex w-full max-w-6xl items-center justify-between gap-5 rounded-full border border-white/70 bg-white/85 px-5 py-3 shadow-brand-pill backdrop-blur-xl transition-all duration-200">
        <Link to="/" aria-label="ShippersTT home" className="flex min-w-0 items-center gap-3">
          <img
            src="/shippers_logo.jpeg"
            alt="ShippersTT logo"
            className="h-12 w-12 rounded-[18px] object-cover shadow-[0_12px_24px_rgba(15,94,156,0.18)]"
          />
          <span className="flex min-w-0 flex-col">
            <strong className="truncate text-[1.05rem] font-extrabold tracking-[-0.03em] text-ink-900">
              ShippersTT
            </strong>
            <small className="truncate text-sm text-ink-600">Shipping concierge</small>
          </span>
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 md:hidden"
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${
              isOpen ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`mt-1.5 block h-0.5 w-5 bg-current transition-transform duration-200 ${
              isOpen ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>

        <div
          id="primary-menu"
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute left-4 right-4 top-[calc(100%+12px)] flex-col gap-4 rounded-[1.75rem] border border-brand-200/70 bg-white/95 p-5 shadow-brand-card backdrop-blur-xl md:static md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
        >
          <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `${linkBaseClass} ${isActive ? linkActiveClass : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/calculator"
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 text-base font-bold text-white shadow-[0_16px_30px_rgba(15,94,156,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(15,94,156,0.28)]"
          >
            Estimate shipment
          </Link>
        </div>
      </div>
    </nav>
  );
}

