import React, { useEffect, useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
      // Dynamically load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      setShow(false);
      document.body.style.overflow = '';
      setAmount("");
      setName("");
      setEmail("");
      setPhone("");
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handlePayment = async () => {
    if (!amount || !name || !email || !phone) {
      alert("Please fill in all details");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      
      const orderRes = await fetch(`${backendUrl}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(amount, 10) * 100, 
          currency: "INR",
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          description: "Professional Fee Settlement"
        })
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const orderData = await orderRes.json();

      // 2. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SeBI70mR1TKIHZ", 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ERSA Legal",
        description: "Professional Fee Settlement",
        order_id: orderData.order_id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          try {
            const verifyRes = await fetch(`${backendUrl}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.status === "success") {
              alert("Payment successful!");
              onClose();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (e) {
            alert("Error verifying payment");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: "#00113a"
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        alert("Payment Failed: " + response.error.description);
      });
      rzp1.open();

    } catch (err) {
      console.error(err);
      alert("Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", borderBottom: "1px solid #c5c6d2",
    borderTop: "none", borderLeft: "none", borderRight: "none",
    padding: "13px 12px 14px", fontFamily: "'Manrope', sans-serif",
    fontSize: 16, color: "#1a1a2e", background: "transparent", outline: "none",
    marginBottom: "24px"
  };

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
        position: 'relative', background: '#fff', width: '100%', maxWidth: '500px',
        maxHeight: '90vh', overflowY: 'auto', borderRadius: '8px',
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
          fontFamily: "'Newsreader', Georgia, serif", fontSize: '32px', color: '#00113a',
          margin: '0 0 8px', fontWeight: 400
        }}>
          Payment Details
        </h3>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: '14px', color: '#444650',
          lineHeight: '22px', margin: '0 0 32px'
        }}>
          Please enter your details to proceed with the secure payment.
        </p>

        <input type="text" placeholder="Full Name" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email Address" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Mobile Number" style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="number" placeholder="Amount (INR)" style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            background: '#00113a', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            padding: '16px 32px', fontFamily: "'Manrope', sans-serif", width: '100%',
            fontSize: '14px', letterSpacing: '1.4px', textTransform: 'uppercase',
            transition: 'background 0.2s', opacity: loading ? 0.8 : 1
          }}
          onMouseEnter={(e) => { if(!loading) e.currentTarget.style.background = '#001a4d'; }}
          onMouseLeave={(e) => { if(!loading) e.currentTarget.style.background = '#00113a'; }}
        >
          {loading ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </div>
    </div>
  );
};
