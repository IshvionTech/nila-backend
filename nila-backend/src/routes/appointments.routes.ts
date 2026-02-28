import express from "express";
import { getAppointments } from "../controllers/appointment.controller";
import  pool  from "../db";

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
      patientName,
      patientId,
      therapistName,
      date,
      time,
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
      [patientName, patientId, therapistName, date, time, duration, status, type, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// router.get("/", getAppointments);

export default router;