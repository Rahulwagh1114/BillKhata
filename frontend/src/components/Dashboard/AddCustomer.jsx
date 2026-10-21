import { useState, useEffect } from "react";
import "./AddCustomer.css";
import api from "../../api";

function AddCustomer({ onClose, setAllCustomer }) {
  const [input, setInput] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await api.post("/customer/addCustomer", input);
      setAllCustomer((prev) => [...prev, response.data.customer]);
      onClose(); // sirf success par form band
    } catch (error) {
      alert(error.response?.data?.message || "Could not add customer");
    } finally {
      setLoading(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      <div className="addCustomerDiv">
        <button
          type="button"
          className="addCustomerClose"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2>Add New Customer</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            placeholder="Enter Customer Name"
            onChange={handleInput}
            required
          />

          <label htmlFor="mobile">Mobile No.(WhatsApp)</label>
          <input
            type="tel"
            inputMode="numeric"
            id="mobile"
            name="mobile"
            value={input.mobile}
            placeholder="Enter mobile no."
            onChange={handleInput}
            required
          />

          <label htmlFor="address">Address(Optional)</label>
          <textarea
            name="address"
            id="address"
            value={input.address}
            placeholder="Enter Address..."
            onChange={handleInput}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCustomer;
