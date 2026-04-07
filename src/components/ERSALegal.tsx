import React, { useState, useEffect, useRef } from "react";
import ERSALogo from "../assets/ERSALogo.svg"
/* ─── Google Fonts Import ─── */
const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@400;500;600;700&display=swap');
`;

/* ─── Global Styles with Professional Design System ─── */
const globalStyles = `
  ${fontImport}
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

/* ─── Color Palette (Professional & Restrained) ─── */
const colors = {
  primary: "#00113A",      // Deep charcoal
  secondary: "#6b7280",    // Muted gray
  accent: "#775A19",       // Professional blue
  accentHover: "#775A19",  // Darker blue
  text: "#00113A",         // Charcoal text
  textLight: "#6b7280",    // Gray text
  border: "#e5e7eb",       // Light border
  background: "#ffffff",   // White bg
  backgroundAlt: "#f9fafb", // Off-white bg
  success: "#10b981",      // Emerald
};

/* ─── Reusable Button Style Generator ─── */
const getButtonStyle = (variant: "primary" | "secondary" = "primary"): React.CSSProperties => {
  const base: React.CSSProperties = {
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    letterSpacing: 0.3,
    cursor: "pointer",
    border: "none",
    borderRadius: 6,
    padding: "12px 24px",
    textDecoration: "none",
    transition: "all 200ms ease-out",
    textTransform: "uppercase" as const,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  };

  return variant === "primary"
    ? {
        ...base,
        background: colors.primary,
        color: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
      }
    : {
        ...base,
        background: "transparent",
        color: colors.primary,
        border: `1.5px solid ${colors.primary}`,
      };
};

/* ─── Reusable Card Style ─── */
const getCardStyle = (): React.CSSProperties => ({
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  background: colors.background,
  padding: "28px 24px",
  transition: "all 200ms ease-out",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
});

/* ─── Intersection Observer Hook for Lazy Loading ─── */
const useIntersectionObserver = (options: IntersectionObserverInit = {}): [React.MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

/* ─── Responsive Hook ─── */
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
};

/* ─── Shared Styles ─── */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 0.5,
  color: colors.textLight,
  fontFamily: "'DM Sans', sans-serif",
  marginBottom: 8,
  textTransform: "uppercase",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: `1px solid ${colors.border}`,
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  color: colors.text,
  background: colors.backgroundAlt,
  outline: "none",
  boxSizing: "border-box",
  borderRadius: 6,
  transition: "all 200ms ease-out",
};

/* ─── Main Component ─── */
const ERSALegal: React.FC = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const px = isMobile ? "20px" : isTablet ? "40px" : "80px";

  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    location: "",
    email: "",
    practiceArea: "",
    message: "",
  });

  // Intersection observers for different sections
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [principalRef, principalVisible] = useIntersectionObserver();
  const [contactRef, contactVisible] = useIntersectionObserver();
  const [feeRef, feeVisible] = useIntersectionObserver();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Enquiry submitted!");
  };

  const practiceAreas = [
    { icon: "⚖️", title: "Dispute Resolution & Litigation", desc: "Representation in civil, commercial, writ, and arbitration matters before the High Court and other forums, including complex disputes." },
    { icon: "🏢", title: "Corporate & Commercial Advisory", desc: "Advising on contracts, business arrangements, structuring, and agreed-across commercial operations." },
    { icon: "🌐", title: "International & Cross-Border", desc: "Advising clients on legal and regulatory issues involving India and international jurisdictions, including structuring and compliance." },
    { icon: "📋", title: "Customs and Taxation", desc: "Advisory and disputes relating to Customs, Central Excise, GST, taxation matters, and foreign trade compliance." },
    { icon: "💡", title: "Intellectual Property", desc: "Intellectual property matters across patents, trademarks, and copyrights, including registration, enforcement, and disputes." },
    { icon: "🏠", title: "Real Estate", desc: "Advising on property transactions, due diligence, development arrangements, succession planning, and estate matters." },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: colors.text, margin: 0, padding: 0, overflowX: "hidden", background: colors.background }}>
      <style>{globalStyles}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: `16px ${px}`, borderBottom: `1px solid ${colors.border}`, background: colors.background,
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)", backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}>
        {/* Logo */}
        <img src={ERSALogo} alt="ERSA Logo" />

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["About", "Practice Areas", "Experience"].map((item) => (
              <a key={item} href="#" style={{
                textDecoration: "none", color: colors.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500, transition: "color 200ms ease-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.text)}>
                {item}
              </a>
            ))}
            <a href="#contact" style={getButtonStyle("primary")}>
              Book Consultation
            </a>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: colors.primary, lineHeight: 1 }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div style={{ background: colors.background, borderBottom: `1px solid ${colors.border}`, padding: "16px", display: "flex", flexDirection: "column", gap: 14, zIndex: 99, position: "relative" }}>
          {["About", "Practice Areas", "Experience"].map((item) => (
            <a key={item} href="#" style={{ textDecoration: "none", color: colors.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{item}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} style={{ ...getButtonStyle("primary"), width: "100%", justifyContent: "center" }}>
            Book Consultation
          </a>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{ background: colors.background, position: "relative", overflow: "hidden" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          minHeight: isMobile ? "auto" : 680,
          alignItems: "center",
        }}>
          {/* Left */}
          <div style={{
            padding: isMobile ? "64px 20px 56px" : `0px ${px}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            animation: heroVisible ? "slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
            opacity: heroVisible ? 1 : 0,
          }}>
            <p style={{
              fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: colors.accent,
              marginBottom: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, alignSelf: "flex-start",
              lineHeight: 1.4, opacity: 0.95,
            }}>
              The Principal Jurist
            </p>
            <h1 style={{
              fontSize: isMobile ? 40 : isTablet ? 48 : 64, fontWeight: 700, lineHeight: 1.15,
              color: colors.primary, margin: "0 0 14px 0", fontFamily: "'Manrope', sans-serif",
              animation: heroVisible ? "fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s forwards" : "none",
              opacity: heroVisible ? 1 : 0,
              letterSpacing: -0.8,
            }}>
              Defined by Approach.
              <br/> Guided by Tradition.
            </h1>
            <p style={{
              fontSize: 15, lineHeight: 1.75, color: colors.textLight, fontFamily: "'DM Sans', sans-serif",
              marginBottom: 20, fontWeight: 400,
              animation: heroVisible ? "fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s forwards" : "none",
              opacity: heroVisible ? 1 : 0,
              letterSpacing: 0.2,
            }}>
              ERSA Legal is a boutique legal practice based in Chennai, advising clients across civil, regulatory, and cross-border matters across South India.
            </p>
            <p style={{
              fontSize: 15, lineHeight: 1.75, color: colors.textLight, fontFamily: "'DM Sans', sans-serif",
              marginBottom: 44, fontWeight: 400,
              animation: heroVisible ? "fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s forwards" : "none",
              opacity: heroVisible ? 1 : 0,
              letterSpacing: 0.2,
            }}>
              We bring structured thinking, measured execution, and strategic representation to individuals, businesses, and international clients navigating complex legal environments.
            </p>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 16,
              animation: heroVisible ? "fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.22s forwards" : "none",
              opacity: heroVisible ? 1 : 0,
            }}>
              <a href="#contact" style={{
                ...getButtonStyle("primary"),
                boxShadow: "0 4px 12px rgba(0, 17, 58, 0.2)",
                transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0, 17, 58, 0.32)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0, 17, 58, 0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}>
                Book Consultation
              </a>
              <a href="#services" style={{
                ...getButtonStyle("secondary"),
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = colors.primary;
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0, 17, 58, 0.15)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = colors.primary;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}>
                View Services
              </a>
            </div>
          </div>

          {/* Right — hero image */}
          <div style={{
            height: isMobile ? 340 : "auto",
            minHeight: isMobile ? 340 : 680,
            position: "relative",
            overflow: "hidden",
            animation: heroVisible ? "slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
            opacity: heroVisible ? 1 : 0,
          }}>
            {/* Background decorative elements */}
            <div style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "40%",
              height: "40%",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              bottom: "-30%",
              left: "-5%",
              width: "50%",
              height: "50%",
              borderRadius: "50%",
              background: "rgba(119, 90, 25, 0.08)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }} />
            
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
              mixBlendMode: "overlay",
            }} />
            
            {/* Subtle grain texture overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='white' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
              opacity: 0.5,
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </section>

      {/* ─── PRACTICE AREAS ─── */}
      <section id="services" ref={servicesRef} style={{ padding: `80px ${px}`, background: colors.backgroundAlt }}>
        <p style={{
          fontSize: 12,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: colors.accent,
          marginBottom: 12,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          animation: servicesVisible ? "fadeInUp 0.4s ease-out forwards" : "none",
        }}>
          Our Expertise
        </p>
        <h2 style={{
          fontSize: isMobile ? 32 : 42,
          fontWeight: 700,
          color: colors.primary,
          margin: "0 0 48px 0",
          fontFamily: "'Manrope', sans-serif",
          animation: servicesVisible ? "fadeInUp 0.4s ease-out 0.05s forwards" : "none",
          opacity: servicesVisible ? 1 : 0,
        }}>
          Strategic Practice Areas
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
          gap: 24,
          marginBottom: 32,
        }}>
          {practiceAreas.map((area, idx) => (
            <div
              key={area.title}
              style={{
                ...getCardStyle(),
                display: "flex",
                flexDirection: "column",
                gap: 12,
                animation: servicesVisible ? `fadeInUp 0.4s ease-out ${0.06 + idx * 0.04}s forwards` : "none",
                opacity: servicesVisible ? 1 : 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 28 }}>{area.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.primary, margin: 0, fontFamily: "'Manrope', sans-serif" }}>{area.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{area.desc}</p>
              <a href="#" style={{
                fontSize: 12, letterSpacing: 0.5, color: colors.accent, textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif", marginTop: 4, textTransform: "uppercase", fontWeight: 600,
                transition: "opacity 200ms ease-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                Explore Service →
              </a>
            </div>
          ))}
        </div>

        {/* Healthcare banner */}
        <div style={{
          background: colors.primary,
          color: "#fff",
          padding: isMobile ? "32px 20px" : "48px 40px",
          borderRadius: 8,
          animation: servicesVisible ? "fadeInUp 0.4s ease-out 0.2s forwards" : "none",
          opacity: servicesVisible ? 1 : 0,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}>
          <div style={{ fontSize: 32, marginBottom: 14 }}>🏥</div>
          <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}>Healthcare & Regulatory Law</h3>
          <p style={{ margin: 0, fontSize: 15, color: "#e5e7eb", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            Advising on biomedical laws, healthcare arrangements, food and drug compliance, and regulatory frameworks in evolving markets.
          </p>
          <a href="#" style={{
            fontSize: 12, letterSpacing: 0.5, color: "#FFDEA5", textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
            display: "inline-block", marginTop: 16, fontWeight: 600, transition: "opacity 200ms ease-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
            View Regulatory Frameworks →
          </a>
        </div>
      </section>

      {/* ─── PRINCIPAL COUNSEL ─── */}
      <section ref={principalRef} style={{ padding: `80px ${px}`, background: colors.background }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 380px",
          gap: isMobile ? 40 : 64,
          alignItems: "center",
        }}>
          <div style={{
            order: isMobile ? 2 : 1,
            animation: principalVisible ? "slideInLeft 0.5s ease-out forwards" : "none",
            opacity: principalVisible ? 1 : 0,
          }}>
            <p style={{
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: colors.textLight,
              marginBottom: 12,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
            }}>
              About The Firm
            </p>
            <h2 style={{ fontSize: isMobile ? 36 : 48, fontWeight: 700, color: colors.primary, margin: "0 0 8px 0", fontFamily: "'Manrope', sans-serif" }}>Vidyesh V.</h2>
            <p style={{ fontSize: 13, letterSpacing: 1, color: colors.accent, fontFamily: "'DM Sans', sans-serif", marginBottom: 28, textTransform: "uppercase", fontWeight: 600 }}>
              LL.B., LL.M (HONS., USA) – Advocate
            </p>
            {[
              "Vidyesh V. is an advocate practising before the High Court of Madras and other courts and tribunals, with a practice primarily across South India covering civil, commercial, and regulatory matters.",
              "Advising individuals, businesses, and international clients on legal frameworks, regulatory compliance, and complex commercial issues across diverse sectors.",
              "LL.M. (Hons.) from the University of Illinois Urbana-Champaign (USA). Recognized with CIAC Excellence for the Future Awards.",
              "A longstanding commitment to the legal profession with comprehensive experience in litigation, regulatory work, and commercial advisory.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: colors.textLight,
                  marginBottom: 16,
                  fontFamily: "'DM Sans', sans-serif",
                  animation: principalVisible ? `fadeInUp 0.4s ease-out ${0.08 + i * 0.08}s forwards` : "none",
                  opacity: principalVisible ? 1 : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
          <div style={{
            order: isMobile ? 1 : 2,
            width: "100%",
            height: isMobile ? 320 : 520,
            overflow: "hidden",
            backgroundImage: `url("https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "grayscale(15%)",
            animation: principalVisible ? "slideInRight 0.5s ease-out forwards" : "none",
            opacity: principalVisible ? 1 : 0,
            borderRadius: 12,
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
          }} />
        </div>
      </section>

      {/* ─── CONTACT FORM ─── */}
      <section id="contact" ref={contactRef} style={{ padding: `80px ${px}`, background: colors.backgroundAlt }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: 12,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: colors.accent,
            marginBottom: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            animation: contactVisible ? "fadeInUp 0.4s ease-out forwards" : "none",
          }}>
            Get in Touch
          </p>
          <h2 style={{
            fontSize: isMobile ? 32 : 42,
            fontWeight: 700,
            color: colors.primary,
            marginBottom: 16,
            fontFamily: "'Manrope', sans-serif",
            animation: contactVisible ? "fadeInUp 0.4s ease-out 0.05s forwards" : "none",
            opacity: contactVisible ? 1 : 0,
          }}>
            Inquiry & Consultation
          </h2>
          <p style={{
            fontSize: 16,
            color: colors.textLight,
            marginBottom: 40,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.7,
            animation: contactVisible ? "fadeInUp 0.4s ease-out 0.1s forwards" : "none",
            opacity: contactVisible ? 1 : 0,
          }}>
            Share your details for a structured response to your legal requirements.
          </p>
          <form onSubmit={handleSubmit} style={{
            textAlign: "left",
            animation: contactVisible ? "fadeInUp 0.4s ease-out 0.15s forwards" : "none",
            opacity: contactVisible ? 1 : 0,
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}>
              {[
                { name: "fullName", label: "Full Name", placeholder: "Your full legal name" },
                { name: "mobile", label: "Mobile Number", placeholder: "+91 00000 00000" },
                { name: "location", label: "Location", placeholder: "City, Country" },
                { name: "email", label: "Email ID", placeholder: "email@example.com" },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = colors.accent)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = colors.border)}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Practice Area of Interest</label>
              <select name="practiceArea" value={formData.practiceArea} onChange={handleChange} style={inputStyle}>
                <option value="">Select an option</option>
                <option>Dispute Resolution & Litigation</option>
                <option>Corporate & Commercial Advisory</option>
                <option>International & Cross-Border</option>
                <option>Customs and Taxation</option>
                <option>Intellectual Property</option>
                <option>Real Estate</option>
                <option>Healthcare, Life Sciences & Food Regulation</option>
              </select>
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Message / Enquiry</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe the nature of your inquiry" rows={5} style={{
                ...inputStyle,
                resize: "vertical",
              }} />
            </div>
            <button type="submit" style={{
              ...getButtonStyle("primary"),
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = colors.accentHover;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = colors.primary;
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}>
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section style={{
        padding: `32px ${px}`,
        background: colors.backgroundAlt,
        borderTop: `1px solid ${colors.border}`,
        animation: "fadeIn 0.5s ease-out forwards",
      }}>
        <p style={{ fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: 8, color: colors.text }}>⚠ Disclaimer</p>
        <p style={{
          fontSize: 13, color: colors.textLight, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", margin: 0
        }}>
          As per Bar Council of India rules, advocates are not permitted to solicit work or advertise. This website is provided for informational purposes only and does not constitute legal advice.
        </p>
      </section>

      {/* ─── FEE SETTLEMENT ─── */}
      <section ref={feeRef} style={{ padding: `80px ${px}`, background: colors.background }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
          gap: isMobile ? 40 : 56,
          alignItems: "center",
        }}>
          <div style={{
            animation: feeVisible ? "slideInLeft 0.5s ease-out forwards" : "none",
            opacity: feeVisible ? 1 : 0,
          }}>
            <p style={{
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: colors.textLight,
              marginBottom: 12,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
            }}>
              Financial Services
            </p>
            <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 700, color: colors.primary, margin: "0 0 16px 0", fontFamily: "'Manrope', sans-serif" }}>
              Secure Payment Portal
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.textLight, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
              Access our secure payment system for streamlined settlement of professional fees and retainers with multiple payment options.
            </p>
            <a href="#" style={getButtonStyle("primary")}>
              Make Payment
            </a>
          </div>
          <div style={{
            ...getCardStyle(),
            textAlign: "center",
            animation: feeVisible ? "slideInRight 0.5s ease-out forwards" : "none",
            opacity: feeVisible ? 1 : 0,
            borderRadius: 12,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, margin: "0 0 8px 0", fontFamily: "'Manrope', sans-serif" }}>Secure</h4>
            <p style={{ fontSize: 13, color: colors.textLight, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: 0 }}>Encrypted & Compliant Processing</p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: colors.primary,
        color: "#fff",
        padding: `64px ${px} 32px`,
        animation: "fadeIn 0.5s ease-out forwards",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1.5fr 1fr 1fr",
          gap: isMobile ? 32 : 56,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <img src={ERSALogo} alt="ERSA Logo" style={{ width: 120, marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: "#d1d5db", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Professional legal counsel for complex matters.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["f", "𝕏", "in", "▶"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                    textDecoration: "none",
                    transition: "all 200ms ease-out",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = colors.accent;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5, fontFamily: "'Manrope', sans-serif" }}>Navigation</h4>
            {["About", "Practice Areas", "Experience"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "#d1d5db",
                  textDecoration: "none",
                  marginBottom: 10,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "color 200ms ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5, fontFamily: "'Manrope', sans-serif" }}>Contact</h4>
            <p style={{ fontSize: 14, color: "#d1d5db", fontFamily: "'DM Sans', sans-serif", lineHeight: 2, margin: 0 }}>
              📞 +91 XXXXX XXXXX<br />
              📍 Chennai, India<br />
              📧 hello@ersa.legal
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            © 2026 ERSA Legal. All rights reserved. | Privacy Policy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ERSALegal;