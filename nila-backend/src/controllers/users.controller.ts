import { Request, Response } from "express";
import pool from "../db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "users" ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};