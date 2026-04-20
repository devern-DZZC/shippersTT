import { Link } from "react-router-dom";

const contactCards = [
  {
    title: "Email",
    detail: "shippers.tt@gmail.com",
    href: "mailto:shippers.tt@gmail.com",
    icon: "fa-regular fa-envelope",
  },
  {
    title: "Phone",
    detail: "(868) 463-2790",
    href: "tel:+18684632790",
    icon: "fa-solid fa-phone",
  },
  {
    title: "Instagram",
    detail: "@shippers.tt_",
    href: "https://www.instagram.com/shippers.tt_",
    icon: "fab fa-instagram",
  },
];

const serviceDetails = [
  {
    title: "Response time",
    detail: "Most questions are answered within one business day.",
  },
  {
    title: "Location",
    detail: "Based in San Fernando and serving customers across Trinidad and Tobago.",
  },
  {
    title: "Best for",
    detail: "Quote questions, custom store checks, and order coordination.",
  },
];

export default function Contact() {
  return (
    <div className="page contact-page">
      <section className="page-hero compact-hero">
        <div className="container contact-hero fade-in">
          <span className="eyebrow">Contact ShippersTT</span>
          <h1>Reach out when you need a quote, a store check, or help with an order.</h1>
          <p>
            We keep communication simple and direct so you can get answers
            quickly and move forward with confidence.
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="container contact-layout">
          <div className="contact-cards">
            {contactCards.map((card) => (
              <a
                key={card.title}
                className="contact-card fade-in"
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="contact-icon">
                  <i className={card.icon}></i>
                </span>
                <div>
                  <span className="contact-label">{card.title}</span>
                  <strong>{card.detail}</strong>
                </div>
              </a>
            ))}
          </div>

          <div className="contact-panel fade-in">
            <span className="eyebrow">What to expect</span>
            <h2>Helpful support, without the back-and-forth.</h2>
            <div className="contact-detail-list">
              {serviceDetails.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <div className="contact-actions">
              <Link to="/calculator" className="button-primary">
                Start with a quote
              </Link>
              <Link to="/about" className="button-secondary">
                View supported stores
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
