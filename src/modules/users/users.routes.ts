import { Router } from "express";
// import { UsersController } from './users.controller';
// import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * TODO: Implement the following routes for Users module
 *
 * POST /users/register - Register new user (called after OTP verification)
 *   - Body: { phone, name, email }
 *   - Creates user account automatically during booking flow
 *
 * GET /users/profile - Get current user profile
 *   - Requires: authMiddleware
 *   - Returns user details
 *
 * PUT /users/profile - Update user profile
 *   - Requires: authMiddleware
 *   - Body: { name, email }
 *
 * GET /users/appointments - Get user's appointments (upcoming and past)
 *   - Requires: authMiddleware
 *   - Returns list of appointments with expert details
 *
 * GET /users/dashboard - Get user dashboard data
 *   - Requires: authMiddleware
 *   - Returns upcoming sessions, notifications, etc.
 */

export default router;
