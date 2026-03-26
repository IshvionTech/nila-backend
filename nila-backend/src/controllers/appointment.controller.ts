import { Request, Response } from "express";
import pool from "../db";
import otpStore from "../utils/otpStore";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT 
        id,
        patient_name AS "patientName",
        patient_id AS "patientId",
        phone,
        therapist_name AS "therapistName",
        appointment_date AS "date",
        appointment_time AS "time",
        duration,
        status,
        type,
        notes
       FROM clinic_appointments
       ORDER BY appointment_date DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const {
      patient_name,
      patient_id,
      therapist_name,
      appointment_date,
      appointment_time,
      duration,
      status,
      type,
      notes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO clinic_appointments
      (patient_name, patient_id, therapist_name, appointment_date, appointment_time, duration, status, type, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        patient_name,
        patient_id,
        therapist_name,
        appointment_date,
        appointment_time,
        duration,
        status,
        type,
        notes
      ]
    );

    // ⭐ ADD ACTIVITY LOG HERE
    await pool.query(
      `INSERT INTO activity_logs (action) VALUES ($1)`,
      [`Appointment created for ${patient_name}`]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    // ✅ GENERATE OTP (HERE)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // ✅ STORE OTP (HERE)
    otpStore[phone] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000 // 5 mins
    };

    console.log("OTP for", phone, "is", otp); // For testing

    // TODO: Send SMS here (Twilio / Fast2SMS)

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    const record = otpStore[phone];

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const { otp: storedOtp, expires } = record;

    // ✅ VALIDATION (HERE)
    if (Date.now() > expires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (Number(otp) !== storedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ SUCCESS
    delete otpStore[phone];

    res.json({ message: "OTP verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};