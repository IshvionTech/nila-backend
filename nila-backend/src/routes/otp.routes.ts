import express from "express";
const router = express.Router();

const otpStore: any = {};

// ✅ SEND OTP
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[phone] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000 // 5 minutes
  };

  console.log("OTP for", phone, ":", otp); // for testing

  res.json({ message: "OTP sent successfully" });
});

// ✅ VERIFY OTP
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStore[phone];

  if (!record) {
    return res.status(400).json({ message: "OTP not found" });
  }

  if (record.otp == otp && Date.now() < record.expires) {
    return res.json({ success: true });
  }

  return res.status(400).json({ message: "Invalid or expired OTP" });
});

export default router;