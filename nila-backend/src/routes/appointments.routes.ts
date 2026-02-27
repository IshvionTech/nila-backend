import express from "express";
import { getAppointments } from "../controllers/appointment.controller";

const router = express.Router();

router.get("/", getAppointments);

export default router;