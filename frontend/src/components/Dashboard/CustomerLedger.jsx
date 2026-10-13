import { useState } from "react";
import "./CustomerLedger.css";
function CustomerLedger(){
    const statss = [
  {
    label: "Total Purchased",
    value: "₹2,45,000",
    icon: "fa-solid fa-bag-shopping",
    color: "green",
  },
   {
    label: "Paid Amount",
    value: "₹2,45,000",
     icon: "fa-solid fa-bag-shopping",
    color: "blue",
  },
   {
    label: "Pending Amount",
    value: "₹2,45,000",
    icon: "fa-solid fa-bag-shopping",
    color: "orange",
    danger: true,
  },

]
    const[search,setSearch]=useState();
    return(
        <div className="customerLedgerDiv">
            <div className="searchBox1">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
            <input
              type="text"
              className="searchInput"
              placeholder="Search customers..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            </div>
            <h1>Customer Ledger</h1>


           <div className="customerLedgerIcon">
               <div className="ledgerIcon">
                 <span className="userAvatar1">R</span>
                <div >
                    <h2>Rahul</h2>
                    <p className="ledgerIconData">+91 9837374645</p>
                </div>
               </div>
               
                      <section className="statCards">
                      {statss.map((stat) => (
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
              <tBody>
                <tr>
                  <td>Date</td>
                  <td>invoice</td>
                  <td>amount</td>
                  <td>due</td>
                  <td>status</td>
                </tr>
              </tBody>
            </table>
           </div>
        </div>
    )
}
export default CustomerLedger;