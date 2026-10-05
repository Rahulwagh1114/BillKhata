import "./FeaturesBill.css";

const reminderSteps = [
  { number: "01", title: "Select Customer", text: "Choose existing customer or add new one." },
  { number: "02", title: "Add Products", text: "Add items, quantity, price and discount." },
  { number: "03", title: "Generate & Send", text: "Get PDF and send invoice via WhatsApp." },
];

const ledgerStats = [
  { label: "Total Purchase", value: "₹85,000", color: "blue", icon: "fa-solid fa-bag-shopping" },
  { label: "Total Paid", value: "₹65,000", color: "green", icon: "fa-solid fa-circle-check" },
  { label: "Pending", value: "₹20,000", color: "red", icon: "fa-solid fa-clock" },
];

const ledgerTabs = ["Transactions", "Invoices", "Payments"];

const ledgerRows = [
  { date: "05 Oct 2025", type: "Invoice", ref: "INV-1024", amount: "₹10,000", balance: "₹20,000" },
  { date: "03 Oct 2025", type: "Payment", ref: "-", amount: "-₹5,800", balance: "₹10,000" },
  { date: "28 Sep 2025", type: "Invoice", ref: "INV-1018", amount: "₹15,000", balance: "₹15,000" },
];

const analyticsStats = [
  { label: "Total Sales", value: "₹2,45,000", change: "↑ 12%", up: true, icon: "fa-solid fa-chart-line" },
  { label: "Total Received", value: "₹1,85,000", change: "↑ 10%", up: true, icon: "fa-solid fa-wallet" },
  { label: "Outstanding", value: "₹60,000", change: "↓ 5%", up: false, icon: "fa-solid fa-hourglass-half" },
];

const chartBars = [30, 45, 38, 60, 50, 72, 55, 80, 62, 70, 58, 85, 66, 90];

const businessTypes = [
  { name: "Grocery Store", icon: "fa-solid fa-basket-shopping", color: "green" },
  { name: "Hardware Shop", icon: "fa-solid fa-screwdriver-wrench", color: "purple" },
  { name: "Clothing Store", icon: "fa-solid fa-shirt", color: "orange" },
  { name: "Salon", icon: "fa-solid fa-scissors", color: "violet" },
  { name: "Restaurant & Cafe", icon: "fa-solid fa-utensils", color: "red" },
  { name: "Mobile Shop", icon: "fa-solid fa-mobile-screen", color: "blue" },
  { name: "Electrical Shop", icon: "fa-solid fa-bolt", color: "yellow" },
  { name: "Service Business", icon: "fa-solid fa-gears", color: "indigo" },
];

const howItWorks = [
  { title: "1. Create Business", text: "Sign up and add your business details.", icon: "fa-regular fa-building" },
  { title: "2. Add Customers & Products", text: "Add your customers and product list.", icon: "fa-solid fa-user-plus" },
  { title: "3. Create & Send Bills", text: "Generate invoice and send on WhatsApp.", icon: "fa-solid fa-file-invoice" },
  { title: "4. Track Payments & Income", text: "Monitor payments and view business reports.", icon: "fa-solid fa-wallet" },
];

function FeaturesBill() {
  return (
    <section className="hf">
      {/* ---------- Row 1 ---------- */}
      <div className="hfRow hfRowTop">
        {/* Column 1: Pending payments */}
        <div className="hfCol">
          <span className="hfBadge">Stay Updated</span>
          <h3 className="hfTitle">Never Lose Track of Pending Payments</h3>
          <p className="hfText">
            Know who has paid, who hasn't, and how much is still pending. Send
            reminders with just one click.
          </p>

          <div className="hfSteps">
            {reminderSteps.map((step) => (
              <div className="hfStep" key={step.number}>
                <span className="hfStepNumber">{step.number}</span>
                <div>
                  <h5>{step.title}</h5>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#" className="hfBtn">
            Try It Now <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        {/* Column 2: Customer ledger */}
        <div className="hfCol">
          <span className="hfBadge">Complete Ledger</span>
          <h3 className="hfTitle">Every Customer's Account in One Place</h3>
          <p className="hfText">
            See complete transaction history, total purchased, paid amount and
            due, all in one view.
          </p>

          <div className="hfLedger">
            <div className="hfLedgerHead">
              <span className="hfAvatar">R</span>
              <div>
                <strong>Rahul Traders</strong>
                <small>+91 98765 64210</small>
              </div>
            </div>

            <div className="hfLedgerStats">
              {ledgerStats.map((stat) => (
                <div className={`hfLedgerStat ${stat.color}`} key={stat.label}>
                  <span className="hfLedgerStatLabel">
                    <i className={stat.icon}></i> {stat.label}
                  </span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="hfTabs">
              {ledgerTabs.map((tab, index) => (
                <span className={index === 0 ? "active" : ""} key={tab}>
                  {tab}
                </span>
              ))}
            </div>

            <div className="hfTableWrap">
              <table className="hfTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Invoice/Ref</th>
                    <th>Amount</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerRows.map((row) => (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td>{row.type}</td>
                      <td>{row.ref}</td>
                      <td>{row.amount}</td>
                      <td>{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hfLedgerActions">
              <button className="hfMiniBtn primary">
                <i className="fa-regular fa-paper-plane"></i> Send Invoice
              </button>
              <button className="hfMiniBtn whatsapp">
                <i className="fa-brands fa-whatsapp"></i> Send Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Analytics */}
        <div className="hfCol">
          <span className="hfBadge">Business Analytics</span>
          <h3 className="hfTitle">Know How Your Business Is Performing</h3>
          <p className="hfText">
            Track your sales, payments, expenses and more with beautiful charts
            and reports.
          </p>

          <div className="hfFilterRow">
            <select className="hfSelect" defaultValue="month">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="hfAnalytics">
            <div className="hfAnalyticsStats">
              {analyticsStats.map((stat) => (
                <div className="hfAnalyticsStat" key={stat.label}>
                  <span className="hfAnalyticsLabel">
                    <i className={stat.icon}></i> {stat.label}
                  </span>
                  <strong>{stat.value}</strong>
                  <small className={stat.up ? "up" : "down"}>{stat.change}</small>
                </div>
              ))}
            </div>

            <h6 className="hfChartTitle">Sales Overview</h6>
            <div className="hfChart">
              {chartBars.map((height, index) => (
                <span
                  key={index}
                  className={index % 2 === 0 ? "light" : "dark"}
                  style={{ height: `${height}%` }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Row 2 ---------- */}
      <div className="hfRow hfRowBottom">
        {/* Column 1: Business types */}
        <div className="hfCol">
          <h3 className="hfTitle small">Perfect for Every Business</h3>
          <p className="hfText">
            Whether you run a small shop or a growing business, SmartBill is
            built for you.
          </p>

          <div className="hfBusinessGrid">
            {businessTypes.map((item) => (
              <div className="hfBusiness" key={item.name}>
                <span className={`hfBusinessIcon ${item.color}`}>
                  <i className={item.icon}></i>
                </span>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: How it works */}
        <div className="hfCol">
          <h3 className="hfTitle small">How It Works</h3>
          <p className="hfText">
            Get started in 4 simple steps and manage your business effortlessly.
          </p>

          <div className="hfWorkGrid">
            {howItWorks.map((item) => (
              <div className="hfWork" key={item.title}>
                <span className="hfWorkIcon">
                  <i className={item.icon}></i>
                </span>
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Testimonial */}
        <div className="hfCol hfTestimonial">
          <i className="fa-solid fa-quote-left hfQuoteIcon"></i>
          <p className="hfQuote">
            "SmartBill has made our business so much easier. Now I keep every
            customer's account, payments and invoices in one place. Sending bills
            on WhatsApp is very convenient!"
          </p>

          <div className="hfPerson">
            <span className="hfAvatar">RS</span>
            <div>
              <strong>Rahul Sharma</strong>
              <small>Hardware Store Owner, Nagpur</small>
              <div className="hfStars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBill;