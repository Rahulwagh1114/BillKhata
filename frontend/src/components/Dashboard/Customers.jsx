import "./Customers.css";

function Customers() {
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
            />
          </div>

          <button className="btnAddCustm">
            <i className="fa-solid fa-plus"></i> Add Customer
          </button>
        </div>
      </div>

      {/* customers table / list goes here */}
    </main>
  );
}

export default Customers;