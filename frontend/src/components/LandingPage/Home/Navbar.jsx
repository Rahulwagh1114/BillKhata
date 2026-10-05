import { useState } from "react";
import Logo from "./Logo";
import "./Navbar.css";

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
            <li><a href="#" onClick={closeMenu}>Home</a></li>
            <li><a href="#" onClick={closeMenu}>Features</a></li>
            <li><a href="#" onClick={closeMenu}>Pricing</a></li>
            <li><a href="#" onClick={closeMenu}>Dashboard</a></li>
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