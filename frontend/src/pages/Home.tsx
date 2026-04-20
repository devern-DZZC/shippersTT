import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-background"></div>
        <div className="container">
          <h1>
            Shop internationally,
            <br />
            We'll ship it home.
          </h1>
          <p>
            Access your favorite international brands with our trusted shipping
            service. Professional, reliable, and transparent.
          </p>
          <Link to="/calculator" className="cta-button">
            Get a Quote
          </Link>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step fade-in">
              <div className="step-number">1</div>
              <h3>Send Link</h3>
              <p>
                Forward us the link to any item you want from Amazon, SHEIN,
                Apple, Nike, Macy's, or other major retailers.
              </p>
            </div>
            <div className="step fade-in">
              <div className="step-number">2</div>
              <h3>We Quote</h3>
              <p>
                We calculate total costs including item price, shipping, taxes,
                and clearing fees. Complete transparency.
              </p>
            </div>
            <div className="step fade-in">
              <div className="step-number">3</div>
              <h3>You Receive</h3>
              <p>
                Pay 50% upfront, we handle the purchase and shipping. Your
                items arrive safely in 2-4 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose" id="why-choose">
        <div className="container">
          <div className="why-choose-container">
            <div className="why-content">
              <h2>Why Choose Us</h2>
              <div className="benefits">
                {[
                  {
                    title: "Transparent Pricing",
                    desc: "No hidden fees. Get complete cost breakdowns upfront including all taxes and shipping charges.",
                  },
                  {
                    title: "Reliable Delivery",
                    desc: "Professional packaging and secure handling ensure your items arrive safely with our nationwide service.",
                  },
                  {
                    title: "No Credit Card Required",
                    desc: "We handle international purchases for you. Pay locally with flexible payment options.",
                  },
                  {
                    title: "Personal Service",
                    desc: "Dedicated customer support throughout your shopping journey from order to delivery.",
                  },
                ].map((b) => (
                  <div className="benefit fade-in" key={b.title}>
                    <div className="benefit-icon">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="benefit-content">
                      <h3>{b.title}</h3>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="testimonials fade-in">
              <h3>Testimonials</h3>
              {[
                {
                  text: '"Excellent service! My iPhone arrived perfectly packaged and exactly when promised. Very professional and trustworthy."',
                  initial: "M",
                  name: "Marcus R.",
                  location: "Port of Spain",
                },
                {
                  text: '"Used ShippersTT for my Nike orders. Great communication, fair pricing, and reliable delivery. Highly recommended!"',
                  initial: "S",
                  name: "Sarah L.",
                  location: "San Fernando",
                },
              ].map((t) => (
                <div className="testimonial" key={t.name}>
                  <div className="testimonial-content">
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">{t.initial}</div>
                      <div className="testimonial-info">
                        <h4>{t.name}</h4>
                        <p>{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust-section" id="trust">
        <div className="container">
          <div className="trust-container">
            <div className="trust-stats fade-in">
              {[
                { number: "1000+", label: "Orders Delivered" },
                { number: "2-4", label: "Week Delivery" },
                { number: "100%", label: "Satisfaction Rate" },
              ].map((s) => (
                <div className="trust-stat" key={s.label}>
                  <div className="trust-stat-number">{s.number}</div>
                  <div className="trust-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="retailer-logos fade-in">
              <i className="fab fa-amazon retailer-logo" title="Amazon"></i>
              <i className="fab fa-apple retailer-logo" title="Apple"></i>
              <i
                className="fas fa-shopping-bag retailer-logo"
                title="SHEIN"
              ></i>
              <i className="fas fa-tshirt retailer-logo" title="Nike"></i>
              <i className="fas fa-store retailer-logo" title="Macy's"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
