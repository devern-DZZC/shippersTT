import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent-400 after:rounded"
        : "text-white/60 hover:text-white"
    }`;

  return (
    <nav
      id="navbar"
      className="fixed top-0 w-full z-50 flex items-center justify-between px-[8%] py-5 bg-navy-900/90 backdrop-blur-lg border-b border-white/5 transition-all duration-300 [&.scrolled]:py-3 [&.scrolled]:bg-navy-950/95 [&.scrolled]:shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 no-underline group">
        <img
          src="/shippers_logo.jpeg"
          alt="ShippersTT Logo"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-accent-400/30 transition-all duration-300 group-hover:ring-accent-400/60"
        />
        <span className="font-display font-bold text-[17px] tracking-tight text-white">
          SHIPPERS<span className="text-accent-400">TT</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/calculator" className={linkClass}>Calculator</NavLink>
        <NavLink to="/about" className={linkClass}>Shop</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        <Link
          to="/calculator"
          className="ml-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-accent-400 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,212,255,0.3)] hover:-translate-y-0.5 no-underline"
        >
          Get Quote
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
        <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-navy-950/98 backdrop-blur-xl border-t border-white/5 flex flex-col items-center gap-6 py-8 transition-all duration-400 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/calculator" className={linkClass} onClick={() => setMenuOpen(false)}>Calculator</NavLink>
        <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <Link
          to="/calculator"
          className="mt-2 px-8 py-3 bg-gradient-to-r from-brand-500 to-accent-400 text-white font-semibold rounded-lg no-underline"
          onClick={() => setMenuOpen(false)}
        >
          Get Quote
        </Link>
      </div>
    </nav>
  );
}
