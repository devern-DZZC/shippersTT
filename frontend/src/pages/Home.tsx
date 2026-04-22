import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* HeroPlane SVG removed - using transparent /plane.png instead */

/* ─── Cloud SVG Component ─── */
function Cloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 512"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8-60.3 17.6-96.2 73.7-96.2 132 0 79.5 64.5 128 144 128h368c70.7 0 128-57.3 128-128 0-59.3-40.8-109-96.4-125.4z" />
    </svg>
  );
}

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const isNumeric = /^\d+$/.test(target);
          if (isNumeric) {
            const end = parseInt(target, 10);
            const duration = 2000;
            const start = performance.now();
            const step = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * end).toString());
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          } else {
            setValue(target);
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display font-extrabold text-5xl md:text-6xl text-white">
      {value}
      {suffix}
    </div>
  );
}

/* ─── Main Home Page ─── */
export default function Home() {
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!planeRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 1.5;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Sweeping curved flight path (starts lower, goes higher)
      const translateX = progress * window.innerWidth * 1.2;
      const translateY = -progress * window.innerHeight * 0.9 + Math.sin(progress * Math.PI * 1.5) * 150;

      // Dynamic rotation (tilts based on the curve's slope)
      const baseRotation = 15; // Noto/Apple emoji usually faces right, tilt up slightly
      const dynamicTilt = Math.cos(progress * Math.PI * 1.5) * 20;
      const rotate = baseRotation + dynamicTilt;

      // Shrinks as it flies away and fades out eventually
      const scale = 1 - progress * 0.5;

      planeRef.current.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`;
      planeRef.current.style.opacity = `${1 - progress * 0.8}`;
    };

    // Initialize plane position immediately
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ════════════════ HERO ════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800"
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-400/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-300/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Floating clouds */}
        <Cloud className="absolute top-[15%] left-[5%] w-24 text-white/[0.04] animate-[float-slow_8s_ease-in-out_infinite]" />
        <Cloud className="absolute top-[30%] right-[10%] w-32 text-white/[0.03] animate-[float_10s_ease-in-out_infinite_1s]" />
        <Cloud className="absolute bottom-[25%] left-[15%] w-20 text-white/[0.05] animate-[float-slow_12s_ease-in-out_infinite_2s]" />
        <Cloud className="absolute top-[60%] right-[20%] w-16 text-white/[0.03] animate-[float_9s_ease-in-out_infinite_3s]" />

        {/* Animated Plane Image — smooth sweeping scroll motion */}
        <div
          ref={planeRef}
          className="absolute bottom-[2%] left-[2%] md:bottom-[5%] md:-left-[5%] pointer-events-none select-none transition-transform duration-100 ease-linear z-0"
          style={{
            opacity: 1,
            transform: "translate(0, 0) rotate(15deg) scale(1)"
          }}
        >
          <img
            src="/plane.png"
            alt="Airplane"
            className="w-32 h-32 md:w-56 md:h-56 drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] brightness-105"
            draggable={false}
          />
          {/* Engine Contrails */}
          <div className="absolute top-[60%] -left-[20%] w-[50%] h-[2px] bg-gradient-to-l from-white/40 to-transparent -translate-y-1/2 rounded-full blur-[1px]" />
          <div className="absolute top-[65%] -left-[30%] w-[60%] h-[1px] bg-gradient-to-l from-white/20 to-transparent -translate-y-1/2 rounded-full blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-[8%] text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-accent-400 text-sm font-medium mb-8"
            style={{ animation: "fade-up 0.8s ease forwards" }}
          >
            <i className="fas fa-plane-departure text-xs" />
            Trinidad &amp; Tobago's Trusted Skybox Service
          </div>

          <h1
            className="font-display text-5xl md:text-7xl font-extrabold text-white leading-[1.08] mb-6"
            style={{ animation: "fade-up 0.8s ease 0.15s both" }}
          >
            Shop globally,
            <br />
            <span className="gradient-text">delivered locally.</span>
          </h1>

          <p
            className="text-white/60 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ animation: "fade-up 0.8s ease 0.3s both" }}
          >
            We buy from your favorite US stores and fly it straight to your
            door. Professional, reliable, transparent.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation: "fade-up 0.8s ease 0.45s both" }}
          >
            <Link
              to="/calculator"
              className="btn-glow px-8 py-4 bg-gradient-to-r from-brand-500 to-accent-400 text-white font-display font-semibold rounded-xl text-base no-underline shadow-[0_4px_20px_rgba(0,212,255,0.2)]"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border border-white/20 text-white/80 font-display font-medium rounded-xl text-base no-underline transition-all duration-300 hover:bg-white/5 hover:border-white/30 hover:text-white"
            >
              Browse Stores
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white/60 text-xs font-display tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section className="py-24 md:py-32 bg-cloud-50 relative">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0077b6 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />

        <div className="max-w-5xl mx-auto px-[8%] relative">
          <div className="text-center mb-16 fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-500 text-sm font-semibold font-display mb-4">
              Simple Process
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-900">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-brand-500/20 via-brand-500/40 to-brand-500/20" />

            {[
              {
                icon: "fa-link",
                title: "Send Link",
                desc: "Forward us the link to any item from Amazon, SHEIN, Apple, Nike, Macy's, or other major retailers.",
                delay: "0s",
              },
              {
                icon: "fa-calculator",
                title: "We Quote",
                desc: "We calculate total costs including item price, shipping, taxes, and clearing fees. Complete transparency.",
                delay: "0.15s",
              },
              {
                icon: "fa-box-open",
                title: "You Receive",
                desc: "Pay 50% upfront, we handle the purchase and shipping. Your items arrive safely in 2-4 weeks.",
                delay: "0.3s",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="fade-in relative text-center bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,119,182,0.1)]"
                style={{ transitionDelay: step.delay }}
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-400 flex items-center justify-center text-white text-sm font-bold font-display shadow-[0_4px_12px_rgba(0,119,182,0.3)]">
                  {i + 1}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6 mt-2">
                  <i className={`fas ${step.icon} text-2xl text-brand-500`} />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed m-0">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ WHY CHOOSE US ════════════════ */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-[8%] relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Features */}
            <div>
              <div className="fade-in mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-500 text-sm font-semibold font-display mb-4">
                  Why ShippersTT
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-900">
                  Why Choose Us
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: "fa-tags",
                    title: "Transparent Pricing",
                    desc: "No hidden fees. Get complete cost breakdowns upfront including all taxes and shipping charges.",
                  },
                  {
                    icon: "fa-shield-halved",
                    title: "Reliable Delivery",
                    desc: "Professional packaging and secure handling ensure your items arrive safely with our nationwide service.",
                  },
                  {
                    icon: "fa-credit-card",
                    title: "No Credit Card Required",
                    desc: "We handle international purchases for you. Pay locally with flexible payment options.",
                  },
                  {
                    icon: "fa-headset",
                    title: "Personal Service",
                    desc: "Dedicated customer support throughout your shopping journey from order to delivery.",
                  },
                ].map((b, i) => (
                  <div
                    key={b.title}
                    className="fade-in flex items-start gap-4 p-5 rounded-xl hover:bg-cloud-50 transition-colors duration-300 group"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-400/10 flex items-center justify-center transition-all duration-300 group-hover:from-brand-500/20 group-hover:to-accent-400/20">
                      <i className={`fas ${b.icon} text-lg text-brand-500`} />
                    </div>
                    <div>
                      <h3 className="font-display text-[17px] font-bold text-navy-900 mb-1">
                        {b.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed m-0">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Testimonials */}
            <div className="fade-in">
              <div className="glass-card p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100">
                <h3 className="font-display text-xl font-bold text-navy-900 text-center mb-8">
                  <i className="fas fa-quote-left text-brand-500/30 mr-2" />
                  What Our Customers Say
                </h3>

                {[
                  {
                    text: '"Excellent service! My iPhone arrived perfectly packaged and exactly when promised. Very professional and trustworthy."',
                    initial: "M",
                    name: "Marcus R.",
                    location: "Port of Spain",
                    color: "from-brand-500 to-brand-400",
                  },
                  {
                    text: '"Used ShippersTT for my Nike orders. Great communication, fair pricing, and reliable delivery. Highly recommended!"',
                    initial: "S",
                    name: "Sarah L.",
                    location: "San Fernando",
                    color: "from-accent-400 to-brand-300",
                  },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="mb-6 last:mb-0 p-5 rounded-xl bg-cloud-50/80 border border-gray-100"
                  >
                    <p className="text-gray-600 text-[15px] leading-relaxed mb-4 italic">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-display font-bold text-sm`}
                      >
                        {t.initial}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-navy-900">
                          {t.name}
                        </h4>
                        <p className="text-gray-400 text-xs m-0">{t.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ STATS / TRUST ════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-accent-400/10 rounded-full blur-[80px]" />

        <div className="max-w-5xl mx-auto px-[8%] relative">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Trusted by <span className="gradient-text">thousands</span>
            </h2>
            <p className="text-white/50 text-lg">Delivering excellence across Trinidad &amp; Tobago</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { target: "1000", suffix: "+", label: "Orders Delivered" },
              { target: "2-4", suffix: "", label: "Week Delivery" },
              { target: "100", suffix: "%", label: "Satisfaction Rate" },
            ].map((s) => (
              <div
                key={s.label}
                className="fade-in text-center p-8 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07]"
              >
                {s.target === "2-4" ? (
                  <div className="font-display font-extrabold text-5xl md:text-6xl text-white">
                    2-4
                  </div>
                ) : (
                  <Counter target={s.target} suffix={s.suffix} />
                )}
                <div className="text-white/40 text-sm font-display font-medium mt-3 tracking-wide uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Retailer Logos Marquee */}
          <div className="fade-in relative overflow-hidden py-6">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-navy-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-navy-900 to-transparent z-10" />
            <div className="flex gap-16 animate-[marquee_20s_linear_infinite] w-max">
              {[
                { icon: "fab fa-amazon", name: "Amazon" },
                { icon: "fab fa-apple", name: "Apple" },
                { icon: "fas fa-shopping-bag", name: "SHEIN" },
                { icon: "fas fa-running", name: "Nike" },
                { icon: "fas fa-store", name: "Macy's" },
                { icon: "fab fa-ebay", name: "eBay" },
                { icon: "fab fa-amazon", name: "Amazon" },
                { icon: "fab fa-apple", name: "Apple" },
                { icon: "fas fa-shopping-bag", name: "SHEIN" },
                { icon: "fas fa-shoe-prints", name: "Nike" },
                { icon: "fas fa-store", name: "Macy's" },
                { icon: "fab fa-ebay", name: "eBay" },
              ].map((r, i) => (
                <div
                  key={`${r.name}-${i}`}
                  className="flex items-center gap-3 text-white/20 shrink-0"
                >
                  <i className={`${r.icon} text-3xl`} />
                  <span className="font-display font-semibold text-base whitespace-nowrap">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CTA BANNER ════════════════ */}
      <section className="py-20 bg-white relative">
        <div className="max-w-3xl mx-auto px-[8%] text-center fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Ready to shop the world?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
            Get a free quote in seconds. No credit card, no commitment — just
            send us the link to what you want.
          </p>
          <Link
            to="/calculator"
            className="btn-glow inline-block px-10 py-4 bg-gradient-to-r from-brand-500 to-accent-400 text-white font-display font-semibold rounded-xl text-base no-underline shadow-[0_4px_20px_rgba(0,212,255,0.2)]"
          >
            <i className="fas fa-calculator mr-2" />
            Estimate Your Cost
          </Link>
        </div>
      </section>
    </>
  );
}
