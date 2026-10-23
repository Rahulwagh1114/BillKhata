import { useState } from "react";
import "./Customers.css";
import AddCustomer from "./AddCustomer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api";

function Customers() {
  const [search, setSearch] = useState();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [allCustomer, setAllCustomer] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAllCustomer = async () => {
      try {
        const response = await api.get(`${API_URL}/customer/`);
        setAllCustomer(response.data.customers || []);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCustomer();
  }, []);

  return (
    <main className="customerPage">
      <div className="customerTopDiv">
        <h2 className="cutomTitle">All Customers</h2>

        <div className="customerTopContent">
          <div className="searchBox">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
            <input
              type="text"
              className="searchInput"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btnAddCustm" onClick={() => setShowForm(true)}>
            <i className="fa-solid fa-plus"></i> Add Customer
          </button>
          {showForm && (
            <AddCustomer
              setAllCustomer={setAllCustomer}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      </div>

      <div className="customerListDiv">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Mobile No.</th>
              <th>Total Amount</th>
              <th>Pending</th>
              <th>Paid</th>
              <th>Create Invoice</th>
            </tr>
          </thead>
          <tbody>
            {allCustomer.length === 0 ? (
              <tr>
                <td colSpan="6">No customers found</td>
              </tr>
            ) : (
              allCustomer.map((customer) => (
                <tr
                  key={customer._id}
                  onClick={() =>
                    navigate(`/dashboard/customers/${customer._id}/ledger`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <span className="userAvatar">
                      {customer.name?.charAt(0).toUpperCase()}
                    </span>
                    {customer.name}
                  </td>
                  <td>{customer.mobile}</td>
                  <td>₹{customer.totalAmount}</td>
                  <td>₹{customer.pendingAmount}</td>
                  <td>₹{customer.paidAmount}</td>
                  <td>
                    <button
                      title="Create Invoice"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/dashboard/invoices", {
                          state: { customerId: customer._id },
                        });
                      }}
                    >
                      <i className="fa-solid fa-file-circle-plus"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Customers;
