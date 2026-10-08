import { useState, useEffect } from "react";
import Logo from "../LandingPage/Home/Logo";
import "./Sidebar.css";
import {NavLink} from "react-router-dom";


const menuItems = [
  { name: "Dashboard", icon: "fa-solid fa-house", path: "/dashboard", end: true },
  { name: "Invoices", icon: "fa-solid fa-file-lines", path: "/dashboard/invoices" },
  { name: "Customers", icon: "fa-solid fa-user-group", path: "/dashboard/customers" },
  { name: "Products", icon: "fa-solid fa-bag-shopping", path: "/dashboard/products" },
  //   { name: "Inventory", icon: "fa-solid fa-boxes-stacked" },
  { name: "Payments", icon: "fa-solid fa-wallet", path: "/dashboard/payments" },
  //   { name: "Expenses", icon: "fa-solid fa-receipt" },
  { name: "Reports", icon: "fa-solid fa-chart-column", path: "/dashboard/reports" },
  //   { name: "Staff", icon: "fa-solid fa-users" },
  { name: "Settings", icon: "fa-solid fa-gear", path: "/dashboard/settings" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Stop background scrolling while the mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger (visible only on mobile/tablet) */}
      <button
        className="sidebarToggle"
        onClick={openSidebar}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Dark overlay behind the sidebar */}
      <div
        className={`sidebarOverlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebarHeader">
          <Logo />
          <button
            className="sidebarClose"
            onClick={closeSidebar}
            // aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="sidebarOptions">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
              <NavLink to={item.path} end={item.end} onClick={closeSidebar}>
              <i className={item.icon}></i>
               <span>{item.name}</span>
               </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;