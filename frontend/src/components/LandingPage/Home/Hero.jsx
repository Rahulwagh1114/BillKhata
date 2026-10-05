import heroImage from "../../../assets/heroImage.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="heroPageDiv">
      <div className="heroContentDiv">

        <div className="heroSlogenDiv">
          <h1>Simple Billing.</h1>
          <h1 className="heroHighlight">Smarter Business.</h1>
        </div>

        <p className="heroSubText">
          Create invoices, track payments, manage customers and grow your
          business — all in one place.
        </p>

        <div className="heroButtons">
          <button className="btnPrimary">Get Started Free →</button>
          <button className="btnOutline">▶ Watch Demo</button>
        </div>

        <ul className="heroChecks">
          <li>✓ No credit card required</li>
          <li>✓ Easy to use</li>
          <li>✓ Lifetime free plan</li>
        </ul>
      </div>

      <div className="heroImageDiv">
        <img src={heroImage} alt="SmartBill dashboard preview" />
      </div>
    </section>
  );
}

export default Hero;