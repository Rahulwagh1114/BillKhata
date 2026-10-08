import { useState } from "react";
import "./Invoice.css";

const productOptions = [
  { value: "pant", label: "Pant" },
  { value: "shirt", label: "Shirt" },
  { value: "t-shirt", label: "T-Shirt" },
  { value: "night-pant", label: "Night-pant" },
  { value: "kurta-paijama", label: "Kurta & Paijama" },
];

const createRow = () => ({
  id: Date.now() + Math.random(),
  product: "",
  qty: 1,
  rate: "",
  amount: "",
});

const formatRupees = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

// Local date in YYYY-MM-DD (toISOString() can show yesterday's date in India)
const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const formatDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function Invoice() {
  const [customer, setCustomer] = useState({ name: "", mobile: "", address: "" });
  const [rows, setRows] = useState([createRow()]);
  const [discount, setDiscount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const today = getToday();

  const handleCustomerChange = (e) => {
    const { id, value } = e.target;
    setCustomer((prev) => ({ ...prev, [id]: value }));
  };

  // Amount is auto-calculated when qty or rate changes,
  // but the user can still type a custom amount.
  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const updated = { ...row, [field]: value };

        if (field === "qty" || field === "rate") {
          const qty = Number(field === "qty" ? value : row.qty);
          const rate = Number(field === "rate" ? value : row.rate);
          updated.amount = qty && rate ? qty * rate : "";
        }

        return updated;
      })
    );
  };

  const addRow = () => setRows((prev) => [...prev, createRow()]);

  const removeRow = (id) => {
    // always keep at least one row
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((r) => r.id !== id)));
  };

  const subtotal = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const discountValue = Math.min(Number(discount || 0), subtotal);
  const total = subtotal - discountValue;

  const paidValue = paymentStatus === "partial" ? Number(amountPaid || 0) : 0;
  const balance = Math.max(total - paidValue, 0);
  const needsDueDate = paymentStatus === "unpaid" || paymentStatus === "partial";

  const handleStatusChange = (status) => {
    setPaymentStatus(status);

    if (status === "paid") {
      setDueDate("");
      setAmountPaid("");
    }

    if (status === "unpaid") {
      setAmountPaid("");
    }
  };

  const validate = () => {
    if (!customer.name.trim()) {
      alert("Please enter the customer name.");
      return false;
    }
    if (!rows.some((row) => row.product && Number(row.amount) > 0)) {
      alert("Please add at least one product with an amount.");
      return false;
    }

    if (needsDueDate) {
      if (!dueDate) {
        alert("Please select a due date.");
        return false;
      }
      if (dueDate < today) {
        alert("Due date cannot be in the past.");
        return false;
      }
    }

    if (paymentStatus === "partial") {
      if (!(paidValue > 0)) {
        alert("Please enter the amount paid.");
        return false;
      }
      if (paidValue >= total) {
        alert("For partial payment, the paid amount must be less than the total.");
        return false;
      }
    }

    return true;
  };

  const handleGenerate = () => {
    if (!validate()) return;

    const invoice = {
      customer,
      items: rows.filter((row) => row.product),
      subtotal,
      discount: discountValue,
      total,
      paymentStatus,
      dueDate: needsDueDate ? dueDate : null,
      amountPaid: paymentStatus === "paid" ? total : paidValue,
      balance: paymentStatus === "paid" ? 0 : balance,
      notes,
    };

    // TODO: send `invoice` to the backend API here
    console.log("Invoice data:", invoice);
    alert("Invoice generated successfully!");
  };

  const handleWhatsApp = () => {
    if (!validate()) return;

    const digits = customer.mobile.replace(/\D/g, "");
    if (digits.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    // add India country code if only 10 digits are entered
    const phone = digits.length === 10 ? `91${digits}` : digits;

    const itemLines = rows
      .filter((row) => row.product)
      .map((row) => `- ${row.product} x ${row.qty} = ${formatRupees(row.amount)}`)
      .join("\n");

    let paymentLines = `Status: ${paymentStatus}\n`;

    if (paymentStatus === "partial") {
      paymentLines +=
        `Paid: ${formatRupees(paidValue)}\n` +
        `Balance: ${formatRupees(balance)}\n` +
        `Due Date: ${formatDate(dueDate)}\n`;
    }

    if (paymentStatus === "unpaid") {
      paymentLines += `Due Date: ${formatDate(dueDate)}\n`;
    }

    const message =
      `Hello ${customer.name},\n` +
      `Thank you for your purchase.\n\n` +
      `${itemLines}\n\n` +
      `Subtotal: ${formatRupees(subtotal)}\n` +
      `Discount: ${formatRupees(discountValue)}\n` +
      `Total: ${formatRupees(total)}\n` +
      `${paymentLines}\n` +
      `Thank you!`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="invoiceDiv">
      <h2 className="invoiceHeading">Create Invoice</h2>

      {/* Customer details */}
      <section className="invoiceCard">
        <h3>Customer Details</h3>

        <div className="invoiceFormGrid">
          <div className="invoiceField">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={customer.name}
              onChange={handleCustomerChange}
            />
          </div>

          <div className="invoiceField">
            <label htmlFor="mobile">Mobile No. (WhatsApp)</label>
            <input
              type="tel"
              id="mobile"
              placeholder="Enter Mobile No."
              maxLength={13}
              value={customer.mobile}
              onChange={handleCustomerChange}
            />
          </div>

          <div className="invoiceField fullWidth">
            <label htmlFor="address">Address (Optional)</label>
            <textarea
              id="address"
              rows={2}
              placeholder="Enter Address"
              value={customer.address}
              onChange={handleCustomerChange}
            ></textarea>
          </div>
        </div>
      </section>

      {/* Products / items */}
      <section className="invoiceCard">
        <h3>Products / Items</h3>

        <div className="invoiceTableWrap">
          <table className="invoiceTable">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Rate (₹)</th>
                <th>Amount (₹)</th>
                <th aria-label="Remove"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <select
                      value={row.product}
                      onChange={(e) => updateRow(row.id, "product", e.target.value)}
                    >
                      <option value="">Select</option>
                      {productOptions.map((p) => (
                        <option key={p.value} value={p.label}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={row.qty}
                      onChange={(e) => updateRow(row.id, "qty", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter rate"
                      value={row.rate}
                      onChange={(e) => updateRow(row.id, "rate", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter amount"
                      value={row.amount}
                      onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="rowDelete"
                      onClick={() => removeRow(row.id)}
                      aria-label="Remove product"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoiceBelowTable">
          <button type="button" className="addProductBtn" onClick={addRow}>
            <i className="fa-solid fa-plus"></i> Add Product
          </button>

          <div className="invoiceTotals">
            <div className="totalRow">
              <span>Subtotal</span>
              <strong>{formatRupees(subtotal)}</strong>
            </div>

            <div className="totalRow">
              <span>Discount</span>
              <input
                type="number"
                min="0"
                placeholder="₹0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="totalRow grandTotal">
              <span>Total</span>
              <strong>{formatRupees(total)}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Payment status + notes */}
      <div className="invoiceBottomGrid">
        <section className="invoiceCard">
          <h3>Payment Status</h3>

          <div className="paymentOptions">
            {["paid", "partial", "unpaid"].map((status) => (
              <label className="radioLabel" key={status}>
                <input
                  type="radio"
                  name="paymentStatus"
                  value={status}
                  checked={paymentStatus === status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                />
                <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
              </label>
            ))}
          </div>

          {paymentStatus === "partial" && (
            <div className="paymentSplit">
              <div className="invoiceField">
                <label htmlFor="amountPaid">Paid Now (₹)</label>
                <input
                  type="number"
                  id="amountPaid"
                  min="1"
                  max={total}
                  placeholder="Enter amount paid"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
              </div>

              <div className="invoiceField">
                <label htmlFor="balanceAmount">Balance Remaining (₹)</label>
                <input
                  type="text"
                  id="balanceAmount"
                  value={formatRupees(balance)}
                  readOnly
                  className="readOnlyInput"
                />
              </div>
            </div>
          )}

          {needsDueDate && (
            <div className="invoiceField dueDateField">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                min={today}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          )}
        </section>

        <section className="invoiceCard">
          <h3>Notes</h3>
          <textarea
            className="notesInput"
            rows={3}
            placeholder="Add any notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </section>
      </div>

      {/* Actions */}
      <div className="invoiceActions">
        <button type="button" className="btnGenerate" onClick={handleGenerate}>
          Generate Invoice
        </button>
        <button type="button" className="btnWhatsapp" onClick={handleWhatsApp}>
          <i className="fa-brands fa-whatsapp"></i> Send WhatsApp
        </button>
      </div>
    </div>
  );
}

export default Invoice;