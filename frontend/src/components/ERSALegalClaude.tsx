import React, { useState, memo } from "react";
import emailjs from '@emailjs/browser';
import Icon1 from "../assets/Icon-1.svg";
import Icon2 from "../assets/Icon-2.svg";
import Icon3 from "../assets/Icon-3.svg";
import Icon4 from "../assets/Icon-4.svg";
import Icon5 from "../assets/Icon-5.svg";
import Icon6 from "../assets/Icon-6.svg";
import IconArrowSubmit from "../assets/icon-submit.svg";
import IconBlueArrow from "../assets/icon-blue-arrow.svg";
import IconGoldArrow from "../assets/icon-gold-arrow.svg";
import IconHealthcare from "../assets/Icon-healthcare.svg";
import IconArrowDown from "../assets/icon-arrow-down.svg";
import IconDisclaimer from "../assets/icon-disclaimer-icon.svg";
import { ExpertiseModal, type ExpertiseDetails } from "./ExpertiseModal";
import { PaymentModal } from "./PaymentModal";
import { TermsModal } from "./TermsModal";
import LawLibrary from "../assets/law-library.png"
import AboutImage from "../assets/about-image.jpeg"
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import ChatWidget from "./shared/ChatWidget";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const imgLawLibrary = LawLibrary;
const imgPortrait = AboutImage;
const imgIconDispute = Icon1;
const imgArrowBtn = IconBlueArrow;
const imgIconCorporate = Icon2;
const imgIconIntl = Icon3;
const imgIconCustoms = Icon4;
const imgIconIP = Icon5;
const imgIconRealEstate = Icon6;
const imgIconHealthcare = IconHealthcare;
const imgArrowHealthcareGold = IconGoldArrow;
const imgSelectArrow = IconArrowDown;
const imgArrowSubmit = IconArrowSubmit;
const imgIconDisclaimerLabel = IconDisclaimer;

// ─── Hero (Original Layout) ─────────────────────────────────────────────────────
const HeroSection: React.FC = memo(() => {
  const w = useWindowWidth();
  const mobile = w <= 768;
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="hero" ref={ref} className="ersa-hero">
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

        <p className="ersa-eyebrow">The Principal Jurist</p>

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
          <button className="ersa-btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: "17px 32px", letterSpacing: "1.4px" }}>Book Consultation</button>
          <button className="ersa-btn-outline" onClick={() => document.getElementById('practice')?.scrollIntoView({ behavior: 'smooth' })}>View Services</button>
        </div>
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection";

// ─── Practice Areas ───────────────────────────────────────────────────────────
const practiceCards = [
  {
    icon: imgIconDispute,
    title: "Dispute Resolution & Litigation",
    desc: "Representation in civil, commercial, writ, and arbitration matters before the High Courts and other forums, including complex disputes.",
    details: {
      fullDesc: "Providing comprehensive representation in complex legal disputes before diverse judicial and quasi-judicial forums. Our approach combines meticulous legal research with strategic advocacy to protect client interests across civil, commercial, and writ matters.",
      scopeOfWork: [
        "Civil & Commercial Litigation",
        "High Court & Trial Court Representation",
        "Arbitration (Domestic & International)",
        "Writ Petitions & Constitutional Matters",
        "Debt Recovery & Insolvency Proceedings",
        "Mediation & Settlement Negotiations"
      ]
    }
  },
  {
    icon: imgIconCorporate,
    title: "Corporate & Commercial Advisory",
    desc: "Advising on contracts, business arrangements, structuring, and legal risk across commercial operations.",
    details: {
      fullDesc: "Advising businesses on critical legal frameworks to ensure operational continuity and risk mitigation. We handle the intricacies of corporate governance, business structuring, and commercial contractual obligations with a focus on long-term scalability.",
      scopeOfWork: [
        "Business Entity Formation & Structuring",
        "Corporate Governance & Compliance",
        "Joint Ventures & Strategic Alliances",
        "Contractual Drafting & Negotiations",
        "Mergers & Acquisitions Support",
        "Employment Law & Policy Frameworks"
      ]
    }
  },
  {
    icon: imgIconIntl,
    title: "International & Cross-Border",
    desc: "Advising clients on legal and regulatory issues involving India and international jurisdictions, including structuring and compliance.",
    details: {
      fullDesc: "Navigating the complexities of multi-jurisdictional legal environments. We assist foreign entities entering the Indian market and Indian businesses expanding globally, ensuring compliance with international treaties and local regulations.",
      scopeOfWork: [
        "Cross-Border Contractual Advisory",
        "Foreign Direct Investment (FDI) Compliance",
        "Multi-jurisdictional Dispute Management",
        "Inbound & Outbound Investment Support",
        "International Trade Agreements",
        "Liaison with Regulatory Authorities"
      ]
    }
  },
  {
    icon: imgIconCustoms,
    title: "Customs and Taxation",
    desc: "Advisory and disputes relating to Customs, Central Excise, GST, taxation matters, and foreign trade compliance.",
    details: {
      fullDesc: "Strategic advisory on indirect taxation and foreign trade policies. We help clients navigate the evolving landscape of GST, Customs, and Central Excise while managing compliance and representing them in tax-related disputes.",
      scopeOfWork: [
        "Customs Duty & Tariff Advisory",
        "Foreign Trade Policy (FTP) Advisory",
        "Tax Litigation & Appeals",
        "GST Compliance & Strategy",
        "Export-Import (EXIM) Documentation",
        "SEZ & EOU Regulatory Compliance"
      ]
    }
  },
  {
    icon: imgIconIP,
    title: "Intellectual Property",
    desc: "Intellectual property matters across patents, trademarks, and copyrights, including registration, enforcement, and disputes.",
    details: {
      fullDesc: "Protecting and leveraging intellectual assets in a competitive global economy. From registration to enforcement, we provide end-to-end IP services designed to safeguard your innovations and brand identity.",
      scopeOfWork: [
        "Trademark Registration & Prosecution",
        "Copyright Protection & Licensing",
        "IP Litigation & Anti-counterfeiting",
        "Patent Filing & Strategy",
        "IP Portfolio Management",
        "Technology Transfer Agreements"
      ]
    }
  },
  {
    icon: imgIconRealEstate,
    title: "Real Estate",
    desc: "Advising on property transactions, due diligence, development arrangements, succession planning, and estate matters.",
    details: {
      fullDesc: "Providing legal clarity for complex property transactions and private wealth management. We offer rigorous due diligence and succession planning services for both corporate entities and high-net-worth individuals.",
      scopeOfWork: [
        "Property Due Diligence & Title Searches",
        "Development & Lease Agreements",
        "Will Drafting & Probate Services",
        "Real Estate Transaction Advisory",
        "Succession Planning & Estate Matters",
        "Family Settlement & Trust Advisory"
      ]
    }
  },
];

const healthcareDetails = {
  fullDesc: "Navigating the specialized regulatory environments of healthcare and life sciences. We advise on compliance with biomedical laws, drug regulations, and food safety standards to ensure market readiness and operational legality.",
  scopeOfWork: [
    "Biomedical & Clinical Trial Regulations",
    "Healthcare Service Agreements",
    "Product Liability & Risk Mitigation",
    "Drug & Cosmetic Act Compliance",
    "FSSAI Regulatory Advisory",
    "Tele-medicine & Digital Health Compliance"
  ]
};

const PracticeAreasSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseDetails | null>(null);
  return (
    <section id="practice" ref={ref} className="ersa-practice-section">
      <p className={`ersa-eyebrow scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "left" }}>Our Expertise</p>
      <h2 className={`ersa-h2 scroll-animate ${visible ? "visible" : ""}`} style={{ textAlign: "left", transitionDelay: "0.1s" }}>Strategic Practice Areas</h2>

      <div className="ersa-practice-grid">
        {practiceCards.map(({ icon, title, desc, details }, index) => (
          <div key={index} className={`ersa-practice-card scroll-animate ${visible ? "visible" : ""}`} style={{ transitionDelay: `${0.15 + index * 0.1}s`, textAlign: "left", cursor: "pointer" }} onClick={() => setSelectedExpertise({ icon, title, ...details })}>
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

        <div className={`ersa-practice-wide scroll-animate ${visible ? "visible" : ""}`} style={{ background: "#00113a", padding: 40, display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden", cursor: "pointer", transitionDelay: "0.7s" }} onClick={() => setSelectedExpertise({ icon: imgIconHealthcare, title: "Healthcare, Life Sciences & Food Regulation", ...healthcareDetails })}>
          <img src={imgIconHealthcare} alt="" loading="lazy" style={{ position: "absolute", bottom: -37, right: -37, width: 203, height: 197, opacity: 0.1 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 8 }}>
            <img src={imgIconHealthcare} alt="" loading="lazy" style={{ height: 28, width: "auto" }} />
          </div>
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 30, color: "#fff", lineHeight: "36px", margin: 0 }}>Healthcare, Life Sciences & Food Regulation</h3>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: "26px", margin: 0, maxWidth: 672 }}>
            Advising on biomedical laws, healthcare arrangements, food and drug compliance, and related regulatory matters in evolving markets.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, color: "#ffdea5", letterSpacing: "1.2px", textTransform: "uppercase" }}>Explore Service</span>
            <img src={imgArrowHealthcareGold} alt="" loading="lazy" style={{ width: 9, height: 9 }} />
          </div>
        </div>
      </div>

      <ExpertiseModal isOpen={!!selectedExpertise} onClose={() => setSelectedExpertise(null)} data={selectedExpertise} />
    </section>
  );
});
PracticeAreasSection.displayName = "PracticeAreasSection";

// ─── About ────────────────────────────────────────────────────────────────────
const AboutSection: React.FC = memo(() => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section id="about" ref={ref} className="ersa-about-section">
      <div className="ersa-about-grid">
        <div className={`scroll-animate ${visible ? "visible" : ""}`}>
          <p className="ersa-eyebrow ersa-eyebrow-wide" style={{ margin: "0 0 32px" }}>Premier Legal Counsel</p>
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
    <section id="contact" ref={ref} className="ersa-contact-section">
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
                {["Dispute Resolution & Litigation", "Corporate & Commercial Advisory", "International & Cross-Border", "Customs and Taxation", "Intellectual Property", "Real Estate", "Healthcare, Life Sciences & Food Regulation", "Others"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <img src={imgSelectArrow} alt="" loading="lazy" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, pointerEvents: "none" }} />
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
                <>Submit Enquiry <img src={imgArrowSubmit} alt="" loading="lazy" style={{ width: 10, height: 8 }} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}); ContactSection.displayName = "ContactSection";

// ─── Disclaimer Banner ────────────────────────────────────────────────────────
const DISCLAIMER_KEY = "ersa_disclaimer_consent";

const DisclaimerBanner: React.FC = memo(() => {
  const [visible, setVisible] = useState<boolean>(() => {
    try { return !localStorage.getItem(DISCLAIMER_KEY); } catch { return true; }
  });

  const handleConsent = (accepted: boolean) => {
    try { localStorage.setItem(DISCLAIMER_KEY, accepted ? "accepted" : "rejected"); } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="ersa-disclaimer-banner" role="dialog" aria-modal="true" aria-label="Disclaimer">
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1, minWidth: 0 }}>
        <img src={imgIconDisclaimerLabel} alt="" loading="lazy" className="ersa-disclaimer-icon"
          style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2, opacity: 0.7 }} />
        <div>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 14, fontStyle: "italic", color: "rgba(255,255,255,0.65)", margin: "0 0 4px", letterSpacing: "0.3px" }}>Disclaimer</p>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: "20px", margin: 0 }}>
            As per the rules of the Bar Council of India, advocates are not permitted to solicit work or advertise.
            This website is provided for informational purposes only and does not constitute legal advice.
            By accessing this website, you acknowledge that you are seeking information about ERSA Legal of your own
            accord and that no solicitation or advertisement has been made.
          </p>
        </div>
      </div>
      <div className="ersa-disclaimer-banner-btns">
        <button onClick={() => handleConsent(true)} style={{
          background: "#ffdea5", color: "#00113a", border: "1px solid #ffdea5", cursor: "pointer",
          padding: "10px 28px", fontFamily: "'Manrope', sans-serif", fontSize: 13,
          letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 700, borderRadius: 3,
          transition: "all 0.2s", whiteSpace: "nowrap",
        }} onMouseEnter={(e) => { e.currentTarget.style.background = "#ffe8bc"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#ffdea5"; }}>Accept</button>
      </div>
    </div>
  );
});
DisclaimerBanner.displayName = "DisclaimerBanner";

// ─── Root ─────────────────────────────────────────────────────────────────────
const ERSALegalClaude: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsInitialTab, setTermsInitialTab] = useState<"terms" | "privacy">("terms");

  const openTerms = () => { setTermsInitialTab("terms"); setIsTermsModalOpen(true); };
  const openPrivacy = () => { setTermsInitialTab("privacy"); setIsTermsModalOpen(true); };

  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      <div>
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <ContactSection />
        <Footer
          showPayment
          onOpenPayment={() => setIsPaymentModalOpen(true)}
          onOpenTerms={openTerms}
          onOpenPrivacy={openPrivacy}
        />
      </div>
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} initialTab={termsInitialTab} />
      <DisclaimerBanner />
      <ChatWidget />
    </div>
  );
};

export default ERSALegalClaude;