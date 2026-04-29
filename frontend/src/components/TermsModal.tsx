import React, { useEffect, useState } from "react";

type Tab = "terms" | "privacy";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: Tab;
}

const h4Style: React.CSSProperties = {
  color: "#00113a",
  margin: "20px 0 6px",
  fontFamily: "'Manrope', sans-serif",
  fontSize: "13px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontWeight: 700,
};

const pStyle: React.CSSProperties = {
  margin: "0 0 10px",
  lineHeight: "26px",
};

const ulStyle: React.CSSProperties = {
  paddingLeft: "20px",
  margin: "0 0 10px",
  lineHeight: "26px",
};

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, initialTab = "terms" }) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setActiveTab(initialTab);
      document.body.style.overflow = "hidden";
    } else {
      setShow(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, initialTab]);

  if (!isOpen && !show) return null;

  const tabBase: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "12px",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: 600,
    borderBottom: "2px solid transparent",
    background: "transparent",
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabBase,
    color: "#00113a",
    borderBottomColor: "#00113a",
  };

  const inactiveTabStyle: React.CSSProperties = {
    ...tabBase,
    color: "#888",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", opacity: show ? 1 : 0, transition: "opacity 0.3s ease",
      pointerEvents: show ? "auto" : "none",
    }}>
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,17,58,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      <div style={{
        position: "relative", background: "#fff", width: "100%", maxWidth: "820px",
        maxHeight: "90vh", borderRadius: "4px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        transform: show ? "translateY(0)" : "translateY(20px)",
        transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "28px 40px 0", flexShrink: 0 }}>
          <button onClick={onClose} style={{
            position: "absolute", top: "20px", right: "20px", background: "none", border: "none",
            cursor: "pointer", padding: "8px", opacity: 0.45, transition: "opacity 0.2s", display: "flex",
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.45"}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00113a" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <h3 style={{
            fontFamily: "'Newsreader', Georgia, serif", fontSize: "26px", color: "#00113a",
            lineHeight: "34px", margin: "0 0 20px", fontWeight: 400,
          }}>
            Legal Policies
          </h3>

          {/* Tab Bar */}
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e5e4e7" }}>
            <button
              style={activeTab === "terms" ? activeTabStyle : inactiveTabStyle}
              onClick={() => setActiveTab("terms")}
            >
              Terms of Use
            </button>
            <button
              style={activeTab === "privacy" ? activeTabStyle : inactiveTabStyle}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{
          overflowY: "auto", padding: "28px 40px 32px",
          fontFamily: "'Manrope', sans-serif", fontSize: "15px", color: "#444650",
          lineHeight: "26px", flex: 1,
        }}>

          {/* ── Terms of Use ── */}
          {activeTab === "terms" && (
            <div>
              <p style={pStyle}>
                By accessing or using this website (www.ersalegal.in), you agree to be bound by these Terms of Use.
              </p>

              <h4 style={h4Style}>1. Use of Website</h4>
              <p style={pStyle}>
                This website is made available for general informational purposes only. Accessing or using this website,
                including submitting any information through it, does not create any legal or professional relationship.
              </p>

              <h4 style={h4Style}>2. Nature of Content</h4>
              <p style={pStyle}>
                All content on this website is provided on an "as is" basis. While reasonable care is taken in preparing
                the material, no representation or warranty is made as to its accuracy, completeness, or timeliness.
              </p>

              <h4 style={h4Style}>3. No Liability</h4>
              <p style={pStyle}>
                To the fullest extent permitted by law, ERSA Legal shall not be liable for any loss or damage arising from:
              </p>
              <ul style={ulStyle}>
                <li>reliance on or use of the information on this website</li>
                <li>any errors, omissions, or inaccuracies in content</li>
                <li>delays, interruptions, or failures in access</li>
                <li>transmission issues or loss of data</li>
              </ul>
              <p style={pStyle}>This limitation applies regardless of the cause, including negligence or otherwise.</p>

              <h4 style={h4Style}>4. User Conduct and Restrictions</h4>
              <p style={pStyle}>Users shall not:</p>
              <ul style={ulStyle}>
                <li>copy, reproduce, modify, distribute, or republish any content without prior written permission</li>
                <li>use content out of context or in a misleading manner</li>
                <li>attempt to interfere with the functioning or security of the website</li>
              </ul>

              <h4 style={h4Style}>5. Intellectual Property</h4>
              <p style={pStyle}>
                All content on this website, including text, design, layout, and branding, is the intellectual property
                of ERSA Legal and is protected under applicable copyright and intellectual property laws.
              </p>
              <p style={pStyle}>
                Certain names, marks, or elements may also be protected as trademarks. Unauthorised use of any
                intellectual property is strictly prohibited.
              </p>

              <h4 style={h4Style}>6. Third-Party Links</h4>
              <p style={pStyle}>
                This website may contain links to third-party websites for convenience. ERSA Legal does not control,
                endorse, or assume responsibility for the content or practices of such websites.
              </p>

              <h4 style={h4Style}>7. Indemnity</h4>
              <p style={pStyle}>
                You agree to indemnify and hold harmless ERSA Legal from and against any claims, liabilities, damages,
                or expenses arising from your use of this website or violation of these Terms.
              </p>

              <h4 style={h4Style}>8. Right to Modify Website and Content</h4>
              <p style={pStyle}>
                ERSA Legal reserves the right to modify, update, suspend, or remove any part of this website, including
                its content, at any time without prior notice.
              </p>

              <h4 style={h4Style}>9. Access from Outside India</h4>
              <p style={pStyle}>
                Users accessing this website from outside India do so at their own initiative and are responsible for
                compliance with applicable local laws and regulations.
              </p>

              <h4 style={h4Style}>10. Termination of Access</h4>
              <p style={pStyle}>
                ERSA Legal reserves the right to restrict, suspend, or terminate access to this website at any time,
                without notice, for any reason.
              </p>

              <h4 style={h4Style}>11. Governing Law and Jurisdiction</h4>
              <p style={pStyle}>
                These Terms of Use shall be governed by the laws of India. Any disputes arising out of or in connection
                with these Terms shall be subject to the exclusive jurisdiction of the courts in Chennai.
              </p>
            </div>
          )}

          {/* ── Privacy Policy ── */}
          {activeTab === "privacy" && (
            <div>
              <p style={pStyle}>
                ERSA Legal is committed to handling personal information in a responsible and secure manner.
              </p>

              <h4 style={h4Style}>1. Information Collected</h4>
              <p style={pStyle}>We may collect personal information provided by you, including:</p>
              <ul style={ulStyle}>
                <li>name, email address, and contact details</li>
                <li>identification details (including Aadhaar, where required for specific matters)</li>
                <li>information submitted through forms, communications, or document uploads</li>
              </ul>
              <p style={pStyle}>
                Information is collected on a case-by-case basis depending on the nature of the interaction or services
                requested.
              </p>

              <h4 style={h4Style}>2. Use of Information</h4>
              <p style={pStyle}>Information collected may be used for:</p>
              <ul style={ulStyle}>
                <li>managing communications and responding to enquiries</li>
                <li>facilitating consultations and legal services</li>
                <li>maintaining records and internal administration</li>
                <li>compliance with applicable legal and regulatory requirements</li>
              </ul>

              <h4 style={h4Style}>3. Disclosure of Information</h4>
              <p style={pStyle}>Personal information may be disclosed:</p>
              <ul style={ulStyle}>
                <li>where required by law or regulatory authorities</li>
                <li>to service providers (including payment processors or technical providers) strictly for operational purposes</li>
              </ul>
              <p style={pStyle}>We do not sell or commercially exploit personal information.</p>

              <h4 style={h4Style}>4. Data Security</h4>
              <p style={pStyle}>
                Reasonable technical and organizational measures are adopted to safeguard personal information against
                unauthorized access, misuse, or disclosure.
              </p>

              <h4 style={h4Style}>5. Data Retention</h4>
              <p style={pStyle}>
                Information is retained only for as long as necessary for the purposes for which it is collected, or as
                required under applicable law.
              </p>

              <h4 style={h4Style}>6. User Rights</h4>
              <p style={pStyle}>
                You may request access to, correction of, or deletion of your personal information by contacting us,
                subject to applicable legal obligations.
              </p>

              <h4 style={h4Style}>7. Cookies</h4>
              <p style={pStyle}>
                This website may use cookies to enhance functionality and user experience. You may control cookie
                settings through your browser.
              </p>

              <h4 style={h4Style}>8. Third-Party Services</h4>
              <p style={pStyle}>
                Where third-party tools or services are used, your information may be processed in accordance with their
                respective privacy policies.
              </p>

              <h4 style={h4Style}>9. Cross-Border Access</h4>
              <p style={pStyle}>
                Users accessing this website from outside India do so at their own initiative and are responsible for
                compliance with local laws.
              </p>

              <h4 style={h4Style}>10. Grievance Officer</h4>
              <p style={pStyle}>
                For any privacy-related queries:{" "}
                <a href="mailto:contact@ersa.legal" style={{ color: "#906e23" }}>contact@ersa.legal</a>
              </p>

              <h4 style={h4Style}>11. Changes to Policy</h4>
              <p style={pStyle}>
                This Privacy Policy may be updated at any time without prior notice. Continued use of the website
                constitutes acceptance of such changes.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "0 40px 28px", flexShrink: 0 }}>
          <div style={{ height: "1px", background: "#e5e4e7", margin: "0 0 24px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <button
              onClick={onClose}
              style={{
                background: "#00113a", color: "#fff", border: "none", cursor: "pointer",
                padding: "14px 32px", fontFamily: "'Manrope', sans-serif",
                fontSize: "12px", letterSpacing: "1.4px", textTransform: "uppercase",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#001a4d"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#00113a"}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
