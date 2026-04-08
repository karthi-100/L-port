import React, { useState, useEffect, memo } from "react";
import Logo from "../assets/ERSALogo.svg";
import Icon1 from "../assets/Icon-1.svg";
import Icon2 from "../assets/Icon-2.svg";
import Icon3 from "../assets/Icon-3.svg";
import Icon4 from "../assets/Icon-4.svg";
import Icon5 from "../assets/Icon-5.svg";
import Icon6 from "../assets/Icon-6.svg";
import IconArrow from "../assets/Icon-arrow.svg";
import IconHealthcare from "../assets/Icon-healthcare.svg";
// ─── Asset URLs from Figma ────────────────────────────────────────────────────
const imgLogo = Logo;
const imgLawLibrary = "https://www.figma.com/api/mcp/asset/c2b10731-bb51-46b3-8fbd-88ac05c619d1";
const imgPortrait = "https://www.figma.com/api/mcp/asset/def6b30f-438c-48d5-a045-6adc1333b41c";
const imgIconDispute = Icon1;
const imgArrowBtn = "https://www.figma.com/api/mcp/asset/d7b51346-062a-481c-8270-0fda2f0b563b";
const imgIconCorporate = Icon2;
const imgIconIntl = Icon3;
const imgIconCustoms = Icon4;
const imgIconIP = Icon5;
const imgIconRealEstate = Icon6;
const imgIconHealthcare = IconHealthcare;
const imgArrowHealthcareGold = "https://www.figma.com/api/mcp/asset/571ebf0b-0e44-4f9f-aa6b-6ecd3d879fd7";
const imgSelectArrow = IconArrow;
const imgArrowSubmit = "https://www.figma.com/api/mcp/asset/fbbfb89f-56b2-4771-a003-54b6f01c1b98";
const imgIconDisclaimerLabel = "https://www.figma.com/api/mcp/asset/0490fcc5-e5db-46af-99e7-91638066b9c7";
const imgIconPayment = "https://www.figma.com/api/mcp/asset/3e94b5bf-86ab-4b82-86ca-eed128e22c38";
const imgArrowPayment = "https://www.figma.com/api/mcp/asset/b933d281-5ebd-499a-8f13-06c2db6d38ad";
const imgSocialLinkedIn = "https://www.figma.com/api/mcp/asset/34a2535b-c32c-44ae-b362-fc61949b61d2";
const imgSocialTwitter = "https://www.figma.com/api/mcp/asset/946c19d6-3299-4fb2-bcb2-a57cfad9abed";
const imgSocialFacebook = "https://www.figma.com/api/mcp/asset/4a402e97-2174-4521-a524-aa886028d5e7";
const imgSocialInstagram = "https://www.figma.com/api/mcp/asset/3c680d6b-85ab-4845-8f93-b7152a9f02a9";
const imgSocialYoutube = "https://www.figma.com/api/mcp/asset/d392ea9c-838e-47cf-87de-faf391552e61";
const imgFooterPhone = "https://www.figma.com/api/mcp/asset/29625f42-142d-43b7-b795-1758af6e6b66";
const imgFooterAddress = "https://www.figma.com/api/mcp/asset/0d9cd6ae-e3ce-47b8-a1e0-377993283ec0";
const imgFooterEmail = "https://www.figma.com/api/mcp/asset/34d99181-64e8-472a-a753-21a39a17ccba";

// ─── Responsive CSS ───────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
  input::placeholder, textarea::placeholder { color: #6b7280; }
  img { display: block; max-width: 100%; height: auto; }

  /* ── Animations ── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .ersa-spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3); border-radius: 50%;
    border-top-color: #fff; animation: spin 0.8s linear infinite;
  }

  /* Scroll Animations */
  .scroll-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .scroll-animate.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Navbar ── */
  .ersa-nav { display: flex; align-items: center; justify-content: space-between; }
  .ersa-nav-links { display: flex; gap: 32px; align-items: center; margin-left: auto; margin-right: 32px; }
  .ersa-nav-cta { display: block; }
  .ersa-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; }
  .ersa-mobile-menu {
    display: none; position: fixed; top: 84px; left: 0; right: 0;
    background: rgba(248,250,252,0.98); backdrop-filter: blur(4px);
    flex-direction: column; padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 99; gap: 0;
  }
  .ersa-mobile-menu.open { display: flex; }

  /* ── Hero ── */
  .ersa-hero { position: relative; overflow: hidden; background: #fff; }
  .ersa-hero-img-abs {
    position: absolute; top: 140px; right: 47px;
    width: min(542px, 40%); height: 659px;
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
  .ersa-hero-text { position: relative; padding: 140px 44% 80px 104px; text-align: left; }

  /* ── Practice grid ── */
  .ersa-practice-section { background: #f3f3f5; padding: 80px 104px; text-align: left; }
  .ersa-practice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: flex-start; }
  .ersa-practice-wide { grid-column: 1 / span 3; }
  .ersa-practice-card { background: #fff; padding: 40px; display: flex; flex-direction: column; gap: 12px; transition: transform 0.3s, box-shadow 0.3s; }
  .ersa-practice-card:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.08); }

  /* ── About ── */
  .ersa-about-section { background: #f9f9fb; padding: 128px 80px; }
  .ersa-about-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; max-width: 1280px; margin: 0 auto; }
  .ersa-portrait { width: 485px; height: 607px; flex-shrink: 0; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }

  /* ── Form grid ── */
  .ersa-contact-section { background: #fff; padding: 80px 24px; }
  .ersa-form-card { max-width: 896px; margin: 0 auto; background: #fff; border: 1px solid rgba(197,198,210,0.2); box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 49px; }
  .ersa-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px 48px; }
  .ersa-form-full { grid-column: 1 / span 2; }

  /* ── Payment ── */
  .ersa-payment-section { background: #fff; border-top: 1px solid rgba(197,198,210,0.1); padding: 97px 104px 96px; text-align: left; }
  .ersa-payment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1392px; margin: 0; }

  /* ── Disclaimer ── */
  .ersa-disclaimer-section { background: #f3f3f5; border-top: 1px solid rgba(197,198,210,0.1); padding: 65px 70px 64px; position: relative; overflow: hidden; }

  /* ── Footer ── */
  .ersa-footer { background: #00113a; padding: 44px 152px 0; overflow: hidden; }
  .ersa-footer-grid { display: grid; grid-template-columns: auto 1fr auto auto; gap: 48px; align-items: start; padding-bottom: 40px; }

  /* ════════════
     LAPTOP  ≥ 1280px
  ════════════ */
  @media (min-width: 1280px) {
    .ersa-hero-text { padding-left: 120px; }
    .ersa-practice-section { padding: 100px 120px; text-align: left; }
    .ersa-about-section { padding: 140px 120px; }
    .ersa-payment-section { padding: 97px 120px 96px; }
  }

  /* ════════════
     MEDIUM TABLET  ≤ 1024px
  ════════════ */
  @media (max-width: 1024px) {
    .ersa-hero-img-abs { width: 36%; height: 480px; top: 110px; right: 30px; box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
    .ersa-hero-text { padding: 110px 40% 80px 40px; }

    .ersa-practice-section { padding: 64px 40px; }
    .ersa-practice-grid { grid-template-columns: repeat(2, 1fr); }
    .ersa-practice-wide { grid-column: 1 / span 2; }

    .ersa-about-section { padding: 80px 40px; }
    .ersa-about-grid { grid-template-columns: 1fr; gap: 32px; }
    .ersa-portrait { width: 100%; height: 480px; }

    .ersa-payment-grid { grid-template-columns: 1fr; gap: 48px; }

    .ersa-footer { padding: 44px 60px 0; }
    .ersa-footer-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
  }

  /* ════════════
     SMALL TABLET  ≤ 900px
  ════════════ */
  @media (max-width: 900px) {
    .ersa-nav { padding: 0 16px; }
    .ersa-hero-text { padding: 90px 35% 60px 32px; }
    .ersa-hero-h1 { font-size: 54px !important; line-height: 62px !important; }
    .ersa-practice-grid { gap: 24px; }
    .ersa-about-h2 { font-size: 48px !important; }
    .ersa-payment-h2 { font-size: 40px !important; }
  }

  /* ════════════
     MOBILE  ≤ 768px
  ════════════ */
  @media (max-width: 768px) {
    .ersa-nav { padding: 0 12px; }
    .ersa-nav-links { display: none; }
    .ersa-nav-cta { display: none; }
    .ersa-hamburger { display: flex; }

    .ersa-hero { min-height: auto; }
    .ersa-hero-img-abs { display: none; }
    .ersa-hero-text { padding: 32px 20px 48px; }

    .ersa-hero-h1 { font-size: 38px !important; line-height: 44px !important; margin: 0 0 24px !important; }
    .ersa-hero-p { font-size: 16px !important; line-height: 26px !important; }
    .ersa-hero-btns button { font-size: 13px !important; padding: 14px 24px !important; }

    .ersa-practice-section { padding: 48px 20px; }
    .ersa-practice-grid { grid-template-columns: 1fr; gap: 20px; }
    .ersa-practice-wide { grid-column: 1; }
    .ersa-practice-card { padding: 28px 24px; gap: 10px; }
    .ersa-practice-h2 { font-size: 32px !important; line-height: 36px !important; }

    .ersa-about-section { padding: 48px 20px; }
    .ersa-about-grid { gap: 24px; }
    .ersa-portrait { height: 360px; box-shadow: 0 6px 16px rgba(0,0,0,0.12); }
    .ersa-about-h2 { font-size: 40px !important; line-height: 44px !important; }
    .ersa-about-p { font-size: 16px !important; line-height: 26px !important; }

    .ersa-contact-section { padding: 48px 16px; }
    .ersa-form-card { padding: 24px 20px; box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
    .ersa-form-grid { grid-template-columns: 1fr; gap: 20px; }
    .ersa-form-full { grid-column: 1; }

    .ersa-disclaimer-section { padding: 36px 20px; }

    .ersa-payment-section { padding: 48px 20px; }
    .ersa-payment-grid { gap: 32px; }
    .ersa-payment-h2 { font-size: 32px !important; line-height: 36px !important; }
    .ersa-payment-p { font-size: 16px !important; line-height: 26px !important; }

    .ersa-footer { padding: 36px 20px 0; }
    .ersa-footer-grid { grid-template-columns: 1fr; gap: 24px; }
    .ersa-footer-spacer { display: none; }
  }

  /* ════════════
     SMALL MOBILE  ≤ 480px
  ════════════ */
  @media (max-width: 480px) {
    .ersa-nav { padding: 0 8px; }
    .ersa-nav-cta { display: none !important; }
    .ersa-hamburger { padding: 4px; }

    .ersa-hero-text { padding: 24px 16px 32px; }
    .ersa-hero-h1 { font-size: 28px !important; line-height: 34px !important; }
    .ersa-hero-p { font-size: 14px !important; line-height: 22px !important; }
    .ersa-hero-btns { flex-direction: column !important; align-items: stretch !important; }
    .ersa-hero-btns button { width: 100%; text-align: center; justify-content: center; font-size: 12px !important; }

    .ersa-practice-section { padding: 32px 16px; }
    .ersa-practice-grid { gap: 16px; }
    .ersa-practice-card { padding: 20px 16px; }
    .ersa-practice-h2 { font-size: 24px !important; line-height: 30px !important; }

    .ersa-about-section { padding: 32px 16px; }
    .ersa-about-h2 { font-size: 32px !important; line-height: 38px !important; }
    .ersa-about-p { font-size: 14px !important; }

    .ersa-contact-section { padding: 32px 12px; }
    .ersa-form-card { padding: 16px 16px; }
    .ersa-form-grid { gap: 16px; }

    .ersa-payment-h2 { font-size: 26px !important; }
    .ersa-footer { padding: 28px 16px 0; }
    .ersa-footer-grid { gap: 16px; }

    input, textarea, select { font-size: 16px; }
  }

  /* ════════════
     EXTRA SMALL  ≤ 360px
  ════════════ */
  @media (max-width: 360px) {
    .ersa-hero-h1 { font-size: 24px !important; line-height: 30px !important; }
    .ersa-practice-h2 { font-size: 20px !important; }
    .ersa-about-h2 { font-size: 28px !important; }
  }
`;

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const h = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setW(window.innerWidth), 100);
    };
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("resize", h);
      clearTimeout(timeout);
    };
  }, []);
  return w;
}

function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.MutableRefObject<any>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<any>(null);

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
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
const NavBar: React.FC = memo(() => {
  const [open, setOpen] = useState(false);
  
  const handleMenuClose = () => setOpen(false);
  const handleMenuToggle = () => setOpen(prev => !prev);

  return (
    <>
      <header className="ersa-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 84,
        backdropFilter: "blur(4px)", background: "rgba(248,250,252,0.92)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)", zIndex: 100, padding: "0 24px 0 16px",
      }}>
        <div style={{ width: 92, height: 62, flexShrink: 0 }}>
          <img src={imgLogo} alt="ERSA Legal"
            style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "darken" }} />
        </div>

        <nav className="ersa-nav-links">
          {["About", "Practice Areas", "Experience"].map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'Newsreader', Georgia, serif", fontSize: 18, color: "#475569",
              textDecoration: "none", letterSpacing: "-0.45px", whiteSpace: "nowrap",
              transition: "color 0.2s",
            }} onMouseEnter={(e) => (e.currentTarget.style.color = "#00113a")}
               onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>{l}</a>
          ))}
        </nav>

        <button className="ersa-nav-cta" style={{
          background: "#00113a", color: "#fff", border: "none", cursor: "pointer",
          padding: "10px 24px", fontFamily: "'Manrope', sans-serif",
          fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase", whiteSpace: "nowrap",
          transition: "background 0.2s",
        }} onMouseEnter={(e) => (e.currentTarget.style.background = "#001a4d")}
           onMouseLeave={(e) => (e.currentTarget.style.background = "#00113a")}>Book Consultation</button>

        <button className="ersa-hamburger" onClick={handleMenuToggle} aria-label="Menu" aria-expanded={open}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 2, background: "#00113a", borderRadius: 2,
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: open
                ? i === 0 ? "rotate(45deg) translate(6px,6px)"
                  : i === 2 ? "rotate(-45deg) translate(6px,-6px)" : "none"
                : "none",
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </header>

      <div className={`ersa-mobile-menu${open ? " open" : ""}`}>
        {["About", "Practice Areas", "Experience"].map(l => (
          <a key={l} href="#" onClick={handleMenuClose} style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: 18, color: "#475569", textDecoration: "none",
            padding: "14px 0", borderBottom: "1px solid #eee",
            transition: "color 0.2s",
          }} onMouseEnter={(e) => (e.currentTarget.style.color = "#00113a")}
             onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>{l}</a>
        ))}
        <button style={{
          marginTop: 16, background: "#00113a", color: "#fff", border: "none",
          cursor: "pointer", padding: "14px 24px",
          fontFamily: "'Manrope', sans-serif",
          fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase",
          transition: "background 0.2s",
          width: "100%",
        }} onMouseEnter={(e) => (e.currentTarget.style.background = "#001a4d")}
           onMouseLeave={(e) => (e.currentTarget.style.background = "#00113a")}>Book Consultation</button>
      </div>
    </>
  );
});
NavBar.displayName = "NavBar";

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection: React.FC = memo(() => {
  const w = useWindowWidth();
  const mobile = w <= 768;
  const [ref, visible] = useIntersectionObserver();

  return (
    <section ref={ref} className="ersa-hero">
      {!mobile && (
        <div className={`ersa-hero-img-abs scroll-animate ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <img src={imgLawLibrary} alt="Law Library" loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
      <div className={`ersa-hero-text scroll-animate ${visible ? "visible" : ""}`}>
        {mobile && (
          <div style={{ width: "100%", height: 240, borderRadius: 8, overflow: "hidden", marginBottom: 32 }}>
            <img src={imgLawLibrary} alt="Law Library" loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#775a19",
          letterSpacing: "1.6px", textTransform: "uppercase", margin: "0 0 16px",
        }}>The Principal Jurist</p>

        <h1 className="ersa-hero-h1" style={{
          fontFamily: "'Newsreader', Georgia, serif", fontSize: 76, fontWeight: 500,
          color: "#00113a", lineHeight: "78px", margin: "0 0 32px",
        }}>
          Defined by Approach.<br />Guided by Tradition.
        </h1>

        {[
          "ERSA Legal is a boutique legal practice based in Chennai, advising clients across civil, regulatory, and cross-border matters across South India. The focus is on understanding the objective behind each matter and developing a legal strategy aligned to it. Whether addressing an immediate issue or a broader concern, the approach remains practical, structured, and responsive to the context in which it operates.",
          "We act for individuals, businesses, and overseas clients navigating legal and regulatory environments in India. Each matter is approached with careful analysis and an understanding of the specific context in which it arises.",
          "The practice is built on structured thinking and measured execution, with an emphasis on clarity, consistency, and effective representation.",
        ].map((p, i) => (
          <p key={i} className="ersa-hero-p" style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#444650",
            lineHeight: "28px", margin: "0 0 20px",
          }}>{p}</p>
        ))}

        <div className="ersa-hero-btns" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <button style={{
            background: "#00113a", color: "#fff", border: "none", cursor: "pointer",
            padding: "17px 32px", fontFamily: "'Manrope', sans-serif",
            fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase",
            transition: "background 0.2s",
          }} onMouseEnter={(e) => (e.currentTarget.style.background = "#001a4d")}
             onMouseLeave={(e) => (e.currentTarget.style.background = "#00113a")}>Book Consultation</button>
          <button style={{
            background: "transparent", color: "#00113a", border: "1px solid #c5c6d2",
            cursor: "pointer", padding: "17px 33px", fontFamily: "'Manrope', sans-serif",
            fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase",
            transition: "all 0.2s",
          }} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00113a";
            e.currentTarget.style.background = "rgba(0,17,58,0.05)";
          }}
             onMouseLeave={(e) => {
               e.currentTarget.style.borderColor = "#c5c6d2";
               e.currentTarget.style.background = "transparent";
             }}>View Services</button>
        </div>
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection";

// ─── Practice Areas ───────────────────────────────────────────────────────────
const practiceCards = [
  { icon: imgIconDispute, title: "Dispute Resolution & Litigation",    desc: "Representation in civil, commercial, writ, and arbitration matters before the High Courts and other forums, including complex disputes." },
  { icon: imgIconCorporate, title: "Corporate & Commercial Advisory",    desc: "Advising on contracts, business arrangements, structuring, and legal risk across commercial operations." },
  { icon: imgIconIntl, title: "International & Cross-Border",       desc: "Advising clients on legal and regulatory issues involving India and international jurisdictions, including structuring and compliance." },
  { icon: imgIconCustoms, title: "Customs and Taxation",               desc: "Advisory and disputes relating to Customs, Central Excise, GST, taxation matters, and foreign trade compliance." },
  { icon: imgIconIP, title: "Intellectual Property",              desc: "Intellectual property matters across patents, trademarks, and copyrights, including registration, enforcement, and disputes." },
  { icon: imgIconRealEstate, title: "Real Estate",                        desc: "Advising on property transactions, due diligence, development arrangements, succession planning, and estate matters." },
];

const PracticeAreasSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
  <section ref={ref} className="ersa-practice-section">
    <p className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "left", fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#775a19", letterSpacing: "1.6px", textTransform: "uppercase", margin: "0 0 8px" }}>Our Expertise</p>
    <h2 className={`ersa-practice-h2 scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "left", fontFamily: "'Newsreader', Georgia, serif", fontSize: 48, color: "#00113a", lineHeight: "48px", margin: "0 0 48px", transitionDelay: "0.1s" }}>Strategic Practice Areas</h2>

    <div className="ersa-practice-grid">
      {practiceCards.map(({ icon, title, desc }, index) => (
        <div key={index} className={`ersa-practice-card scroll-animate ${visible ? "visible" : ""}`} style={{ transitionDelay: `${0.15 + index * 0.1}s`, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 8 }}>
            <img src={icon} alt="" loading="lazy" style={{ height: 28, width: "auto" }} />
          </div>
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 24, color: "#00113a", lineHeight: "32px", margin: 0, textAlign: "left" }}>{title}</h3>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: "#444650", lineHeight: "22.75px", margin: 0, flexGrow: 1 }}>{desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, color: "#00113a", letterSpacing: "1px", textTransform: "uppercase" }}>Explore Service</span>
            <img src={imgArrowBtn} alt="" loading="lazy" style={{ width: 9, height: 9 }} />
          </div>
        </div>
      ))}

      <div className={`ersa-practice-wide scroll-animate ${visible ? "visible" : ""}`} style={{ background: "#00113a", padding: 40, display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden", transition: "transform 0.3s, opacity 0.8s cubic-bezier(0.25,0.8,0.25,1), transform 0.8s cubic-bezier(0.25,0.8,0.25,1)", transitionDelay: "0.7s" }}>
        <img src={imgIconHealthcare} alt="" loading="lazy" style={{ position: "absolute", bottom: -37, right: -37, width: 203, height: 197, opacity: 0.1 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 8 }}>
          <img src={imgIconHealthcare} alt="" loading="lazy" style={{ height: 28, width: "auto" }} />
        </div>
        <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 30, color: "#fff", lineHeight: "36px", margin: 0 }}>Healthcare, Life Sciences &amp; Food Regulation</h3>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: "26px", margin: 0, maxWidth: 672 }}>
          Advising on biomedical laws, healthcare arrangements, food and drug compliance, and related regulatory matters in evolving markets.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, color: "#ffdea5", letterSpacing: "1.2px", textTransform: "uppercase" }}>View Regulatory Frameworks</span>
          <img src={imgArrowHealthcareGold} alt="" loading="lazy" style={{ width: 9, height: 9 }} />
        </div>
      </div>
    </div>
  </section>
  );
});
PracticeAreasSection.displayName = "PracticeAreasSection";

// ─── About ────────────────────────────────────────────────────────────────────
const AboutSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
  <section ref={ref} className="ersa-about-section">
    <div className="ersa-about-grid">
      <div className={`scroll-animate ${visible ? "visible" : ""}`}>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#775a19", letterSpacing: "3.2px", textTransform: "uppercase", margin: "0 0 32px" }}>Premier Legal Counsel</p>
        <h2 className="ersa-about-h2" style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 60, color: "#00113a", letterSpacing: "-1.5px", lineHeight: "60px", margin: "0 0 8px" }}>Vidyesh V.</h2>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: "#775a19", letterSpacing: "1.4px", textTransform: "uppercase", margin: "0 0 40px" }}>LL.B., LL.M. (Hons., USA) Advocate</p>
        {[
          "Vidyesh V. is an advocate practicing before the High Court of Madras and other courts and tribunals, with a practice primarily across South India. His work includes civil, commercial, and regulatory matters, as well as cross-border and customs-related issues.",
          "He advises individuals, businesses, and overseas clients on navigating legal and regulatory frameworks in India, and has developed a practice addressing disputes, regulatory exposure, and commercial issues across sectors.",
          "He holds an LL.M. (Hons.) from the University of Illinois Urbana-Champaign (USA) and has been recognized with CALI Excellence for the Future Awards.",
          "The practice reflects a longstanding association with the legal profession, with continued engagement in litigation across generations.",
        ].map((p, i) => (
          <p key={i} className="ersa-about-p" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#444650", lineHeight: "29.25px", margin: "0 0 24px" }}>{p}</p>
        ))}
      </div>

      <div className={`ersa-portrait scroll-animate ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
        <div style={{ position: "absolute", bottom: -32, left: -32, width: 192, height: 192, background: "#ffdea5", borderRadius: "50%", filter: "blur(32px)", opacity: 0.2, zIndex: 0 }} />
        <img src={imgPortrait} alt="Vidyesh V." loading="lazy" style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,17,58,0.03)", mixBlendMode: "multiply", zIndex: 2 }} />
      </div>
    </div>
  </section>
  );
});
AboutSection.displayName = "AboutSection";

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Enquiry submitted successfully!");
    }, 2000);
  };

  const input: React.CSSProperties = {
    width: "100%", borderBottom: "1px solid #c5c6d2",
    borderTop: "none", borderLeft: "none", borderRight: "none",
    padding: "13px 12px 14px", fontFamily: "'Manrope', sans-serif",
    fontSize: 16, color: "#1a1a2e", background: "transparent", outline: "none",
    transition: "border-color 0.2s",
  };
  const lbl: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif", fontSize: 10, color: "#757682",
    letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 8,
    textAlign: "left",
  };
  return (
    <section ref={ref} className="ersa-contact-section">
      <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#775a19", letterSpacing: "3.2px", textTransform: "uppercase", margin: "0 0 8px" }}>Direct Communication</p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 48, color: "#00113a", lineHeight: "48px", margin: "0 0 16px" }}>Inquiry &amp; Consultation</h2>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#444650", lineHeight: "28px", maxWidth: 570, margin: "0 auto" }}>
          Please provide your details below for a structured response to your legal requirements.
        </p>
      </div>
      <div className={`ersa-form-card scroll-animate ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
        <div className="ersa-form-grid">
          <div><label style={lbl}>Full Name</label><input type="text" placeholder="Your full legal name" style={input} /></div>
          <div><label style={lbl}>Mobile Number</label><input type="tel" placeholder="+91 00000 00000" style={input} /></div>
          <div><label style={lbl}>Location</label><input type="text" placeholder="City, Country" style={input} /></div>
          <div><label style={lbl}>Email ID</label><input type="email" placeholder="email@example.com" style={input} /></div>

          <div className="ersa-form-full">
            <label style={lbl}>Practice Area of Interest</label>
            <div style={{ position: "relative" }}>
              <select style={{ ...input, appearance: "none", paddingRight: 40, cursor: "pointer" }}>
                <option>Select an option</option>
                {["Dispute Resolution & Litigation","Corporate & Commercial Advisory","International & Cross-Border","Customs and Taxation","Intellectual Property","Real Estate","Healthcare, Life Sciences & Food Regulation"].map(o => <option key={o}>{o}</option>)}
              </select>
              <img src={imgSelectArrow} alt="" loading="lazy" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, pointerEvents: "none" }} />
            </div>
          </div>

          <div className="ersa-form-full">
            <label style={lbl}>Message / Enquiry</label>
            <textarea placeholder="Describe the nature of your inquiry in detail..." rows={4}
              style={{ ...input, resize: "none", paddingTop: 12, lineHeight: "24px" }} />
          </div>

          <div className="ersa-form-full" style={{ paddingTop: 24 }}>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
              background: "#00113a", color: "#fff", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer",
              padding: "16px 48px", fontFamily: "'Manrope', sans-serif",
              fontSize: 14, letterSpacing: "2.8px", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 12, opacity: isSubmitting ? 0.8 : 1,
              transition: "background 0.2s, transform 0.1s",
            }} onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#001a4d"; }}
               onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#00113a"; }}>
              {isSubmitting ? (
                <>
                  <span className="ersa-spinner" /> Submitting...
                </>
              ) : (
                <>
                  Submit Enquiry
                  <img src={imgArrowSubmit} alt="" loading="lazy" style={{ width: 10, height: 8 }} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});ContactSection.displayName = "ContactSection";
// ─── Disclaimer ───────────────────────────────────────────────────────────────
const DisclaimerSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
  <section ref={ref} className={`ersa-disclaimer-section scroll-animate ${visible ? "visible" : ""}`}>
    <div style={{ maxWidth: 768 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, opacity: 0.8 }}>
        <img src={imgIconDisclaimerLabel} alt="" loading="lazy" style={{ width: 15, height: 16 }} />
        <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 20, color: "#00113a", fontStyle: "italic" }}>Disclaimer</span>
      </div>
      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: "#444650", lineHeight: "20px", margin: 0 }}>
        As per the rules of the Bar Council of India, advocates are not permitted to solicit work or advertise.
        This website is provided for informational purposes only and does not constitute legal advice.
        By accessing this website, you acknowledge that you are seeking information about ERSA Legal of your own
        accord and that no solicitation or advertisement has been made.
      </p>
    </div>
  </section>
  );
});
DisclaimerSection.displayName = "DisclaimerSection";

// ─── Payment ──────────────────────────────────────────────────────────────────
const PaymentSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
  <section ref={ref} className="ersa-payment-section">
    <div className="ersa-payment-grid">
      <div className={`scroll-animate ${visible ? "visible" : ""}`}>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#775a19", letterSpacing: "3.2px", textTransform: "uppercase", margin: "0 0 16px" }}>Financial Services</p>
        <h2 className="ersa-payment-h2" style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 48, color: "#00113a", lineHeight: "48px", margin: "0 0 24px" }}>Professional Fee Settlement</h2>
        <p className="ersa-payment-p" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#444650", lineHeight: "29.25px", maxWidth: 485, margin: "0 0 32px" }}>
          Access our secure payment portal for the streamlined settlement of professional fees and retainers.
          We provide a range of sophisticated payment options to ensure convenience and security for our global clientele.
        </p>
        <button style={{
          background: "#00113a", color: "#fff", border: "none", cursor: "pointer",
          padding: "16px 40px", fontFamily: "'Manrope', sans-serif",
          fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "background 0.2s, transform 0.1s",
        }} onMouseEnter={(e) => (e.currentTarget.style.background = "#001a4d")}
           onMouseLeave={(e) => (e.currentTarget.style.background = "#00113a")}>
          Make Payment <img src={imgArrowPayment} alt="" loading="lazy" style={{ width: 17, height: 12 }} />
        </button>
      </div>
      <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 254, transitionDelay: "0.2s" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(119,90,25,0.04)", borderRadius: 12, filter: "blur(20px)" }} />
        <div style={{
          background: "#fff", border: "1px solid rgba(197,198,210,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          padding: 49, display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative", width: "min(321px, 100%)",
        }}>
          <img src={imgIconPayment} alt="" loading="lazy" style={{ width: 42, height: 54, marginBottom: 24 }} />
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 24, color: "#00113a", textAlign: "center", lineHeight: "32px", margin: "0 0 8px" }}>Secure Transactions</h3>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: "#444650", textAlign: "center", lineHeight: "20px", margin: 0 }}>Encrypted &amp; Compliant Processing</p>
        </div>
      </div>
    </div>
  </section>
  );
});
PaymentSection.displayName = "PaymentSection";

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
  <footer ref={ref} className={`ersa-footer scroll-animate ${visible ? "visible" : ""}`}>
    <div className="ersa-footer-grid">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: "#fff", borderRadius: 7, width: 108, height: 65, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <img src={imgLogo} alt="ERSA Legal" loading="lazy" style={{ width: 92, height: 62, objectFit: "contain", mixBlendMode: "darken" }} />
        </div>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: 0 }}>Visit us</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[imgSocialLinkedIn, imgSocialTwitter, imgSocialFacebook, imgSocialInstagram, imgSocialYoutube].map((s, i) => (
            <img key={i} src={s} alt="" loading="lazy" style={{ width: 33, height: 33, cursor: "pointer", transition: "transform 0.2s", opacity: 0.8 }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")} />
          ))}
        </div>
      </div>

      <div className="ersa-footer-spacer" />

      <div>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: "0 0 15px" }}>Home</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {["About", "Practice Areas", "Experience"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#fff", textDecoration: "none", lineHeight: "24px", transition: "opacity 0.2s", opacity: 0.8 }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}>{l}</a>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: "0 0 15px" }}>Contact</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: imgFooterPhone,   text: "+91 00000 00000" },
            { icon: imgFooterAddress, text: "Chennai, Tamil Nadu, India" },
            { icon: imgFooterEmail,   text: "contact@ersalegal.com" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <img src={icon} alt="" loading="lazy" style={{ width: 16, height: 16, marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15, color: "#fff", lineHeight: "24px" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", margin: "0 0 0" }} />
    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15, color: "#fff", textAlign: "center", padding: "20px 0", margin: 0 }}>
      © 2025 ERSA Legal. All rights reserved.
    </p>
  </footer>
  );
});
Footer.displayName = "Footer";

// ─── Root ─────────────────────────────────────────────────────────────────────
const ERSALegalClaude: React.FC = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <NavBar />
      <div style={{ paddingTop: 84 }}>
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <ContactSection />
        <DisclaimerSection />
        <PaymentSection />
        <Footer />
      </div>
    </div>
  );
};

export default ERSALegalClaude;