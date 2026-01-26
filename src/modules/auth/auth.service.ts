// import { generateOTP } from '../../utils/otp';
// import { generateToken } from '../../utils/jwt';
// import { NotificationsService } from '../notifications/notifications.service';
// import { UsersService } from '../users/users.service';

export class AuthService {
  /**
   * TODO: Implement authentication logic
   *
   * OTP-BASED AUTHENTICATION FLOW:
   *
   * 1. sendOTP(phone)
   *    - Generates 6-digit OTP
   *    - Stores OTP in database with expiry (5 minutes)
   *    - Sends OTP via SMS/WhatsApp
   *    - Returns success message
   *
   * 2. verifyOTP(phone, otp)
   *    - Validates OTP against stored value
   *    - Checks expiry
   *    - Finds or creates user by phone
   *    - Generates JWT token
   *    - Returns token and user object
   *
   * 3. refreshToken(oldToken)
   *    - Validates old token
   *    - Issues new token
   *
   * ADMIN AUTHENTICATION:
   *
   * 4. adminLogin(email, password)
   *    - Validates email and password
   *    - Checks admin_users table
   *    - Returns JWT with role information
   *
   * 5. validateAdminToken(token)
   *    - Verifies admin JWT
   *    - Returns admin user with role
   */
}
