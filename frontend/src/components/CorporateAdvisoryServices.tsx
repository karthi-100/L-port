import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import IconArrowSubmit from "../assets/icon-submit.svg";
import IconArrowDown from "../assets/icon-arrow-down.svg";
import HeroImage from "../assets/corporate-hero-7677e7.png";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import ChatWidget from "./shared/ChatWidget";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import CC1Icon from "../assets/cc-1.svg";
import CC2Icon from "../assets/cc-2.svg";
import CC3Icon from "../assets/cc-3.svg";
import CC4Icon from "../assets/cc-4.svg";
import CC5Icon from "../assets/cc-5.svg";
import CC6Icon from "../assets/cc-6.svg";

const serviceCards = [
  {
    icon: CC1Icon,
    title: "India Market Entry",
    desc: "Guidance on legal and regulatory considerations for businesses establishing or expanding operations in India."
  },
  {
    icon: CC2Icon,
    title: "Commercial Contracts",
    desc: "Drafting, review, negotiation, and risk assessment of business agreements and commercial arrangements."
  },
  {
    icon: CC3Icon,
    title: "Startup Advisory",
    desc: "Supporting founders with legal structuring, shareholder arrangements, founder documentation, and governance matters."
  },
  {
    icon: CC4Icon,
    title: "Business Disputes",
    desc: "Advisory relating to shareholder disputes, contractual disputes, recovery actions, and commercial conflicts."
  },
  {
    icon: CC5Icon,
    title: "Cross-Border Transactions",
    desc: "Advising on contracts, commercial relationships, and transactions involving parties across multiple jurisdictions."
  },
  {
    icon: CC6Icon,
    title: "Customs, Trade & Tax Advisory",
    desc: "Advising on customs, foreign trade, import-export issues, DGFT matters, GST disputes, tax demands, and related regulatory proceedings."
  }
];

// ─── Hero ──────────────────────────────────────────────────
const HeroSectionCA: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section className="ca-hero-section">
      <div ref={ref} className={`ca-hero-inner scroll-animate ${visible ? "visible" : ""}`}>
        <div className="ca-hero-col-left">
          <h1 className="ca-hero-h1">
            Strategic Legal Solutions for<br />
            Your Business in India.
          </h1>

          <p className="ca-hero-p">
            Advising businesses, founders, investors, and overseas enterprises on commercial transactions, India-related legal requirements, contracts, and business operations with absolute precision and trust.
          </p>

          <div className="ca-hero-btns">
            <button className="ersa-btn-gold"
              onClick={() => document.getElementById('ca-contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Legal Consultation
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ display: "inline" }}>
                <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="ersa-btn-outline"
              onClick={() => document.getElementById('ca-services')?.scrollIntoView({ behavior: 'smooth' })}>Explore Our Services</button>
          </div>
        </div>

        <div className="ca-hero-col-right">
          <img src={HeroImage} alt="Corporate Advisory" loading="lazy" />
        </div>
      </div>
    </section>
  );
});
HeroSectionCA.displayName = "HeroSectionCA";

// ─── Services ──────────────────────────────────────────────
const ServicesSectionCA: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section id="ca-services" className="ca-services-section">
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 38, marginTop: 24 }}>
          <h2 className="ersa-h2">Expert Property Services</h2>
          <p className="ersa-body" style={{ maxWidth: 672, margin: "0 auto" }}>
            Comprehensive legal solutions tailored for overseas property owners, ensuring security and compliance
            without the need for international travel.
          </p>
        </div>

        <div className="ca-services-grid">
          {serviceCards.map((s, i) => (
            <div key={i} className={`ca-service-card scroll-animate ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
                <img src={s.icon} alt={s.title} style={{ height: 28, width: "auto", alignSelf:"flex-start" }} />
              <h3 className="ca-service-card-title">{s.title}</h3>
              <p className="ca-service-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
ServicesSectionCA.displayName = "ServicesSectionCA";

// ─── Contact ──────────────────────────────────────────────
const ContactSectionCA: React.FC = memo(() => {
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
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      alert('Email service not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your env.');
      return;
    }

    setIsSubmitting(true);
    try {
      const templateParams = {
        name: fullName,
        contactNumber: mobile,
        location: locationField,
        email: emailField,
        areaintrest: practiceArea,
        message: messageField,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      alert('Enquiry submitted successfully!');
      setFullName(""); setMobile(""); setLocationField(""); setEmailField(""); setPracticeArea(""); setMessageField("");
    } catch (err) {
      console.error('EmailJS error', err);
      alert('Failed to send enquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const input = "ersa-input";
  const lbl = "ersa-label";

  return (
    <section id="ca-contact" ref={ref} className="ca-contact-section">
      <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="ersa-eyebrow ersa-eyebrow-wide">Direct Communication</p>
        <h2 className="ersa-h2">Inquiry & Consultation</h2>
        <p className="ersa-body" style={{ maxWidth: 570, margin: "0 auto" }}>
          Please provide your details below for a structured response to your legal requirements.
        </p>
      </div>
      <div className={`ersa-form-card scroll-animate ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
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
                {["India Market Entry", "Commercial Contracts", "Startup Advisory", "Business Disputes", "Cross-Border Transactions", "Customs, Trade & Tax Advisory", "Others"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <img src={IconArrowDown} alt="" loading="lazy" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, pointerEvents: "none" }} />
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
                <>Submit Enquiry <img src={IconArrowSubmit} alt="" loading="lazy" style={{ width: 10, height: 8 }} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
ContactSectionCA.displayName = "ContactSectionCA";

// ─── Root ──────────────────────────────────────────────────
const CorporateAdvisoryServices: React.FC = () => {
  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", onClick: () => navigate("/") },
    {
      label: "Services",
      dropdown: [
        { label: "Property Services", href: "/nri-property-services" },
        { label: "Intellectual Property", href: "/intellectual-property" },
        { label: "Corporate Advisory", href: "/corporate-advisory" },
      ],
    },
  ];
  const footerLinks = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Services", onClick: () => navigate("/corporate-advisory") },
  ];

  return (
    <div style={{ width: "100%" }}>
      <NavBar links={navLinks} ctaLabel="Book Consultation" onCtaClick={() => document.getElementById('ca-contact')?.scrollIntoView({ behavior: 'smooth' })} />
      <HeroSectionCA />
      <ServicesSectionCA />
      <ContactSectionCA />
      <Footer links={footerLinks} showServiceLinks={false} showPayment={true} />
      <ChatWidget />
    </div>
  );
};

export default CorporateAdvisoryServices;