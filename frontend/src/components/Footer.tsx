export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-footer">
            <img src="/shippers_logo.jpeg" alt="ShippersTT Logo" />
            <h3>ShippersTT</h3>
          </div>
          <p className="footer-description">
            Your trusted partner for international shopping and reliable
            delivery throughout Trinidad and Tobago.
          </p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/shippers.tt_"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@shippers.tt"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>shippers.tt@gmail.com</p>
          <p>(868) 463-2790</p>
          <p>San Fernando, Trinidad</p>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <p>International Shopping</p>
          <p>Shipping &amp; Delivery</p>
          <p>Cost Estimation</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ShippersTT. All rights reserved.</p>
      </div>
    </footer>
  );
}
