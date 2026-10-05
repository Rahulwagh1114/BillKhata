import "./Card.css";

const features = [
  {
    title: "Create Invoices",
    text: "Generate professional invoices in seconds.",
    icon: "fa-regular fa-file-lines",
    color: "purple",
  },
  {
    title: "WhatsApp Integration",
    text: "Send invoices & payment reminders instantly.",
    icon: "fa-brands fa-whatsapp",
    color: "green",
  },
  {
    title: "Customer Management",
    text: "Keep your customer data organized.",
    icon: "fa-solid fa-user-group",
    color: "blue",
  },
//   {
//     title: "Product & Inventory",
//     text: "Manage products and track stock levels.",
//     icon: "fa-solid fa-cube",
//     color: "orange",
//   },
  {
    title: "Payment Tracking",
    text: "Track paid, partial and unpaid bills.",
    icon: "fa-regular fa-credit-card",
    color: "red",
  },
  {
    title: "Business Reports",
    text: "Get insights with detailed reports and analytics.",
    icon: "fa-solid fa-chart-simple",
    color: "teal",
  },
];

function Card() {
  return (
    <>
    <div className="cardTitle">
      <h2>Everything Your Business Needs</h2>
        <p>From creating invoices to sending on whatsApp and track payments, Gives payment reminder, Get business report and many more - BillKhata gives you everything in one place.</p>
     </div>
    <section className="cardContainer">
      {features.map((item) => (
        <div className="cardDiv" key={item.title}>
          <div className={`cardIcon ${item.color}`}>
            <i className={item.icon}></i>
          </div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
     </>
  );
   
}
 

export default Card;