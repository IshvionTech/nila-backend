import { Request, Response } from "express";
import  pool  from "../db";

export const getExperts = async (req: Request, res: Response) => {
     //console.log("getExperts function called"); // Add this line
  try {
    const result = await pool.query("SELECT * FROM expert ORDER BY id ASC");
     // console.log("Query result:", result.rows); // Add this line
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};