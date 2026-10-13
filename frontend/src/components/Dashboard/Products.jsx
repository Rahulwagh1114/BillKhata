import { useState, useEffect } from "react";
import "./Products.css";

const initialProducts = [
  { id: 1, name: "Cement (50 kg)", category: "Hardware", unit: "bag", rate: 400, stock: 120, gst: 18, description: "" },
  { id: 2, name: "Paint (1 L)", category: "Hardware", unit: "pcs", rate: 800, stock: 40, gst: 18, description: "" },
  { id: 3, name: "Brush", category: "Hardware", unit: "pcs", rate: 100, stock: 4, gst: 12, description: "" },
  { id: 4, name: "Shirt", category: "Clothing", unit: "pcs", rate: 650, stock: 25, gst: 5, description: "" },
];

const units = ["pcs", "kg", "litre", "box", "bag", "meter", "dozen"];
const gstOptions = [0, 5, 12, 18, 28];

const emptyForm = {
  name: "",
  category: "",
  unit: "pcs",
  rate: "",
  stock: "",
  gst: 0,
  description: "",
};

const formatRupees = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({ ...product });
    setError("");
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  // Close the popup on Escape
  useEffect(() => {
    if (!showForm) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (!(Number(form.rate) > 0)) {
      setError("Please enter a valid rate.");
      return;
    }

    const cleaned = {
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      rate: Number(form.rate),
      stock: Number(form.stock || 0),
      gst: Number(form.gst),
    };

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...cleaned, id: editingId } : p))
      );
    } else {
      // TODO: send `cleaned` to the backend API here
      setProducts((prev) => [{ ...cleaned, id: Date.now() }, ...prev]);
    }

    closeForm();
  };

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"?`)) {
      // TODO: call the delete API here
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  return (
    <main className="prPage">
      <h2 className="prTitle">Products</h2>

      <div className="prTop">
        <div className="prSearch">
          <i className="fa-solid fa-magnifying-glass prSearchIcon"></i>
          <input
            type="text"
            className="prSearchInput"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button type="button" className="prAddBtn" onClick={openAdd}>
          <i className="fa-solid fa-plus"></i> Add Product
        </button>
      </div>

      <div className="prTableWrap">
        <table className="prTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>GST</th>
              <th>Stock</th>
              <th className="prActionCol">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="prNoRows">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td className="prName">{p.name}</td>
                  <td>{p.category || "-"}</td>
                  <td>{p.unit}</td>
                  <td className="prRate">{formatRupees(p.rate)}</td>
                  <td>{p.gst}%</td>
                  <td>
                    <span className={`prStock ${p.stock <= 5 ? "low" : "ok"}`}>
                      {p.stock} {p.stock <= 5 && "· Low"}
                    </span>
                  </td>
                  <td className="prActionCol">
                    <button
                      type="button"
                      className="prIconBtn edit"
                      title="Edit"
                      aria-label={`Edit ${p.name}`}
                      onClick={() => openEdit(p)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      type="button"
                      className="prIconBtn delete"
                      title="Delete"
                      aria-label={`Delete ${p.name}`}
                      onClick={() => handleDelete(p)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popup form */}
      {showForm && (
        <div className="prOverlay" onClick={closeForm}>
          <div className="prModal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="prClose"
              onClick={closeForm}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>

            <form onSubmit={handleSubmit} className="prForm">
              <div className="prField full">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                  autoFocus
                />
              </div>

              <div className="prField">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="e.g. Hardware"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>

              <div className="prField">
                <label htmlFor="unit">Unit</label>
                <select id="unit" name="unit" value={form.unit} onChange={handleChange}>
                  {units.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div className="prField">
                <label htmlFor="rate">Rate (₹) *</label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  min="0"
                  placeholder="0"
                  value={form.rate}
                  onChange={handleChange}
                />
              </div>

              <div className="prField">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="prField full">
                <label htmlFor="gst">GST %</label>
                <select id="gst" name="gst" value={form.gst} onChange={handleChange}>
                  {gstOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}%
                    </option>
                  ))}
                </select>
              </div>

              <div className="prField full">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  placeholder="Add any details..."
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {error && <p className="prError">{error}</p>}

              <div className="prFormActions full">
                <button type="button" className="prCancel" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="prSave">
                  {editingId ? "Update" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Products;