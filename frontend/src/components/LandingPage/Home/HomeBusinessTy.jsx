import "./HomeBusinessTy.css";

const businessTypes = [
  { name: "Grocery Store", icon: "fa-solid fa-basket-shopping", color: "green" },
  { name: "Hardware Shop", icon: "fa-solid fa-screwdriver-wrench", color: "purple" },
  { name: "Clothing Store", icon: "fa-solid fa-shirt", color: "orange" },
{ name: "Gym & Fitness", icon: "fa-solid fa-dumbbell", color: "pink" },
  { name: "Tuition Classes", icon: "fa-solid fa-graduation-cap", color: "teal" },
  { name: "Salon", icon: "fa-solid fa-scissors", color: "violet" },
  { name: "Restaurant & Cafe", icon: "fa-solid fa-utensils", color: "red" },
  { name: "All Other Businesses", icon: "fa-solid fa-layer-group", color: "slate" },
];

function HomeBusinessTy() {
  return (
    <section className="biz">
        <div className="bizTitleDiv">
      <h2 className="bizTitle">Perfect for Every Business</h2>
     <p className="bizText">
  Whether you run a shop, gym, tuition classes or any business that needs to
  manage customers, bills and payments, BillKhata is built for you.
</p>
</div>

      <div className="bizGrid">
        {businessTypes.map((item) => (
          <div className="bizItem" key={item.name}>
            <span className={`bizIcon ${item.color}`}>
              <i className={item.icon}></i>
            </span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeBusinessTy;