import React, { useEffect, useState } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', opacity: show ? 1 : 0, transition: 'opacity 0.3s ease',
      pointerEvents: show ? 'auto' : 'none'
    }}>
      <div 
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,17,58,0.6)', backdropFilter: 'blur(4px)' }} 
        onClick={onClose} 
      />
      
      <div style={{
        position: 'relative', background: '#fff', width: '100%', maxWidth: '800px',
        maxHeight: '90vh', overflowY: 'auto', borderRadius: '4px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', padding: '40px 48px',
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        textAlign: 'left'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px', opacity: 0.5, transition: 'opacity 0.2s', display: 'flex'
        }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00113a" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <h3 style={{
          fontFamily: "'Newsreader', Georgia, serif", fontSize: '28px', color: '#00113a',
          lineHeight: '36px', margin: '0 0 16px', fontWeight: 400
        }}>
          Terms of Use
        </h3>

        <div style={{
          fontFamily: "'Manrope', sans-serif", fontSize: '15px', color: '#444650',
          lineHeight: '26px', margin: '0 0 28px'
        }}>
          <p>By accessing or using this website (www.ersalegal.in), you agree to be bound by these Terms of Use.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>1. Use of Website</h4>
          <p>This website is made available for general informational purposes only. Accessing or using this website does not create any legal or professional relationship.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>2. Nature of Content</h4>
          <p>All content is provided on an "as is" basis. No warranty is made regarding accuracy, completeness, or timeliness.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>3. No Liability</h4>
          <ul style={{ paddingLeft: '20px', margin: '0 0 8px' }}>
            <li>Reliance on website information</li>
            <li>Errors or inaccuracies</li>
            <li>Access interruptions</li>
            <li>Data loss or transmission issues</li>
          </ul>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>4. User Conduct</h4>
          <ul style={{ paddingLeft: '20px', margin: '0 0 8px' }}>
            <li>No copying or redistribution without permission</li>
            <li>No misleading usage</li>
            <li>No interference with site security</li>
          </ul>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>5. Intellectual Property</h4>
          <p>All content belongs to ERSA Legal and is protected under applicable laws.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>6. Third-Party Links</h4>
          <p>External links are not controlled or endorsed by ERSA Legal.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>7. Indemnity</h4>
          <p>You agree to indemnify ERSA Legal against any claims arising from your use.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>8. Modifications</h4>
          <p>ERSA Legal may update or remove content at any time without notice.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>9. Access Outside India</h4>
          <p>Users outside India must comply with their local laws.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>10. Termination</h4>
          <p>Access may be restricted or terminated without notice.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>11. Governing Law</h4>
          <p>Governed by Indian law. Jurisdiction: Chennai courts.</p>
        </div>

        <div style={{ height: '1px', background: '#e5e4e7', margin: '0 0 32px' }} />

        <h3 style={{
          fontFamily: "'Newsreader', Georgia, serif", fontSize: '28px', color: '#00113a',
          lineHeight: '36px', margin: '0 0 16px', fontWeight: 400
        }}>
          Privacy Policy
        </h3>

        <div style={{
          fontFamily: "'Manrope', sans-serif", fontSize: '15px', color: '#444650',
          lineHeight: '26px', margin: '0 0 28px'
        }}>
          <h4 style={{ color: '#00113a', margin: '0 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>1. Information Collected</h4>
          <ul style={{ paddingLeft: '20px', margin: '0 0 8px' }}>
            <li>Name, email, contact details</li>
            <li>Identification details (if required)</li>
            <li>Submitted forms and documents</li>
          </ul>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>2. Use of Information</h4>
          <ul style={{ paddingLeft: '20px', margin: '0 0 8px' }}>
            <li>Communication &amp; enquiries</li>
            <li>Legal services</li>
            <li>Internal records</li>
            <li>Legal compliance</li>
          </ul>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>3. Disclosure</h4>
          <p>Shared only when required by law or with service providers. No selling of data.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>4. Data Security</h4>
          <p>Measures are taken to protect against unauthorized access or misuse.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>5. Data Retention</h4>
          <p>Stored only as long as necessary or legally required.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>6. User Rights</h4>
          <p>You can request access, correction, or deletion of your data.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>7. Cookies</h4>
          <p>Cookies may be used for better user experience.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>8. Third-Party Services</h4>
          <p>External tools follow their own privacy policies.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>9. Cross-Border Access</h4>
          <p>Users outside India must follow local regulations.</p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>10. Grievance Officer</h4>
          <p>Email: <a href="mailto:contact@ersa.legal" style={{ color: '#906e23' }}>contact@ersa.legal</a></p>

          <h4 style={{ color: '#00113a', margin: '20px 0 6px', fontFamily: "'Manrope', sans-serif", fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>11. Policy Updates</h4>
          <p>Policy may change anytime. Continued use implies acceptance.</p>
        </div>

        <div style={{ height: '1px', background: '#e5e4e7', margin: '0 0 32px' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <button
            onClick={onClose}
            style={{
              background: '#00113a', color: '#fff', border: 'none', cursor: 'pointer',
              padding: '16px 32px', fontFamily: "'Manrope', sans-serif",
              fontSize: '12px', letterSpacing: '1.4px', textTransform: 'uppercase',
              transition: 'background 0.2s', whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#001a4d'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#00113a'}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
