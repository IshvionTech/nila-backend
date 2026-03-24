import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {

  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  // ✅ Load Razorpay script dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      if (!patientName || !patientId) {
        alert("Please enter patient details");
        return;
      }

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const amount = 500;

      // ✅ Step 1: Create order
      const { data } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        { patientName, patientId }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "Nila Healthcare",
        description: "Consultation Fee",
        order_id: data.id,

        // 👇 Show patient name in Razorpay popup
        prefill: {
          name: patientName,
        },

        handler: async function (response: any) {
          // ✅ Step 2: Verify + send patient data
          const verify = await axios.post(
            `${API_URL}/api/payment/verify-payment`,
            {
              ...response,
              patientName,
              patientId,
              amount
            }
          );

          if (verify.data.success) {
            alert("Payment Successful ✅");
          } else {
            alert("Payment Failed ❌");
          }
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px]">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Payment
        </h2>

        {/* 👇 Patient Name */}
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* 👇 Patient ID */}
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          ₹200
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
};

export default Payment;