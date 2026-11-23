import "./InvoiceIllustration.css";

const menu = [
  ["Dashboard", "fa-house"],
  ["Invoices", "fa-file-lines"],
  ["Customers", "fa-user-group"],
  ["Products", "fa-bag-shopping"],
  ["Inventory", "fa-boxes-stacked"],
  ["Payments", "fa-wallet"],
  ["Reports", "fa-chart-column"],
  ["Staff", "fa-users"],
  ["Settings", "fa-gear"],
];

const items = [
  { name: "Cement", qty: 5, rate: "₹400", amount: "₹2,000" },
  { name: "Paint", qty: 2, rate: "₹800", amount: "₹1,600" },
  { name: "Brush", qty: 3, rate: "₹100", amount: "₹300" },
];

function InvoiceIllustration() {
  return (
    <div className="biHero" aria-hidden="true">
      <span className="biPanel"></span>
      <span className="biGlow biGlowOne"></span>
      <span className="biGlow biGlowTwo"></span>

      {/* ---------- Dashboard (left) ---------- */}
      <div className="biDash">
        <aside className="biSide">
          <div className="biBrand">
            <span className="biBrandIcon">
              <i className="fa-solid fa-bars-staggered"></i>
            </span>
            <strong>BillKhata</strong>
          </div>

          {menu.map(([name, icon]) => (
            <div className="biNav" key={name}>
              <i className={`fa-solid ${icon}`}></i>
              <span>{name}</span>
            </div>
          ))}
        </aside>

        <div className="biMain">
          <div className="biTopBar">
            <i className="fa-regular fa-bell"></i>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          <div className="biForm">
            <h4>Create Invoice</h4>

            <div className="biCustomer">
              <div>
                <small>Customer</small>
                <div className="biSelect">
                  Rahul Sharma <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <span className="biAddCustomer">
                <i className="fa-solid fa-plus"></i> Add Customer
              </span>
            </div>

            <div className="biTable">
              <div className="biTr biTh">
                <span>Product</span>
                <span>Quantity</span>
                <span>Rate</span>
                <span className="end">Amount</span>
                <span></span>
              </div>

              {items.map((item, i) => (
                <div className="biTr biRow" style={{ animationDelay: `${0.8 + i * 0.7}s` }} key={item.name}>
                  <span>{item.name}</span>
                  <span>
                    <b className="biQty">{item.qty}</b>
                  </span>
                  <span>{item.rate}</span>
                  <span className="end">{item.amount}</span>
                  <span className="biX">
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              ))}
            </div>

            <span className="biAddProduct">
              <i className="fa-solid fa-plus"></i> Add Product
            </span>

            <div className="biBottom">
              <div className="biStatusBox">
                <strong>Payment Status</strong>
                <div className="biRadios">
                  <span className="on">
                    <i></i> Paid
                  </span>
                  <span>
                    <i></i> Partial
                  </span>
                  <span>
                    <i></i> Overdue
                  </span>
                </div>
              </div>

              <div className="biTotals">
                <p>
                  <span>Subtotal</span>
                  <span>₹3,900</span>
                </p>
                <p>
                  <span>Discount</span>
                  <span>-₹100</span>
                </p>
                <p className="biGrand">
                  <span>Total</span>
                  <span>₹3,800</span>
                </p>
              </div>
            </div>

            <div className="biButtons">
              <span className="biBtn primary">
                <i className="fa-solid fa-gear"></i> Generate Invoice
              </span>
              <span className="biBtn wa">
                <i className="fa-brands fa-whatsapp"></i> Send WhatsApp
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Invoice preview (right) ---------- */}
      <div className="biPreview">
        <div className="biPrevHead">
          <span className="biAvatar">R</span>
          <div>
            <strong>Rahul Hardware</strong>
            <small>Nagpur, Maharashtra</small>
          </div>
        </div>

        <div className="biMeta">
          <span>Invoice No: INV-1034</span>
          <small>Date: October 2026</small>
        </div>

        <div className="biBill">
          <small>Bill To</small>
          <strong>Rahul Sharma</strong>
          <span>9876543210</span>
        </div>

        <div className="biPrevTable">
          <div className="biPrevRow head">
            <span>Item</span>
            <span>Qty</span>
            <span>Rate</span>
            <span className="end">Amount</span>
          </div>
          {items.map((item, i) => (
            <div
              className="biPrevRow biRow"
              style={{ animationDelay: `${1.2 + i * 0.7}s` }}
              key={item.name}
            >
              <span>{item.name}</span>
              <span>{item.qty}</span>
              <span>{item.rate}</span>
              <span className="end">{item.amount}</span>
            </div>
          ))}
        </div>

        <div className="biPrevTotals">
          <p>
            <span>SubTotal</span>
            <span>₹3,900</span>
          </p>
          <p>
            <span>Discount</span>
            <span>-₹100</span>
          </p>
          <p className="biPrevGrand">
            <span>Total</span>
            <span>₹3,800</span>
          </p>
        </div>

        <div className="biPaid">
          Payment Status : <span>Paid</span>
        </div>

        <div className="biFoot">
          <small>Thank you for your business!</small>
          <span className="biQr"></span>
        </div>
      </div>

      {/* ---------- WhatsApp sent toast ---------- */}
      <div className="biToast">
        <span className="biToastIcon">
          <i className="fa-brands fa-whatsapp"></i>
        </span>
        <div>
          <strong>Invoice sent</strong>
          <small>INV-1034 · Rahul Sharma</small>
        </div>
      </div>
    </div>
  );
}

export default InvoiceIllustration;