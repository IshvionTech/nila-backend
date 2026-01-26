import { Router } from "express";
// import { PaymentsController } from './payments.controller';
// import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * TODO: Implement the following routes for Payments module
 *
 * USER ROUTES:
 *
 * POST /payments/create-order - Create Razorpay order
 *   - Requires: authMiddleware
 *   - Body: { appointmentId, amount }
 *   - Creates Razorpay order
 *   - Returns order ID for frontend payment
 *
 * POST /payments/verify - Verify payment after completion
 *   - Requires: authMiddleware
 *   - Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *   - Verifies payment signature
 *   - Confirms appointment
 *   - Triggers notifications
 *
 * GET /payments/:id - Get payment details
 *   - Requires: authMiddleware
 *   - Returns payment info
 *
 * ADMIN/FRONT-DESK ROUTES:
 *
 * POST /payments/generate-link - Generate payment link
 *   - Used by front desk for phone bookings
 *   - Body: { appointmentId, amount, phone }
 *   - Creates Razorpay payment link
 *   - Returns link for sharing
 *
 * POST /payments/webhook - Razorpay webhook
 *   - Receives payment status updates from Razorpay
 *   - Verifies webhook signature
 *   - Updates payment and appointment status
 *
 * GET /payments - Get all payments (admin view)
 *   - Query params: ?status=success&date=2026-01-27
 */

export default router;
