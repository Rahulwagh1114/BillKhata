import "./Logo.css";

function Logo() {
  return (
    <a href="/" className="logo">
      <svg
        className="logoIcon"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6d7bff" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>

        {/* Rounded square */}
        <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />

        {/* Document lines */}
        <rect x="12" y="12" width="24" height="4.5" rx="2.25" fill="#fff" />
        <rect x="12" y="21" width="24" height="4.5" rx="2.25" fill="#fff" />
        <rect x="12" y="30" width="14" height="4.5" rx="2.25" fill="#fff" />

        {/* Folded corner (bottom right) */}
        <path d="M28 48 L48 28 V36 A12 12 0 0 1 36 48 Z" fill="#3730a3" opacity="0.55" />
      </svg>

      <div className="logoText">
        <h2 className="logoTitle">
          Bill<span>Khata</span>
        </h2>
        <p className="logoTagline">Bill • Track • Grow</p>
      </div>
    </a>
  );
}

export default Logo;