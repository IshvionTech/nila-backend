import express from "express";
import { createOrder, verifyPayment, cashPayment } from "../controllers/payment.controller";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/cash-payment", cashPayment);

export default router;