import "./HomeInvoice.css";
import sampleInvoice from "../../../assets/sampleInvoice.png"; // adjust path and file name

const steps = [
  {
    number: "01",
    title: "Select Customer",
    text: "Choose existing customer or add new one.",
  },
  {
    number: "02",
    title: "Add Products",
    text: "Add items, quantity, price and discount.",
  },
  {
    number: "03",
    title: "Generate & Automatically Send",
    text: "Get PDF and send invoice via WhatsApp.",
  },
];

function HomeInvoice() {
  return (
    <section className="homeInvoice">
      <div className="invoiceContent">
        <h2>Create Invoice in Seconds</h2>
        <p>
          Add products, set quantity and price, apply discount (if any) and
          generate a professional invoice. Then send Automatically to customer on WhatsApp or
          download as PDF.
        </p>

        <div className="invoiceSteps">
          {steps.map((step) => (
            <div className="invoiceStep" key={step.number}>
              <span className="stepNumber">{step.number}</span>
              <div className="stepText">
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="#" className="invoiceBtn">
          Try It Now <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <div className="invoiceImageDiv">
        <img src={sampleInvoice} alt="Invoice preview" />
      </div>
    </section>
  );
}

export default HomeInvoice;