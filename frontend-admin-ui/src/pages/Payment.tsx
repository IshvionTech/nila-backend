import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL:", API_URL);

const Payment = () => {

  const handlePayment = async () => {
    try {
      const amount = 500;

      // ✅ Step 1: Create order
      const { data } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        { amount }
      );

      // ✅ Step 2: Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // store key in .env
        amount: data.amount,
        currency: "INR",
        name: "Nila Project",
        description: "Payment Test",
        order_id: data.id,

        handler: async function (response: any) {
          try {
            // ✅ Step 3: Verify payment
            const verify = await axios.post(
              `${API_URL}/api/payment/verify-payment`,
              response
            );

            if (verify.data.success) {
              alert("Payment Success ✅");
            } else {
              alert("Payment Failed ❌");
            }
          } catch (err) {
            console.error("Verification error:", err);
          }
        },
      };

      // ✅ Step 4: Open Razorpay
      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <button onClick={handlePayment}>
        Pay ₹500
      </button>
    </div>
  );
};

export default Payment;