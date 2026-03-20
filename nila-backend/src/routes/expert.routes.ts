import { Router } from "express";
import { getExperts } from "../controllers/expert.controller";
// import { getExperts } from "../controllers/expert.controller";
import pool from "../db";

import { deleteExpert } from "../controllers/expert.controller";

const router = Router();

router.delete("/:id", deleteExpert);

router.get("/", getExperts);
// router.get("/", (req, res) => {
//   console.log("Experts route hit");
//   res.send("Experts working");
// });

router.post("/", async (req, res) => {
  try {

     console.log("Incoming expert:", req.body)  

    const { name, title, email, phone, specialty, rating, patients, status, joinedDate, nextAvailable } = req.body

    const result = await pool.query(
      `INSERT INTO experts (name,title,email,phone,specialization,rating,patients,status,joined_date, next_available)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [name, title, email, phone, specialty, rating , patients, status,joinedDate, nextAvailable ]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add expert" })
  }
})

export default router;