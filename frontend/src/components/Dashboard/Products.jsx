import { useState, useEffect } from "react";
import "./Products.css";
import api from "../../api";

const units = ["pcs", "kg", "litre", "box", "bag", "meter", "dozen"];
const gstOptions = [0, 5, 12, 18, 28];

const emptyForm = {
  productName: "",
  category: "",
  unit: "pcs",
  rate: "",
  stock: "",
  gst: 0,
  description: "",
};

const formatRupees = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // Load products from the backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.allProducts || []);
      } catch (err) {
        console.log(err);
      }
    };
    loadProducts();
  }, []);

  // Close the popup on Escape
  useEffect(() => {
    if (!showForm) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setShowForm(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showForm]);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.productName || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingId(product._id);
    setForm({
      productName: product.productName,
      category: product.category || "",
      unit: product.unit,
      rate: product.rate,
      stock: product.stock,
      gst: product.gst,
      description: product.description || "",
    });
    setError("");
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return setError("Product name is required.");
    if (!(Number(form.rate) > 0)) return setError("Please enter a valid rate.");

    // field names match the backend schema
    const cleaned = {
      productName: form.name.trim(),
      category: form.category.trim(),
      unit: form.unit,
      rate: Number(form.rate),
      stock: Number(form.stock || 0),
      gst: Number(form.gst),
      description: form.description,
    };

    try {
      if (editingId) {
        const res = await api.patch(`/products/update/${editingId}`, cleaned);
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? res.data.product : p))
        );
      } else {
        const res = await api.post("/products/addProduct", cleaned);
        setProducts((prev) => [res.data.product, ...prev]);
      }
      closeForm();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.productName}"?`)) return;
    try {
      await api.delete(`/products/delete/${product._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed.");
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
                  <td className="prName">{p.productName}</td>
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
                  value={form.productName}
                  onChange={handleChange}
                   readOnly={!!editingId}
                   autoFocus={!editingId}
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
                   readOnly={!!editingId}
                />
              </div>

              <div className="prField">
                <label htmlFor="unit">Unit</label>
                <select id="unit" name="unit" value={form.unit} disabled={!!editingId} onChange={handleChange}>
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