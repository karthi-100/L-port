import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import IconArrowSubmit from "../assets/icon-submit.svg";
import IconArrowDown from "../assets/icon-arrow-down.svg";
import HeroIllustration from "../assets/ip-hero-illustration-56586a.png";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import ChatWidget from "./shared/ChatWidget";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import IPIcon1 from "../assets/ip-1.svg";
import IPIcon2 from "../assets/ip-2.svg";
import IPIcon3 from "../assets/ip-3.svg";
import IPIcon4 from "../assets/ip-4.svg";
import IPIcon5 from "../assets/ip-5.svg";
import IPIcon6 from "../assets/ip-6.svg";


const serviceCards = [
  {
    icon: IPIcon1,
    title: "Trademark Registration",
    desc: "Trademark searches, filing strategies, applications, and registration management."
  },
  {
    icon: IPIcon2,
    title: "Copyright Matters",
    desc: "Registration, ownership issues, licensing arrangements, and protection of creative works."
  },
  {
    icon: IPIcon3,
    title: "Brand Protection & Enforcement",
    desc: "Representation relating to examination reports, objections, oppositions, and related proceedings."
  },
  {
    icon: IPIcon4,
    title: "Patent & Design Matters",
    desc: "Advising on patent, industrial design, and related intellectual property issues through coordination with registered professionals where required."
  },
  {
    icon: IPIcon5,
    title: "Licensing & Assignments",
    desc: "Preparation and review of licensing agreements, assignments, coexistence arrangements, and related documentation."
  },
  {
    icon: IPIcon6,
    title: "Intellectual Property Disputes",
    desc: "Advisory and representation relating to infringement, ownership disputes, and enforcement of intellectual property rights."
  }
];

// ─── Hero ──────────────────────────────────────────────────
const HeroSectionIP: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section className="ip-hero-section">
      <div ref={ref} className={`ip-hero-inner scroll-animate ${visible ? "visible" : ""}`}>
        <div className="ip-hero-col-left">
          <h1 className="ip-hero-h1">
            Protect Your Brand's<br />
            Future in the Indian Market.
          </h1>

          <p className="ip-hero-p">
            Protecting intellectual property assets through registration, management, enforcement, and strategic advisory across trademarks, copyrights, and related rights.
          </p>

          <div className="ip-hero-btns">
            <button className="ersa-btn-gold"
              onClick={() => document.getElementById('ip-contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Free IP Strategy Call
            </button>
            <button className="ersa-btn-outline"
              onClick={() => document.getElementById('ip-services')?.scrollIntoView({ behavior: 'smooth' })}>View Our Services</button>
          </div>
        </div>

        <div className="ip-hero-col-right">
          <img src={HeroIllustration} alt="IP Protection Illustration" loading="lazy" />
        </div>
      </div>
    </section>
  );
});
HeroSectionIP.displayName = "HeroSectionIP";

// ─── Services ──────────────────────────────────────────────
const ServicesSectionIP: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section id="ip-services" className="ip-services-section">
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={`scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48, marginTop: 24 }}>
          <h2 className="ersa-h2">Intellectual Property Rights</h2>
          <p className="ersa-body" style={{ maxWidth: 672, margin: "0 auto" }}>
            Comprehensive legal solutions tailored for overseas property owners, ensuring security and compliance
            without the need for international travel.
          </p>
        </div>

        <div className="ersa-practice-grid">
          {serviceCards.map((s, i) => (
            <div key={i} className={`ip-service-card scroll-animate ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
                <img src={s.icon} alt={s.title} style={{ height: 28, width: "auto", alignSelf:"flex-start" }} />
              <h3 className="ip-service-card-title">{s.title}</h3>
              <p className="ip-service-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
ServicesSectionIP.displayName = "ServicesSectionIP";

// ─── CTA ──────────────────────────────────────────────────
const CTASectionIP: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section id="ip-cta" className="ip-cta-section">
      <div ref={ref} className={`scroll-animate ${visible ? "visible" : ""}`}>
        <h2 className="ip-cta-h2">Ready to secure your intellectual property?</h2>
        <p className="ip-cta-p">
          Join hundreds of successful brands that trust LexGuardian for their IP protection and enforcement needs.
        </p>
        <button className="ersa-btn-gold ip-cta-btn"
          onClick={() => document.getElementById('ip-contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Book a Free IP Strategy Call
        </button>
      </div>
    </section>
  );
});
CTASectionIP.displayName = "CTASectionIP";

// ─── Contact ──────────────────────────────────────────────
const ContactSectionIP: React.FC = memo(() => {
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
    <section id="ip-contact" ref={ref} className="ip-contact-section">
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
                {["Trademark Registration", "Copyright Matters", "Brand Protection & Enforcement", "Patent & Design Matters", "Licensing & Assignments", "Intellectual Property Disputes", "Others"].map(o => <option key={o} value={o}>{o}</option>)}
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
ContactSectionIP.displayName = "ContactSectionIP";

// ─── Root ──────────────────────────────────────────────────
const IntellectualPropertyServices: React.FC = () => {
  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", onClick: () => navigate("/") },
    {
      label: "Services",
      dropdown: [
        { label: "NRI Property Services", href: "/nri-property-services" },
        { label: "Intellectual Property", href: "/intellectual-property" },
        { label: "Corporate & Commercial", href: "/corporate-advisory" },
      ],
    },
  ];
  const footerLinks = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Services", onClick: () => navigate("/intellectual-property") },
  ];

  return (
    <div style={{ width: "100%" }}>
      <NavBar links={navLinks} ctaLabel="Book Consultation" onCtaClick={() => document.getElementById('ip-contact')?.scrollIntoView({ behavior: 'smooth' })} />
      <HeroSectionIP />
      <ServicesSectionIP />
      <CTASectionIP />
      <ContactSectionIP />
      <Footer links={footerLinks} />
      <ChatWidget />
    </div>
  );
};

export default IntellectualPropertyServices;