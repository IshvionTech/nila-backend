import express from "express";
import { getAppointments } from "../controllers/appointment.controller";
import  pool  from "../db";
import { sendOtp, verifyOtp } from "../controllers/appointment.controller";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
    try{
  const result = await pool.query("SELECT * FROM clinic_appointments ORDER BY id DESC");
  res.json(result.rows);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// CREATE appointment
router.post("/", async (req, res) => {
  try {
    const {
      patient_name,
      patient_id,
      phone,
      email,
      therapist_name,
      appointment_date,
      appointment_time,
      duration,
      status,
      type,
      notes
    } = req.body;

     // convert 5:00 AM → 05:00:00
    const parsedTime = new Date(`1970-01-01 ${appointment_time}`).toTimeString().slice(0,8);

    const result = await pool.query(
      `INSERT INTO clinic_appointments
      (patient_name, patient_id, phone, email, therapist_name, appointment_date, appointment_time, duration, status, type, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [patient_name, patient_id, phone, email, therapist_name, appointment_date, parsedTime, duration, status, type, notes]
    );

    await pool.query(
  `INSERT INTO activity_logs (action) VALUES ($1)`,
  [`Appointment created for ${patient_name} with ${therapist_name}`]
);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
// router.get("/", getAppointments);

export default router;