import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CustomerLedger.css";
import api from "../../api";

function CustomerLedger() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

 const [invoices, setInvoices] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const [customerRes, invoiceRes] = await Promise.all([
        api.get(`/customer/${id}`),
        api.get(`/customer/${id}/invoices`),
      ]);
      setCustomer(customerRes.data.customer);
      setInvoices(invoiceRes.data.invoices);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load customer");
    }
  };
  loadData();
}, [id]);

  // saare hooks ke baad hi early return
  if (error) return <p>{error}</p>;
  if (!customer) return <p>Loading...</p>;

  const formatAmount = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  const stats = [
    {
      label: "Total Purchased",
      value: formatAmount(customer.totalAmount),
      icon: "fa-solid fa-bag-shopping",
      color: "green",
    },
    {
      label: "Paid Amount",
      value: formatAmount(customer.paidAmount),
      icon: "fa-solid fa-bag-shopping",
      color: "blue",
    },
    {
      label: "Pending Amount",
      value: formatAmount(customer.pendingAmount),
      icon: "fa-solid fa-bag-shopping",
      color: "orange",
      danger: customer.pendingAmount > 0,
    },
  ];

  return (
    <div className="customerLedgerDiv">
      <div className="searchBox1">
        <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        <input
          type="text"
          className="searchInput"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <h1>Customer Ledger</h1>

      <div className="customerLedgerIcon">
        <div className="ledgerIcon">
          <span className="userAvatar1">
            {customer.name?.charAt(0).toUpperCase()}
          </span>
          <div>
            <h2>{customer.name}</h2>
            <p className="ledgerIconData">+91 {customer.mobile}</p>
          </div>
        </div>

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
            </div>
          ))}
        </section>
      </div>

      <div className="ledgerTableDiv">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice-Ref</th>
              <th>Amount</th>
              <th>Due Amount</th>
              <th>Status</th>
            </tr>
          </thead>
         <tbody>
  {invoices.length === 0 ? (
    <tr><td colSpan="5">No transactions yet</td></tr>
  ) : (
    invoices.map((inv) => (
      <tr key={inv._id}>
        <td>{new Date(inv.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
        <td>INV-{inv._id.slice(-6).toUpperCase()}</td>
        <td>₹{inv.totalAmount.toLocaleString("en-IN")}</td>
        <td>₹{inv.dueAmount.toLocaleString("en-IN")}</td>
      <td>{inv.paymentStatus.charAt(0).toUpperCase() + inv.paymentStatus.slice(1)}</td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerLedger;