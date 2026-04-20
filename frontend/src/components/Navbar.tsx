import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="brand">
        <img src="/shippers_logo.jpeg" alt="ShippersTT Logo" />
        <Link to="/">SHIPPERSTT</Link>
      </div>
      <div className="nav-menu">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/calculator"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Calculator
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Shop
        </NavLink>
      </div>
    </nav>
  );
}
