export default function Contact() {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
        padding: "120px 8% 80px",
        textAlign: "center",
      }}
    >
      <h2>Get In Touch</h2>
      <p style={{ color: "var(--gray-medium)", maxWidth: 480 }}>
        Have questions? Reach out to us through any of the channels below and
        we'll get back to you as soon as possible.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <p>
          <i
            className="fas fa-envelope"
            style={{ marginRight: 8, color: "var(--blue)" }}
          ></i>
          shippers.tt@gmail.com
        </p>
        <p>
          <i
            className="fas fa-phone"
            style={{ marginRight: 8, color: "var(--blue)" }}
          ></i>
          (868) 463-2790
        </p>
        <p>
          <i
            className="fas fa-map-marker-alt"
            style={{ marginRight: 8, color: "var(--blue)" }}
          ></i>
          San Fernando, Trinidad
        </p>
        <p>
          <a
            href="https://www.instagram.com/shippers.tt_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--blue)" }}
          >
            <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>
            @shippers.tt_
          </a>
        </p>
      </div>
    </section>
  );
}
