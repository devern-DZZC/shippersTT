import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Send us the product link",
    description:
      "Share the exact item from Amazon, SHEIN, Apple, Nike, or your preferred U.S. retailer.",
  },
  {
    number: "02",
    title: "Get a transparent estimate",
    description:
      "We break down item cost, tax, shipping, and service fees before you commit.",
  },
  {
    number: "03",
    title: "Receive it in Trinidad",
    description:
      "We purchase, coordinate delivery, and keep you updated until your package arrives.",
  },
];

const serviceHighlights = [
  {
    title: "No hidden charges",
    description:
      "Every quote is structured so customers understand where the total comes from.",
  },
  {
    title: "Support that feels personal",
    description:
      "Questions, order updates, and custom requests are handled directly and quickly.",
  },
  {
    title: "Reliable delivery windows",
    description:
      "Most standard orders arrive within two to four weeks depending on retailer lead times.",
  },
  {
    title: "Built for repeat shoppers",
    description:
      "From single items to monthly orders, the process stays simple and consistent.",
  },
];

const trustPoints = [
  {
    label: "Customers supported",
    value: "1,000+",
  },
  {
    label: "Typical delivery",
    value: "2-4 weeks",
  },
  {
    label: "Quote clarity",
    value: "Full breakdown",
  },
];

const testimonials = [
  {
    quote:
      "The process felt effortless. I knew the full cost upfront and my order arrived exactly as promised.",
    name: "Marcia R.",
    detail: "Port of Spain",
  },
  {
    quote:
      "Great communication, fair pricing, and a very polished customer experience from start to finish.",
    name: "Sarah L.",
    detail: "San Fernando",
  },
];

const retailerList = ["Amazon", "SHEIN", "Nike", "Apple", "Best Buy", "Macy's"];
const heroTags = ["Fast quotes", "Blue + white delivery", "Nationwide support"];

export default function Home() {
  return (
    <div className="page page-home">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy fade-in">
            <span className="eyebrow">Trusted shipping for Trinidad &amp; Tobago</span>
            <h1>Shop the world. We bring it home beautifully.</h1>
            <p className="hero-lead">
              Cleaner quotes, reliable delivery, and a shopping experience that
              feels premium from first link to final pickup.
            </p>
            <div className="hero-actions">
              <Link to="/calculator" className="button-primary">
                Calculate your order
              </Link>
              <Link to="/about" className="button-secondary">
                Browse supported stores
              </Link>
            </div>
            <div className="hero-tags">
              {heroTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="hero-metrics">
              {trustPoints.map((point) => (
                <div className="metric-card" key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual fade-in">
            <div className="hero-panel hero-panel-image hero-image-dominant">
              <div className="hero-image-overlay"></div>
              <div className="hero-image-copy">
                <span>Styled for global shopping</span>
                <h2>The package should feel exciting before it even lands.</h2>
              </div>
              <div className="floating-stat">
                <strong>Transparent quotes</strong>
                <span>TTD breakdown before checkout</span>
              </div>
              <div className="hero-store-ribbon">
                {retailerList.map((retailer) => (
                  <span key={retailer}>{retailer}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block section-soft">
        <div className="container">
          <div className="section-heading fade-in">
            <span className="eyebrow">How it works</span>
            <h2>A simple three-step flow built for busy shoppers.</h2>
            <p>
              We designed the experience to be straightforward, responsive, and
              easy to trust from the first message onward.
            </p>
          </div>
          <div className="timeline-grid">
            {steps.map((step) => (
              <article className="timeline-card fade-in" key={step.number}>
                <span className="timeline-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container split-showcase">
          <div className="showcase-copy fade-in">
            <span className="eyebrow">Why customers stay with us</span>
            <h2>Professional service without the corporate distance.</h2>
            <p>
              The ShippersTT experience combines human support with a cleaner,
              more transparent ordering process so customers always know what is
              happening next.
            </p>
            <div className="feature-list">
              {serviceHighlights.map((item) => (
                <div className="feature-row" key={item.title}>
                  <div className="feature-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-stack fade-in">
            <div className="testimonial-intro">
              <span className="eyebrow">Customer confidence</span>
              <h3>Real feedback from repeat shoppers.</h3>
            </div>
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <p>"{testimonial.quote}"</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-band">
        <div className="container cta-band fade-in">
          <div>
            <span className="eyebrow">Ready to price an order?</span>
            <h2>Use the calculator to preview your total before you shop.</h2>
          </div>
          <Link to="/calculator" className="button-primary">
            Open calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
