

import React from "react";

function PremiumModal({ onClose }) {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_6H4RgpaEWEIpwx", // Replace with your Razorpay Test Key
      amount: 10, // 100 INR in paise
      currency: "INR",
      name: "YouTube Clone Premium",
      description: "Unlimited downloads for 1 month",
      handler: async function (response) {
        await fetch("http://localhost:5500/user/upgrade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
          },
          body: JSON.stringify({ paymentId: response.razorpay_payment_id })
        });
        alert("Payment successful! You are now premium.");
        onClose();
      },
      prefill: {
        email: JSON.parse(localStorage.getItem("Profile")).email
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", padding: 32, borderRadius: 8, minWidth: 320, textAlign: "center"
      }}>
        <h2>Upgrade to Premium</h2>
        <p>Download unlimited videos for 1 month.</p>
        <button
          onClick={handlePayment}
          style={{
            background: "#43a047", color: "#fff", border: "none", borderRadius: 4, padding: "8px 16px", margin: "8px"
          }}
        >
          Pay with Razorpay
        </button>
        <button
          onClick={onClose}
          style={{
            background: "#d32f2f", color: "#fff", border: "none", borderRadius: 4, padding: "8px 16px", margin: "8px"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PremiumModal;