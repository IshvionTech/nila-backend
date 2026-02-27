import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { getUpcomingAppointments, getExpertAvailability, getAppointmentsOverview } from "../controllers/dashboard.controller";


const router = Router();

router.get("/stats", getDashboardStats);
router.get("/upcoming", getUpcomingAppointments);
router.get("/availability", getExpertAvailability);
router.get("/overview", getAppointmentsOverview);

export default router;