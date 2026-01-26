import { Request, Response } from "express";
// import { AuthService } from './auth.service';

export class AuthController {
  /**
   * TODO: Implement authentication controller methods
   *
   * USER AUTHENTICATION:
   *
   * 1. sendOTP(req, res)
   *    - POST /auth/send-otp
   *    - Body: { phone }
   *    - Sends OTP to phone number
   *    - Returns success message
   *
   * 2. verifyOTP(req, res)
   *    - POST /auth/verify-otp
   *    - Body: { phone, otp }
   *    - Verifies OTP
   *    - Returns JWT token and user data
   *
   * 3. logout(req, res)
   *    - POST /auth/logout
   *    - Invalidates session (optional)
   *
   * ADMIN AUTHENTICATION:
   *
   * 4. adminLogin(req, res)
   *    - POST /auth/admin/login
   *    - Body: { email, password }
   *    - Returns JWT with role
   *
   * 5. getMe(req, res)
   *    - GET /auth/me
   *    - Returns current authenticated user
   */
}
