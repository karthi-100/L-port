import React, { useEffect, useState } from "react";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#906e23" />
    <path d="M7 12.5L10.5 16L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface ExpertiseDetails {
  icon: string;
  title: string;
  fullDesc: string;
  scopeOfWork: string[];
}

interface ExpertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExpertiseDetails | null;
}

export const ExpertiseModal: React.FC<ExpertiseModalProps> = ({ isOpen, onClose, data }) => {
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
      padding: '24px', opacity: show && data ? 1 : 0, transition: 'opacity 0.3s ease',
      pointerEvents: show && data ? 'auto' : 'none'
    }}>
      <div 
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,17,58,0.6)', backdropFilter: 'blur(4px)' }} 
        onClick={onClose} 
      />
      
      {data && (
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

          <img src={data.icon} alt="" style={{ height: '36px', width: 'auto', marginBottom: '20px', filter: 'brightness(0) saturate(100%) invert(39%) sepia(87%) saturate(541%) hue-rotate(27deg) brightness(94%) contrast(85%)' }} />
          
          <h3 style={{
            fontFamily: "'Newsreader', Georgia, serif", fontSize: '40px', color: '#00113a',
            lineHeight: '48px', margin: '0 0 16px', fontWeight: 400
          }}>
            {data.title}
          </h3>
          
          <p style={{
            fontFamily: "'Manrope', sans-serif", fontSize: '16px', color: '#444650',
            lineHeight: '28px', margin: '0 0 28px'
          }}>
            {data.fullDesc}
          </p>

          <h3 style={{
            fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: '#906e23',
            letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px', fontWeight: 600
          }}>
            Scope of work includes:
          </h3>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px 24px', marginBottom: '32px'
          }}>
            {data.scopeOfWork.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}><CheckIcon /></div>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: '#1a1a2e', lineHeight: '24px' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: '#e5e4e7', margin: '0 0 32px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: '#1a1a2e' }}>
              Ready to discuss your specific requirements?
            </span>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              style={{
                background: '#00113a', color: '#fff', border: 'none', cursor: 'pointer',
                padding: '16px 32px', fontFamily: "'Manrope', sans-serif",
                fontSize: '12px', letterSpacing: '1.4px', textTransform: 'uppercase',
                transition: 'background 0.2s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#001a4d'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#00113a'}
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
