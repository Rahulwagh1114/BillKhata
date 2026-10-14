import { useState, useContext } from "react";
import Logo from "./Logo";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Autho from "../../Dashboard/Autho";
import { MyContext } from "../../../MyContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAutho, setShowAutho] = useState(false);
  const { isLogin, setIsLogin } = useContext(MyContext);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("businessLogin");
      setIsLogin(false);
      closeMenu();
      navigate("/");
    }
  };

  return (
    <>
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
            {isLogin ? (
              <a href="#" className="loginBtn" onClick={handleLogout}>
                Logout <i className="fa-solid fa-right-from-bracket"></i>
              </a>
            ) : (
              <a
                href="#"
                className="loginBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAutho(true);
                }}
              >
                Login <i className="fa-solid fa-right-to-bracket"></i>
              </a>
            )}
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

      {showAutho && <Autho onClose={() => setShowAutho(false)} />}
    </>
  );
}

export default Navbar;