import { Router } from "express";
import { getExperts } from "../controllers/expert.controller";
// import { getExperts } from "../controllers/expert.controller";

const router = Router();

router.get("/", getExperts);
// router.get("/", (req, res) => {
//   console.log("Experts route hit");
//   res.send("Experts working");
// });

export default router;