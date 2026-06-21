import React, { memo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/ERSALogo.svg";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
  dropdown?: DropdownItem[];
}

interface NavBarProps {
  links?: NavLink[];
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const defaultLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Practice Areas", href: "#practice" },
  {
    label: "Services",
    dropdown: [
      { label: "NRI Property Services", href: "/nri-property-services" },
      { label: "Intellectual Property", href: "/intellectual-property" },
      { label: "Corporate Advisory", href: "/corporate-advisory" }
    ],
  },
  { label: "Experience", href: "#about" },
];

const ChevronDown: React.FC<{ open: boolean }> = ({ open }) => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
    style={{ marginLeft: 4, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NavBar: React.FC<NavBarProps> = memo(({ links = defaultLinks, ctaLabel = "Book Consultation", onCtaClick }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClose = () => { setOpen(false); setDropdownOpen(null); };
  const handleCta = () => { if (onCtaClick) onCtaClick(); else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavLinkClick = (link: NavLink) => {
    if (link.dropdown) {
      setDropdownOpen(dropdownOpen === link.label ? null : link.label);
      return;
    }
    if (link.onClick) { link.onClick(); handleClose(); return; }
    if (link.href) {
      if (link.href.startsWith("/")) {
        navigate(link.href);
      } else {
        document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    handleClose();
  };

  const handleDropdownItemClick = (item: DropdownItem) => {
    setDropdownOpen(null);
    handleClose();
    if (item.onClick) { item.onClick(); return; }
    if (item.href) {
      if (item.href.startsWith("/")) {
        navigate(item.href);
      } else {
        document.getElementById(item.href.replace("#", ""))?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Newsreader', Georgia, serif", fontSize: 18, color: "#475569",
    textDecoration: "none", letterSpacing: "-0.45px", whiteSpace: "nowrap", cursor: "pointer",
    transition: "color 0.2s", display: "inline-flex", alignItems: "center",
  };

  return (
    <>
      <header className="ersa-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 84,
        backdropFilter: "blur(4px)", background: "rgba(248,250,252,0.95)",
        zIndex: 100, padding: "0 24px 0 16px",
      }}>
        <div style={{ width: 92, height: 62, flexShrink: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={Logo} alt="ERSA Legal"
            style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "darken" }} />
        </div>

        <nav className="ersa-nav-links" ref={dropdownRef}>
          {links.map((link) => (
            <div key={link.label} style={{ position: "relative" }}>
              <a
                onClick={(e) => { e.preventDefault(); handleNavLinkClick(link); }}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00113a")}
                onMouseLeave={(e) => { if (dropdownOpen !== link.label) e.currentTarget.style.color = "#475569"; }}
              >
                {link.label}
                {link.dropdown && <ChevronDown open={dropdownOpen === link.label} />}
              </a>

              {link.dropdown && dropdownOpen === link.label && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, marginTop: 8,
                  background: "#fff", borderRadius: 6, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  minWidth: 200, padding: "8px 0", zIndex: 200,
                }}>
                  {link.dropdown.map((item) => (
                    <button key={item.label} onClick={() => handleDropdownItemClick(item)} style={{
                      display: "block", width: "100%", padding: "10px 20px", border: "none",
                      background: "none", cursor: "pointer", textAlign: "left",
                      fontFamily: "'Newsreader', Georgia, serif", fontSize: 16, color: "#475569",
                      transition: "background 0.15s, color 0.15s",
                    }} onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f3f5"; e.currentTarget.style.color = "#00113a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#475569"; }}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button className="ersa-nav-cta" onClick={handleCta} style={{
          background: "#00113a", color: "#fff", border: "none", cursor: "pointer",
          padding: "10px 24px", fontFamily: "'Manrope', sans-serif",
          fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase", whiteSpace: "nowrap",
          transition: "background 0.2s",
        }} onMouseEnter={(e) => (e.currentTarget.style.background = "#001a4d")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#00113a")}>{ctaLabel}</button>

        <button className="ersa-hamburger" onClick={() => setOpen(p => !p)} aria-label="Menu" aria-expanded={open}>
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
        {links.flatMap((link) => {
          const items: { label: string; onClick: () => void }[] = [];
          items.push({
            label: link.label,
            onClick: () => {
              if (link.dropdown) return; // parent has no direct action
              if (link.onClick) link.onClick();
              else if (link.href) {
                if (link.href.startsWith("/")) navigate(link.href);
                else document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: 'smooth' });
              }
              handleClose();
            }
          });
          if (link.dropdown) {
            link.dropdown.forEach((item) => {
              items.push({
                label: `  ${item.label}`,
                onClick: () => { handleDropdownItemClick(item); }
              });
            });
          }
          return items;
        }).map(({ label, onClick }) => (
          <a key={label} onClick={onClick} style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: label.startsWith("  ") ? 15 : 18,
            color: "#475569", textDecoration: "none", cursor: "pointer",
            padding: "14px 0", borderBottom: "1px solid #eee",
            paddingLeft: label.startsWith("  ") ? 20 : 0,
            transition: "color 0.2s",
          }} onMouseEnter={(e) => (e.currentTarget.style.color = "#00113a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>{label}</a>
        ))}
        <button onClick={() => { handleClose(); handleCta(); }} style={{
          marginTop: 16, background: "#00113a", color: "#fff", border: "none",
          cursor: "pointer", padding: "14px 24px",
          fontFamily: "'Manrope', sans-serif",
          fontSize: 14, letterSpacing: "1.4px", textTransform: "uppercase",
          transition: "background 0.2s",
          width: "100%",
        }} onMouseEnter={(e) => (e.currentTarget.style.background = "#001a4d")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#00113a")}>{ctaLabel}</button>
      </div>
    </>
  );
});
NavBar.displayName = "NavBar";

export default NavBar;