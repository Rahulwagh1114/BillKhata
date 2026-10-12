import { useState, useEffect } from "react";
import "./AddCustomer.css";

function AddCustomer({ onClose }) {
  const [input, setInput] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    // TODO: send `input` to the backend API here
    onClose();
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
          />

          <label htmlFor="mobile">Mobile No.(WhatsApp)</label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={input.mobile}
            placeholder="Enter mobile no."
            onChange={handleInput}
          />

          <label htmlFor="address">Address(Optional)</label>
          <textarea
            name="address"
            id="address"
            value={input.address}
            placeholder="Enter Address..."
            onChange={handleInput}
          ></textarea>

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddCustomer;