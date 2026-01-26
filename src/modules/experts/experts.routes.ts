import { Router } from "express";
// import { ExpertsController } from './experts.controller';

const router = Router();

/**
 * TODO: Implement the following routes for Experts module
 *
 * PUBLIC ROUTES (No authentication required):
 *
 * GET /experts - Get all experts (for browsing)
 *   - Query params: ?specialization=anxiety&available=true
 *   - Returns list of experts with basic info
 *
 * GET /experts/:id - Get single expert details
 *   - Returns expert profile, specializations, pricing, availability
 *
 * GET /experts/:id/availability - Get expert's available time slots
 *   - Query params: ?date=2026-01-27
 *   - Returns available slots for booking
 *
 * GET /experts/specializations - Get all specializations
 *   - Returns list of specializations for filtering
 *
 * ADMIN ROUTES (Require admin/manager authentication):
 *
 * POST /experts - Create new expert
 *   - Body: { name, email, phone, specializations, bio }
 *
 * PUT /experts/:id - Update expert profile
 *
 * DELETE /experts/:id - Deactivate expert
 *
 * POST /experts/:id/availability - Set expert availability
 *   - Body: { dayOfWeek, startTime, endTime }
 *
 * POST /experts/:id/pricing - Set expert pricing
 *   - Body: { sessionType, price, duration }
 */

export default router;
