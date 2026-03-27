import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const otpStore: Record<string, { otp: number; expires: number }> = {};

// ✅ SEND OTP (EMAIL)
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`
    });

    console.log("✅ OTP sent to email:", email);

    res.json({ message: "OTP sent to email successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ✅ VERIFY OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ message: "OTP not found" });
  }

  if (record.otp === Number(otp) && Date.now() < record.expires) {
    delete otpStore[email];
    return res.json({ success: true });
  }

  return res.status(400).json({ message: "Invalid or expired OTP" });
});

export default router;

// import express from "express";
// import nodemailer from "nodemailer";

// const router = express.Router();

// const otpStore: Record<string, { otp: number; expires: number }> = {};

// // ✅ SEND OTP
// router.post("/send-otp", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "email required" });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000);

//   otpStore[email] = {
//     otp,
//     expires: Date.now() + 5 * 60 * 1000 // 5 minutes
//   };
// try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is: ${otp}`
//     });


//   console.log("OTP sent to email:", email); // for testing
// } catch (err) {
//     console.error(err);
//   res.json({ message: "Failed to send OTP" });
// }
// });

// // ✅ VERIFY OTP
// router.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   const record = otpStore[email];

//   if (!record) {
//     return res.status(400).json({ message: "OTP not found" });
//   }

//   if (record.otp == otp && Date.now() < record.expires) {
//     delete otpStore[email];
//     return res.json({ success: true });
//   }

//   return res.status(400).json({ message: "Invalid or expired OTP" });
// });

// export default router;