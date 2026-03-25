import { Request, Response } from "express";
import crypto from "crypto";
import pool from "../db";

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
     console.log("ENV CHECK:", process.env.RAZORPAY_KEY_ID);
     const { patientName, patientId } = req.body;

      //  FIXED amount (avoid frontend tampering)
     const amount = 200;
       //  Validation
    if (!patientName || !patientId) {
         return res.status(400).json({ message: "Missing required fields" });
        }

         // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        patientName,
        patientId,
      },
    });

    res.json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

export const cashPayment = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body); 
    const { patientName, patientId } = req.body;
    const amount = 200;

    if (!patientName || !patientId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    console.log("Cash payment for:", patientName, patientId);

    // Save in DB
    await pool.query(
      `INSERT INTO payments 
       (patient_name, patient_id, amount, payment_id, order_id, status, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        patientName,
        patientId,
        amount,
        null,   // no payment id
        null,   // no order id
        "PENDING",
        "CASH"
      ]
    );

    res.json({ success: true });

  } catch (error) {
    console.error("CASH PAYMENT ERROR:", error);
    res.status(500).json({ message: "Cash payment failed" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      patientName,
      patientId,
    } = req.body;

    const amount = 200; // 🔒 keep consistent

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest("hex");

      console.log("SIGN CHECK:", expectedSign, razorpay_signature);

    if (expectedSign === razorpay_signature) {

        console.log("Payment verified for:", patientName, patientId); 

      // Save to DB
        await pool.query(
    `INSERT INTO payments 
     (patient_name, patient_id, amount, payment_id, order_id, status, payment_method)
     VALUES ($1, $2, $3, $4, $5, $6,  $7)`,
    [
      patientName,
      patientId,
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      "SUCCESS",
      "RAZORPAY"
    ]
  );
      // TODO: Save to DB
      res.json({ success: true });
    } else {
        console.log("Payment FAILED for:", patientName, patientId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};