import Logo from "./Logo";
import "./Footer.css";

const productLinks = ["Features", "Pricing", "Dashboard", "Integrations"];
const companyLinks = ["About", "Contact", "Privacy Policy", "Terms of Service"];

const socialLinks = [
  { name: "WhatsApp", icon: "fa-brands fa-whatsapp", href: "#" },
  { name: "Facebook", icon: "fa-brands fa-facebook-f", href: "#" },
  { name: "Instagram", icon: "fa-brands fa-instagram", href: "#" },
  { name: "LinkedIn", icon: "fa-brands fa-linkedin-in", href: "#" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Brand */}
        <div className="footerBrand">
          <Logo/>
          <p className="footerPara">
            Create professional invoices And send them automatically on WhatsApp, track customer payments, manage pending dues and understand your business income and grow your
            business, all in one place.
          </p>

          <div className="footerSocial">
            {socialLinks.map((item) => (
              <a key={item.name} href={item.href} aria-label={item.name}>
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div className="footerCol">
          <h4>Product</h4>
          <ul>
            {productLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company links */}
        <div className="footerCol">
          <h4>Company</h4>
          <ul>
            {companyLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footerCol">
          <h4>Contact</h4>
          <ul className="footerContact">
            <li>
              <i className="fa-regular fa-envelope"></i>
              <span>support@BillKhata.com</span>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <span>+91 9730853765</span>
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span>Nagpur, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} SmartBill. All rights reserved.</p>
        <p>Made with ❤️ for local businesses</p>
      </div>
    </footer>
  );
}

export default Footer;