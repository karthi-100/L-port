import React, { memo } from "react";
import Logo from "../../assets/ERSALogo.svg";
import IconLinkedIn from "../../assets/icon-linkedin.svg";
import IconPhone from "../../assets/icon-phone.svg";
import IconLocation from "../../assets/icon-location.svg";
import IconMail from "../../assets/icon-mail.svg";
import IconMakePayment from "../../assets/icon-make-payment.svg";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface FooterLink {
  label: string;
  onClick?: () => void;
}

interface FooterProps {
  links?: FooterLink[];
  showPayment?: boolean;
  onOpenPayment?: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

const contactInfo = [
  { icon: IconPhone, text: "+91 9791100250" },
  { icon: IconLocation, text: "119/121 Chamiers Road RA Puram, Chennai 600028" },
  { icon: IconMail, text: "contact@ersa.legal" },
];

const defaultFooterLinks: FooterLink[] = [
  { label: "About" },
  { label: "Practice Areas" },
  { label: "Experience" },
];

const Footer: React.FC<FooterProps> = memo(({
  links = defaultFooterLinks,
  showPayment = false,
  onOpenPayment,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <footer ref={ref} className={`ersa-footer scroll-animate ${visible ? "visible" : ""}`}>
      <div className="ersa-footer-grid">
        <div className="ersa-footer-logo-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#fff", borderRadius: 7, width: 108, height: 65, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img src={Logo} alt="ERSA Legal" loading="lazy" style={{ width: 92, height: 62, objectFit: "contain", mixBlendMode: "darken" }} />
          </div>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: 0 }}>Visit us</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="https://www.linkedin.com/in/vidyeshv" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: "inline-block" }}>
              <img src={IconLinkedIn} alt="LinkedIn" loading="lazy" style={{ width: 33, height: 33, cursor: "pointer", transition: "opacity 0.2s", opacity: 0.8 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")} />
            </a>
          </div>
        </div>

        <div className="ersa-footer-spacer" />

        <div>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: "0 0 15px" }}>Home</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {links.map(({ label, onClick }) => (
              <a key={label} onClick={onClick} style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#fff", textDecoration: "none", lineHeight: "24px", cursor: "pointer",
                transition: "opacity 0.2s", opacity: 0.8,
              }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}>{label}</a>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: "0 0 15px" }}>Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {contactInfo.map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <img src={icon} alt="" loading="lazy" style={{ width: 16, height: 16, marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15, color: "#fff", lineHeight: "24px", maxWidth: 260 }}>{text}</span>
              </div>
            ))}
          </div>
          {showPayment && (
            <button style={{
              marginTop: 24, width: "100%", justifyContent: "center",
              background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", cursor: "pointer",
              padding: "14px 24px", fontFamily: "'Manrope', sans-serif",
              fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 12,
              transition: "background 0.2s, border-color 0.2s", borderRadius: 4,
            }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }} onClick={onOpenPayment}>
              Make Payment <img src={IconMakePayment} alt="" loading="lazy" style={{ width: 17, height: 12 }} />
            </button>
          )}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} />
      <div className="ersa-footer-bottom" style={{ padding: "20px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {(onOpenTerms || onOpenPrivacy) && (
          <div style={{ display: "flex", gap: 24, marginBottom: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {onOpenTerms && (
              <button onClick={onOpenTerms} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Manrope', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)",
                textDecoration: "underline", transition: "color 0.2s", padding: 0,
              }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>Terms of Use</button>
            )}
            {onOpenPrivacy && (
              <button onClick={onOpenPrivacy} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Manrope', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)",
                textDecoration: "underline", transition: "color 0.2s", padding: 0,
              }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>Privacy Policy</button>
            )}
          </div>
        )}
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15, color: "#fff", margin: 0 }}>
          © 2026 ERSA Legal. All rights reserved.
        </p>
      </div>
    </footer>
  );
});
Footer.displayName = "Footer";

export default Footer;