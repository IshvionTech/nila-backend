import { Request, Response } from "express";
import  pool  from "../db";

export const getExperts = async (req: Request, res: Response) => {
     //console.log("getExperts function called"); // Add this line
  try {
    const result = await pool.query("SELECT * FROM experts ORDER BY id ASC");
     // console.log("Query result:", result.rows); // Add this line
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteExpert = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM experts WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.json({ message: "Expert deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete expert" });
  }
};