import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import IconArrowSubmit from "../assets/icon-submit.svg";
import IconArrowDown from "../assets/icon-arrow-down.svg";
import HeroIllustration from "../assets/hero-illustration.png";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import ChatWidget from "./shared/ChatWidget";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import NRIIcon1 from "../assets/nri-icon-1.svg";
import NRIIcon2 from "../assets/nri-icon-2.svg";
import NRIIcon3 from "../assets/nri-icon-3.svg";
import NRIIcon4 from "../assets/nri-icon-4.svg";
import NRIIcon5 from "../assets/nri-icon-5.svg";
import NRIIcon6 from "../assets/nri-icon-6.svg";

const HeroSectionNRI: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section className="nri-hero-section">
      <div ref={ref} className={`nri-hero-inner scroll-animate ${visible ? "visible" : ""}`}>
        {/* Left column */}
        <div className="nri-hero-col-left">
          <div className="nri-hero-badge">
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
              <path d="M5.5 0L6.74 4.26L11 5.5L6.74 6.74L5.5 11L4.26 6.74L0 5.5L4.26 4.26L5.5 0Z" fill="var(--color-accent)"/>
            </svg>
            <span className="nri-hero-badge-text">Sovereign NRI Legal Assistance</span>
          </div>

          <h1 className="nri-hero-h1">
            Your Trusted Legal<br />
            Representation for <span className="nri-hero-accent">Indian</span><br />
            <span className="nri-hero-accent">Property Assets.</span>
          </h1>

          <p className="nri-hero-p">
            Helping individuals, corporates, families, NRIs, and overseas clients navigate property ownership, transfers, inheritance, and real estate transactions in India. The practice focuses on protecting property rights through structured due diligence, documentation, and legal advisory.
          </p>

          <div className="nri-hero-btns">
            <button className="ersa-btn-gold"
              onClick={() => document.getElementById('nri-contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Legal Consultation
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ display: "inline" }}>
                <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="ersa-btn-outline"
              onClick={() => document.getElementById('nri-services')?.scrollIntoView({ behavior: 'smooth' })}>Explore Our Services</button>
          </div>
        </div>

        {/* Right column */}
        <div className="nri-hero-col-right">
          <img src={HeroIllustration} alt="Legal Illustration" loading="lazy" />
        </div>
      </div>
    </section>
  );
});
HeroSectionNRI.displayName = "HeroSectionNRI";

const services = [
  {
    icon: NRIIcon1,
    title: "Property Due Diligence",
    desc: "Reviewing title documents, revenue records, encumbrances, and ownership history before acquisition or investment."
  },
  {
    icon: NRIIcon2,
    title: "NRI Property Matters",
    desc: "Advising overseas clients on acquisition, management, transfer, and disposal of property in India."
  },
  {
    icon: NRIIcon3,
    title: "Inheritance & Succession",
    desc: "Assistance relating to succession, legal heirship, family settlements, wills, and transfer of inherited assets."
  },
  {
    icon: NRIIcon4,
    title: "Property Documentation & Registration",
    desc: "Review and preparation of sale deeds, gift deeds, settlement deeds, powers of attorney, and related documentation."
  },
  {
    icon: NRIIcon5,
    title: "Real Estate Disputes",
    desc: "Advisory and representation relating to title disputes, easements, possession issues, and ownership claims."
  },
  {
    icon: NRIIcon6,
    title: "Development & Regulatory Approvals",
    desc: "Advising on CMDA, DTCP, RERA, joint development arrangements, and regulatory issues affecting real estate projects."
  }
];

const ServicesSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section id="nri-services" style={{ background: "var(--color-bg-alt)", padding: "80px 104px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48, marginTop: 24 }}>
          <h2 className="ersa-h2">Expert Property Services</h2>
          <p className="ersa-body" style={{ fontSize: 16, lineHeight: "24px", maxWidth: 672, margin: "0 auto" }}>
            Comprehensive legal solutions tailored for overseas property owners, ensuring security and compliance
            without the need for international travel.
          </p>
        </div>

        <div className="ersa-practice-grid">
          {services.map((s, i) => (
            <div key={i} className={`ersa-practice-card scroll-animate ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s`, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 8 }}>
                <img src={s.icon} alt={s.title} style={{ height: 28, width: "auto" }} />
              </div>
              <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 24, color: "#00113a", lineHeight: "32px", margin: 0, textAlign: "left" }}>{s.title}</h3>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: "#444650", lineHeight: "22.75px", margin: 0, flexGrow: 1 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
ServicesSection.displayName = "ServicesSection";

const ContactSectionNRI: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [locationField, setLocationField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [messageField, setMessageField] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Enquiry submitted successfully!');
      setFullName(""); setMobile(""); setLocationField(""); setEmailField(""); setPracticeArea(""); setMessageField("");
      setIsSubmitting(false);
    }, 1000);
  };

  const input = "ersa-input";
  const lbl = "ersa-label";

  return (
    <section id="nri-contact" ref={ref} style={{ background: "#fff", padding: "80px 24px" }}>
      <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="ersa-eyebrow ersa-eyebrow-wide" style={{ textAlign: "center" }}>Direct Communication</p>
        <h2 className="ersa-h2">Inquiry & Consultation</h2>
        <p className="ersa-body" style={{ maxWidth: 570, margin: "0 auto" }}>
          Please provide your details below for a structured response to your legal requirements.
        </p>
      </div>
      <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{
        maxWidth: 896, margin: "0 auto", background: "#fff",
        border: "1px solid rgba(197,198,210,0.2)", boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        padding: 49, transitionDelay: "0.2s",
      }}>
        <div className="ersa-form-grid">
          <div><label className={lbl}>Full Name</label><input className={input} type="text" placeholder="Your full legal name" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
          <div><label className={lbl}>Mobile Number</label><input className={input} type="tel" placeholder="+91 00000 00000" value={mobile} onChange={(e) => setMobile(e.target.value)} /></div>
          <div><label className={lbl}>Location</label><input className={input} type="text" placeholder="City, Country" value={locationField} onChange={(e) => setLocationField(e.target.value)} /></div>
          <div><label className={lbl}>Email ID</label><input className={input} type="email" placeholder="email@example.com" value={emailField} onChange={(e) => setEmailField(e.target.value)} /></div>

          <div className="ersa-form-full">
            <label className={lbl}>Practice Area of Interest</label>
            <div style={{ position: "relative" }}>
              <select className={input} style={{ appearance: "none", paddingRight: 40, cursor: "pointer" }} value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)}>
                <option value="">Select an option</option>
                {["Property Due Diligence", "Property Sale & Transfer Support", "Succession & Inheritance Assistance", "Property Dispute Management", "Legal Documentation & Notices", "Representation & Coordination in India", "Others"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <img src={IconArrowDown} alt="" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, pointerEvents: "none" }} />
            </div>
          </div>

          <div className="ersa-form-full">
            <label className={lbl}>Message / Enquiry</label>
            <textarea className={input} placeholder="Describe the nature of your inquiry in detail..." rows={4}
              style={{ resize: "none", paddingTop: 12, lineHeight: "24px" }} value={messageField} onChange={(e) => setMessageField(e.target.value)} />
          </div>

          <div className="ersa-form-full" style={{ paddingTop: 24 }}>
            <button className="ersa-btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <><span className="ersa-spinner" /> Submitting...</>
              ) : (
                <>Submit Enquiry <img src={IconArrowSubmit} alt="" style={{ width: 10, height: 8 }} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
ContactSectionNRI.displayName = "ContactSectionNRI";

const NRIPropertyServices: React.FC = () => {
  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", onClick: () => navigate("/") },
    {
      label: "Service",
      dropdown: [
        { label: "NRI Property Services", href: "/nri-property-services" },
        { label: "Intellectual Property", href: "/intellectual-property" },
        { label: "Corporate & Commercial", href: "/corporate-advisory" },
      ],
    },
  ];
  const footerLinks = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Service", onClick: () => navigate("/nri-property-services") },
  ];

  return (
    <div style={{ width: "100%" }}>
      <NavBar links={navLinks} ctaLabel="Book Consultancy" onCtaClick={() => document.getElementById('nri-contact')?.scrollIntoView({ behavior: 'smooth' })} />
      <HeroSectionNRI />
      <ServicesSection />
      <ContactSectionNRI />
      <Footer links={footerLinks} />
      <ChatWidget />
    </div>
  );
};

export default NRIPropertyServices;