import { useState } from "react";
import Logo from "./Logo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="titleDiv">
        <Logo />
      </div>

      <div className={`navMenu ${isOpen ? "open" : ""}`}>
        <div className="optionsDiv">
          <ul>
            <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/features" onClick={closeMenu}>Features</NavLink></li>
            <li><NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink></li>
            <li><NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink></li>
          </ul>
        </div>

        <div className="authDiv">
          <a href="#" className="loginBtn" onClick={closeMenu}>Login</a>
        </div>
      </div>

      <button
        className="hamburgerBtn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>
    </header>
  );
}

export default Navbar;