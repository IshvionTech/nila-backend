import { Router } from "express";
import { getUsers } from "../controllers/users.controller";
import pool from "../db";

const router = Router();

router.get("/", getUsers);

// ✅ ADD USER
router.post("/", async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const result = await pool.query(
      `INSERT INTO users (name, email, role, status, last_active)
       VALUES ($1,$2,$3,$4,NOW())
       RETURNING *`,
      [name, email, role, status]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

export default router;