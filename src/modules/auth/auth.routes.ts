import { Router } from "express";
// import { AuthController } from './auth.controller';
// import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * TODO: Implement authentication routes
 *
 * USER AUTHENTICATION (OTP-based):
 *
 * POST /auth/send-otp - Send OTP to phone
 *   - Body: { phone }
 *   - No authentication required
 *
 * POST /auth/verify-otp - Verify OTP and login
 *   - Body: { phone, otp }
 *   - Returns JWT token
 *
 * POST /auth/logout - Logout user
 *   - Requires: authMiddleware
 *
 * GET /auth/me - Get current user
 *   - Requires: authMiddleware
 *
 * ADMIN AUTHENTICATION:
 *
 * POST /auth/admin/login - Admin login
 *   - Body: { email, password }
 *   - Returns JWT with role
 *
 * GET /auth/admin/me - Get current admin user
 *   - Requires: authMiddleware (admin)
 */

export default router;
