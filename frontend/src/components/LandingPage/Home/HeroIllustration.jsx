import "./HeroIllustration.css";

const menu = [
  ["Dashboard", "fa-house"],
  ["Invoices", "fa-file-lines"],
  ["Customers", "fa-user-group"],
  ["Products", "fa-bag-shopping"],
  ["Inventory", "fa-boxes-stacked"],
  ["Payments", "fa-wallet"],
  ["Expenses", "fa-receipt"],
  ["Reports", "fa-chart-column"],
  ["Staff", "fa-users"],
  ["Settings", "fa-gear"],
];

const stats = [
  { label: "Total Sales", value: "₹2,45,000", change: "12%", icon: "fa-bag-shopping", color: "blue" },
  { label: "Total Received", value: "₹1,85,000", change: "9%", icon: "fa-bag-shopping", color: "green" },
  { label: "Outstanding", value: "₹60,000", change: "5%", icon: "fa-hourglass-half", color: "orange", danger: true },
  { label: "Total Invoices", value: "142", change: "8%", icon: "fa-file-lines", color: "purple" },
];

const payments = [
  { name: "Rahul", amount: "₹5,000", due: "Due: 30 Sep" },
  { name: "Amit", amount: "₹8,500", due: "Due: 25 Sep" },
  { name: "Suresh", amount: "₹2,300", due: "Due: 20 Sep" },
];

const invoices = [
  { no: "INV-1023", customer: "Rohit", amount: "₹1,500", status: "Paid", date: "03 Oct" },
  { no: "INV-1022", customer: "Rahul", amount: "₹2,800", status: "Paid", date: "02 Oct" },
  { no: "INV-1021", customer: "Amit", amount: "₹3,500", status: "Unpaid", date: "29 Sep" },
  { no: "INV-1020", customer: "Suresh", amount: "₹1,800", status: "Paid", date: "26 Sep" },
];

const actions = [
  { label: "Create Invoice", icon: "fa-file-lines", color: "blue" },
  { label: "Add Customer", icon: "fa-user-plus", color: "indigo" },
  { label: "Add Product", icon: "fa-bag-shopping", color: "green" },
  { label: "Send WhatsApp", icon: "fa-whatsapp", color: "wa", brand: true },
];

function HeroIllustration() {
  return (
    <div className="bkHero" aria-hidden="true">
      <span className="bkPanel"></span>
      <span className="bkGlow bkGlowOne"></span>
      <span className="bkGlow bkGlowTwo"></span>

      {/* ---------- Dashboard ---------- */}
      <div className="bkDash">
        <aside className="bkSide">
          <div className="bkBrand">
            <span className="bkBrandIcon">
              <i className="fa-solid fa-bars-staggered"></i>
            </span>
            <strong>BillKhata</strong>
          </div>

          {menu.map(([name, icon], index) => (
            <div className={`bkNav ${index === 0 ? "active" : ""}`} key={name}>
              <i className={`fa-solid ${icon}`}></i>
              <span>{name}</span>
            </div>
          ))}
        </aside>

        <div className="bkMain">
          {/* Header */}
          <div className="bkHead">
            <div>
              <h4>Good Morning, Rahul 👋</h4>
              <small>Here's what's happening with your business today.</small>
            </div>
            <div className="bkHeadRight">
              <span className="bkPill">
                October 2026 <i className="fa-solid fa-chevron-down"></i>
              </span>
              <span className="bkUser">
                <b>R</b>
                <span>
                  <strong>Rahul Hardware</strong>
                  <small>Owner</small>
                </span>
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="bkStats">
            {stats.map((s) => (
              <div className="bkStat" key={s.label}>
                <div className="bkStatTop">
                  <span className={`bkStatIcon ${s.color}`}>
                    <i className={`fa-solid ${s.icon}`}></i>
                  </span>
                  <div>
                    <small>{s.label}</small>
                    <strong className={s.danger ? "danger" : ""}>{s.value}</strong>
                  </div>
                </div>
                <em>
                  <i className="fa-solid fa-arrow-up"></i> {s.change}{" "}
                  <span>from last month</span>
                </em>
              </div>
            ))}
          </div>

          {/* Chart + outstanding */}
          <div className="bkRow bkRowMid">
            <div className="bkBox bkChartBox">
              <div className="bkBoxHead">
                <strong>Sales Overview</strong>
                <span className="bkPill small">This Month</span>
              </div>

              <div className="bkChart">
                <div className="bkAxis">
                  <span>₹60k</span>
                  <span>₹40k</span>
                  <span>₹20k</span>
                  <span>₹0</span>
                </div>

                <svg viewBox="0 0 220 70" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bkArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6d6aff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6d6aff" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[0, 23, 46, 69].map((y) => (
                    <line key={y} x1="0" x2="220" y1={y} y2={y} className="bkGrid" />
                  ))}

                  <path
                    className="bkArea"
                    fill="url(#bkArea)"
                    d="M0 64 C10 60 14 52 24 54 S40 60 52 48 S70 42 80 36 S96 32 104 38 S120 26 132 24 S150 32 158 26 S176 16 190 14 S206 10 220 6 V70 H0 Z"
                  />
                  <path
                    className="bkLine"
                    pathLength="1"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    d="M0 64 C10 60 14 52 24 54 S40 60 52 48 S70 42 80 36 S96 32 104 38 S120 26 132 24 S150 32 158 26 S176 16 190 14 S206 10 220 6"
                  />
                  <circle className="bkDot" cx="220" cy="6" r="2.6" />
                </svg>
              </div>
            </div>

            <div className="bkBox">
              <div className="bkBoxHead">
                <strong>Outstanding Payments</strong>
                <span className="bkLink">View All</span>
              </div>

              {payments.map((p) => (
                <div className="bkPay" key={p.name}>
                  <span className="bkPayAvatar">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <b>{p.name}</b>
                  <span className="bkPayAmount">{p.amount}</span>
                  <small>{p.due}</small>
                  <span className="bkRemind">Send Reminder</span>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices + quick actions */}
          <div className="bkRow bkRowBottom">
            <div className="bkBox bkTableBox">
              <div className="bkBoxHead">
                <strong>Recent Invoices</strong>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Invoice No.</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.no}>
                      <td>{inv.no}</td>
                      <td>{inv.customer}</td>
                      <td>{inv.amount}</td>
                      <td>
                        <span className={`bkStatus ${inv.status.toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td>{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bkBox">
              <div className="bkBoxHead">
                <strong>Quick Actions</strong>
              </div>

              {actions.map((a) => (
                <div className="bkAction" key={a.label}>
                  <span className={`bkActionIcon ${a.color}`}>
                    <i className={`${a.brand ? "fa-brands" : "fa-solid"} ${a.icon}`}></i>
                  </span>
                  {a.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- WhatsApp callout ---------- */}
      <div className="bkCallout">
        <p>
          Send invoices
          <br />
          on WhatsApp
          <br />
          instantly
        </p>
        <svg viewBox="0 0 60 50" className="bkArrow">
          <path d="M50 4 C52 24 36 34 12 40" />
          <path d="M20 32 L11 40 L22 44" />
        </svg>
        <span className="bkWa">
          <i className="fa-brands fa-whatsapp"></i>
        </span>
      </div>

      {/* ---------- Phone ---------- */}
      <div className="bkPhone">
        <div className="bkScreen">
          <div className="bkNotch"></div>

          <div className="bkChatHead">
            <i className="fa-solid fa-arrow-left"></i>
            <span className="bkChatAvatar">R</span>
            <div>
              <strong>Rahul Hardware</strong>
              <small>Business Account</small>
            </div>
          </div>

          <div className="bkChatBody">
            <div className="bkBubble">
              <p>Hello Rahul,</p>
              <p>Thank you for your purchase!</p>
              <p>Your invoice #INV-1023 is attached.</p>
              <p className="gap">
                Total: ₹2,800
                <br />
                Paid: ₹2,800
                <br />
                Remaining: ₹0
              </p>
              <p className="gap">Thank you!</p>

              <div className="bkPdf">
                <span>PDF</span>
                <div>
                  <b>INV-1023.pdf</b>
                  <small>2 pages · 245 KB</small>
                </div>
              </div>
              <small className="bkTime">
                10:46 AM <i className="fa-solid fa-check-double"></i>
              </small>
            </div>
          </div>

          <div className="bkChatInput">
            <span>Type a message</span>
            <b>
              <i className="fa-solid fa-microphone"></i>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroIllustration;