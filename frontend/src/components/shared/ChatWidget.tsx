import React from "react";
import WhatsAppIcon from "../../assets/whatsapp-icon.svg";

const ChatWidget: React.FC = () => {
  const cleanNumber = "919962959428";
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const whatsappUrl = isMobile
    ? `https://api.whatsapp.com/send?phone=${cleanNumber}`
    : `https://web.whatsapp.com/send?phone=${cleanNumber}`;

  return (
    <div className="chat-toggle">
      <a className="whatsapp-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        aria-label="Open WhatsApp" title="Open WhatsApp"
        style={{ background: "#25D366", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <img src={WhatsAppIcon} alt="WhatsApp" style={{ width: 22, height: 22 }} />
      </a>
    </div>
  );
};

export default ChatWidget;