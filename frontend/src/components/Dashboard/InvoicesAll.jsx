import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.jsx";
import "./InvoicesAll.css";
function InvoicesAll(){
  const [search,setSearch]=useState();
  const [invoices,setInvoices]=useState("");

  const navigate=useNavigate();

  useEffect(()=>{
    const getInvoices=async()=>{
     const response = await api.get("/invoicesAll");
      setInvoices(response.data.invoicesAll || []);
    }
    getInvoices();
  },[])
        
  return (
    <div className="InvoicesAllDiv">
         <h1>All Invoices</h1>
      
      <div className="searchAndInvoice">
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

      <div className="btnInvoice">
            <button onClick={()=>navigate(`/dashboard/invoicesAll/invoice`)}>Create Invoice</button>
        </div>
      </div>

      <div className="InvoicesAllTableDiv">
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
      <td>
       <span className={`badge ${inv.paymentStatus}`}>
        {inv.paymentStatus.charAt(0).toUpperCase() + inv.paymentStatus.slice(1)}
      </span>
      </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}
export default InvoicesAll;