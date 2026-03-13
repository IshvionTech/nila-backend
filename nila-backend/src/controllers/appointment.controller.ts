import { Request, Response } from "express";
import pool from "../db";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT 
        id,
        patient_name AS "patientName",
        patient_id AS "patientId",
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