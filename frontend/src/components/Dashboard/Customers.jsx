import { useState } from "react";
import "./Customers.css";
import AddCustomer from "./AddCustomer";
import { useNavigate } from "react-router-dom";
function Customers() {
  const [search,setSearch]=useState();
  const [showForm, setShowForm] = useState(false);
 const navigate=useNavigate();

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
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>

          <button className="btnAddCustm" onClick={() => setShowForm(true)}>
            <i className="fa-solid fa-plus"></i> Add Customer
          </button>
         {showForm && <AddCustomer onClose={() => setShowForm(false)} />}
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
            <tr>
             <td><span className="userAvatar">N</span>name</td>
             <td>number</td>
             <td>amount</td>
             <td>pending</td>
             <td>paid</td>
             <td><button title="Create Invoice" onClick={()=>navigate("/dashboard/invoices")}>
  <i className="fa-solid fa-file-circle-plus"></i>
</button></td>
</tr>


          </tbody>
        </table>
      </div>

    </main>
  );
}

export default Customers;