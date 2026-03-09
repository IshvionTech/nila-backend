import { Request, Response } from "express";
import  pool  from "../db";
import jwt from "jsonwebtoken";

const generateOTP = () => {
  return "123456";;
};
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// Request OTP
export const requestOTP = async (req: Request, res: Response) => {
  try{
     const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone required" });
  }

  const otp = generateOTP();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await pool.query(
    `INSERT INTO admins (phone, otp, otp_expiry)
     VALUES ($1,$2,$3)
     ON CONFLICT (phone)
     DO UPDATE SET otp=$2, otp_expiry=$3`,
    [phone, otp, expiry]
  );

  console.log("OTP:", otp); // For testing

  res.json({ message: "OTP sent" });
}catch (error) {
    console.error("OTP request error:", error);
    res.status(500).json({ message: "Server error" });
 }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
  try { 
     const { phone, otp } = req.body;

     const result = await pool.query(
        "SELECT * FROM admins WHERE phone=$1",
        [phone]
      );

  if (result.rows.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const user = result.rows[0];

  if (user.otp !== otp || new Date() > user.otp_expiry) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({ token });
} catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};