import { useState } from "react";
import "./Hero.css";
import SalesOverview from "./SalesOverview";

const stats = [
  {
    label: "Total Sales",
    value: "₹2,45,000",
    change: "12%",
    icon: "fa-solid fa-bag-shopping",
    color: "blue",
  },
  {
    label: "Total Received",
    value: "₹1,85,000",
    change: "9%",
    icon: "fa-solid fa-bag-shopping",
    color: "green",
  },
  {
    label: "Outstanding",
    value: "₹60,000",
    change: "5%",
    icon: "fa-solid fa-hourglass-half",
    color: "orange",
    danger: true,
  },
  {
    label: "Total Invoices",
    value: "142",
    change: "8%",
    icon: "fa-solid fa-file-lines",
    color: "purple",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const now = new Date();
const year = now.getFullYear();

function Hero() {
    const [range, setRange] = useState(now.getMonth());
  return (
    <main className="heroDiv">
      <header className="heroTopItem">
        <div className="heroWelcome">
          <h3>Welcome, Rahul 👋</h3>
          <p>Here's what's happening with your business today.</p>
        </div>

        <div className="btnInvoice">
            <button>Create Invoice</button>
        </div>

        <div className="heroUser">
            <select
      className="salesSelect"
      value={range}
      onChange={(e) => setRange(Number(e.target.value))}
    >
      {MONTHS.map((name, index) => (
        <option key={name} value={index}>
          {name} {year}
        </option>
      ))}
    </select>
        
          <a href="/" className="heroHomeLink"> <i className="fa-solid fa-house"></i> Home</a>
          <div className="loginShow">
            <span className="loginAvatar">R</span>
            <span className="loginName">Rahul</span>
          </div>
        </div>
      </header>

      <section className="statCards">
        {stats.map((stat) => (
          <div className="statCard" key={stat.label}>
            <div className="statTop">
              <span className={`statIcon ${stat.color}`}>
                <i className={stat.icon}></i>
              </span>
              <p className="statLabel">{stat.label}</p>
            </div>

            <h3 className={`statValue ${stat.danger ? "danger" : ""}`}>
              {stat.value}
            </h3>

            <p className="statChange">
              <span className="statArrow">
                <i className="fa-solid fa-arrow-up"></i> {stat.change}
              </span>
              from last month
            </p>
          </div>
        ))}
      </section>

     <SalesOverview/>
    </main>
  );
}

export default Hero;