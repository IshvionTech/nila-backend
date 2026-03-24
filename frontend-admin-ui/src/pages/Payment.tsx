import axios from "axios";

const Payment = () => {

  const handlePayment = async () => {
    const amount = 500;

    // Create order
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount }
    );

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: data.amount,
      currency: "INR",
      name: "Nila Project",
      description: "Payment Test",
      order_id: data.id,

      handler: async function (response: any) {
        const verify = await axios.post(
          "http://localhost:5000/api/payment/verify-payment",
          response
        );

        if (verify.data.success) {
          alert("Payment Success ✅");
        } else {
          alert("Payment Failed ❌");
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
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