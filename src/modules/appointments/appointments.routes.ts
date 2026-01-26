import { Router } from "express";
// import { AppointmentsController } from './appointments.controller';
// import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * TODO: Implement the following routes for Appointments module
 *
 * USER ROUTES (Require user authentication):
 *
 * POST /appointments - Create new appointment
 *   - Requires: authMiddleware
 *   - Body: { expertId, date, timeSlot, sessionMode, userId }
 *   - Creates appointment in "pending" status
 *   - Returns appointment ID for payment
 *
 * GET /appointments/:id - Get appointment details
 *   - Requires: authMiddleware
 *   - Returns appointment with expert info, payment status, meeting link
 *
 * PUT /appointments/:id/cancel - Cancel appointment
 *   - Requires: authMiddleware
 *   - Updates status to "cancelled"
 *
 * ADMIN ROUTES (Require admin/manager/front-desk authentication):
 *
 * POST /appointments/book-for-user - Book appointment on behalf of user
 *   - Used by front desk for phone bookings
 *   - Body: { phone, name, expertId, date, timeSlot, sessionMode }
 *   - Creates user if doesn't exist
 *   - Generates payment link
 *
 * GET /appointments - Get all appointments (admin view)
 *   - Query params: ?status=confirmed&date=2026-01-27&expertId=xxx
 *   - Returns filtered appointments
 *
 * PUT /appointments/:id/confirm - Manually confirm appointment
 *   - Used when payment is done offline
 *
 * EXPERT ROUTES (Require expert authentication):
 *
 * GET /appointments/my-appointments - Get expert's appointments
 *   - Returns only appointments for logged-in expert
 */

export default router;
