import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-10 md:py-14 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-accent-400/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-[8%] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-accent-400 text-sm font-medium font-display mb-4">
            <i className="fas fa-envelope text-xs" />
            Get In Touch
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-2">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-white/50 text-base max-w-md mx-auto m-0">
            Have questions? We'd love to hear from you. Reach out through any of
            the channels below.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-cloud-50 relative">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #0077b6 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-[8%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left – Contact Cards */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: "fa-envelope",
                  title: "Email",
                  value: "shippers.tt@gmail.com",
                  href: "mailto:shippers.tt@gmail.com",
                  color: "from-brand-500/10 to-accent-400/10",
                },
                {
                  icon: "fa-phone",
                  title: "Phone",
                  value: "(868) 463-2790",
                  href: "tel:+18684632790",
                  color: "from-brand-500/10 to-brand-300/10",
                },
                {
                  icon: "fa-map-marker-alt",
                  title: "Location",
                  value: "San Fernando, Trinidad",
                  href: null,
                  color: "from-accent-400/10 to-brand-300/10",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="fade-in group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,119,182,0.08)]"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    >
                      <i
                        className={`fas ${item.icon} text-lg text-brand-500`}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        {item.title}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-display text-lg font-bold text-navy-900 no-underline hover:text-brand-500 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-display text-lg font-bold text-navy-900 m-0">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div
                className="fade-in bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                style={{ transitionDelay: "0.3s" }}
              >
                <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/shippers.tt_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 text-navy-900 font-display font-semibold text-sm no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <i className="fab fa-instagram text-lg" />
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@shippers.tt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-navy-900/5 text-navy-900 font-display font-semibold text-sm no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <i className="fab fa-tiktok text-lg" />
                    TikTok
                  </a>
                </div>
              </div>
            </div>

            {/* Right – Info Card */}
            <div className="fade-in" style={{ transitionDelay: "0.2s" }}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden h-full flex flex-col">
                {/* Decorative header */}
                <div className="relative h-48 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-brand-500/20 rounded-full blur-[60px]" />
                    <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent-400/15 rounded-full blur-[50px]" />
                  </div>
                  <div className="relative text-center">
                    <i className="fas fa-plane text-5xl text-accent-400/40 mb-2" />
                    <p className="text-white/40 font-display text-sm font-medium m-0">
                      We deliver worldwide brands to your door
                    </p>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                    How to Order
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        step: "1",
                        text: "Find an item you love from any US store",
                      },
                      {
                        step: "2",
                        text: "Send us the link via Instagram DM or WhatsApp",
                      },
                      {
                        step: "3",
                        text: "We quote you a total price in TTD",
                      },
                      {
                        step: "4",
                        text: "Pay 50% deposit and we handle the rest!",
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-400 flex items-center justify-center text-white text-xs font-bold font-display">
                          {s.step}
                        </span>
                        <p className="text-gray-600 text-sm m-0 pt-0.5">
                          {s.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/calculator"
                    className="btn-glow mt-8 w-full py-3.5 bg-gradient-to-r from-brand-500 to-accent-400 text-white font-display font-semibold text-sm rounded-xl text-center no-underline shadow-[0_4px_20px_rgba(0,212,255,0.15)]"
                  >
                    <i className="fas fa-calculator mr-2" />
                    Get Your Quote Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
