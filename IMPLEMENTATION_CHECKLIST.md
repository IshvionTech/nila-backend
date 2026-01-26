# Nila Backend - Implementation Checklist

Use this checklist to track your implementation progress.

## Phase 1: Database Setup

### Migrations (db/migrations/)

- [ ] 001_init_extensions.sql - PostgreSQL extensions (uuid-ossp, etc.)
- [ ] 002_users.sql - Users table
- [ ] 003_roles.sql - Roles enum/table
- [ ] 004_admin_users.sql - Admin users table
- [ ] 005_experts.sql - Experts table
- [ ] 006_specializations.sql - Specializations table
- [ ] 007_expert_availability.sql - Expert availability table
- [ ] 008_expert_pricing.sql - Expert pricing table
- [ ] 009_assessments.sql - Assessment questions/results
- [ ] 010_appointments.sql - Appointments table
- [ ] 011_payments.sql - Payments table
- [ ] 012_payment_links.sql - Payment links table
- [ ] 013_notifications.sql - Notifications log table
- [ ] 014_otps.sql - OTP verification table
- [ ] 015_sessions.sql - Session management table
- [ ] 016_google_meet.sql - Google Meet integration
- [ ] 017_analytics.sql - Analytics/reporting tables

### Migration Script

- [ ] scripts/migrate.ts - Implement migration runner

## Phase 2: Core Configuration

### Config Files

- [ ] src/config/env.ts - Environment variables (already created)
- [ ] src/config/db.ts - Database connection pool

### Utilities

- [ ] src/utils/jwt.ts - JWT generation and verification
- [ ] src/utils/otp.ts - OTP generation (already created)
- [ ] src/utils/logger.ts - Logging utility (already created)

### Middlewares

- [ ] src/middlewares/auth.middleware.ts - JWT authentication
- [ ] src/middlewares/error.middleware.ts - Error handling (already created)
- [ ] src/middlewares/role.middleware.ts - Role-based access control

## Phase 3: Authentication Module

### Auth Module (src/modules/auth/)

- [ ] auth.repo.ts - Database operations (OTP, sessions, admin users)
- [ ] auth.service.ts - Business logic (OTP flow, JWT generation)
- [ ] auth.controller.ts - Request handlers
- [ ] auth.routes.ts - Route definitions

### Test Auth Flow

- [ ] Send OTP endpoint works
- [ ] OTP verification works
- [ ] JWT token generated correctly
- [ ] Admin login works

## Phase 4: Users Module

### Users Module (src/modules/users/)

- [ ] users.repo.ts - Database operations
- [ ] users.service.ts - Business logic
- [ ] users.controller.ts - Request handlers
- [ ] users.routes.ts - Route definitions

### Test Users Flow

- [ ] User registration works
- [ ] Get profile works
- [ ] Update profile works
- [ ] Get appointments works

## Phase 5: Experts Module

### Experts Module (src/modules/experts/)

- [ ] experts.repo.ts - Database operations
- [ ] experts.service.ts - Business logic
- [ ] experts.controller.ts - Request handlers
- [ ] experts.routes.ts - Route definitions

### Test Experts Flow

- [ ] List experts works
- [ ] Get expert details works
- [ ] Get availability works
- [ ] Create expert (admin) works
- [ ] Set availability works
- [ ] Set pricing works

## Phase 6: Appointments Module

### Appointments Module (src/modules/appointments/)

- [ ] appointments.repo.ts - Database operations
- [ ] appointments.service.ts - Business logic
- [ ] appointments.controller.ts - Request handlers
- [ ] appointments.routes.ts - Route definitions

### Test Appointments Flow

- [ ] Create appointment works
- [ ] Check availability works
- [ ] Prevent double booking works
- [ ] Get appointment details works
- [ ] Cancel appointment works
- [ ] Front desk booking works

## Phase 7: Payments Module

### Payments Module (src/modules/payments/)

- [ ] payments.repo.ts - Database operations
- [ ] payments.service.ts - Business logic (Razorpay integration)
- [ ] payments.controller.ts - Request handlers
- [ ] payments.routes.ts - Route definitions

### Razorpay Integration

- [ ] Create order works
- [ ] Verify payment signature works
- [ ] Webhook handling works
- [ ] Generate payment link works

### Test Payments Flow

- [ ] Create Razorpay order works
- [ ] Payment verification works
- [ ] Appointment confirmed after payment
- [ ] Webhook updates payment status

## Phase 8: Notifications Module

### Notifications Module (src/modules/notifications/)

- [ ] notifications.repo.ts - Database operations
- [ ] notifications.service.ts - Business logic (WhatsApp/SMS)
- [ ] notifications.controller.ts - Request handlers
- [ ] notifications.routes.ts - Route definitions

### Notification Types

- [ ] OTP delivery
- [ ] Booking confirmation
- [ ] Payment confirmation
- [ ] Meeting link delivery
- [ ] Session reminders
- [ ] Cancellation notifications

## Phase 9: Integration & Testing

### End-to-End Flows

- [ ] Flow 1: Direct online booking (no account)
- [ ] Flow 2: Login first, then book
- [ ] Flow 3: Assessment-based booking
- [ ] Flow 4: Front desk booking

### Integration Points

- [ ] Razorpay webhooks configured
- [ ] WhatsApp API integrated
- [ ] SMS API integrated
- [ ] Google Meet link generation

### Security

- [ ] JWT secret is strong
- [ ] OTP expiry works
- [ ] Payment signature verification works
- [ ] Webhook signature verification works
- [ ] Role-based access control works
- [ ] SQL injection prevention
- [ ] Rate limiting implemented

## Phase 10: Deployment

### Pre-Deployment

- [ ] Environment variables documented
- [ ] Database migrations tested
- [ ] Error logging configured
- [ ] CORS configured for frontend
- [ ] Health check endpoint works

### Deployment

- [ ] Database hosted and accessible
- [ ] Backend deployed
- [ ] Razorpay webhooks URL configured
- [ ] Environment variables set
- [ ] SSL/HTTPS enabled

### Post-Deployment

- [ ] Test all endpoints in production
- [ ] Monitor error logs
- [ ] Test webhook delivery
- [ ] Test notifications delivery

## Optional Enhancements

- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Database connection pooling
- [ ] Redis for session management
- [ ] File upload for expert profiles
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Appointment reminders (cron job)
- [ ] Refund handling

## Notes

- Implement modules in order (Auth → Users → Experts → Appointments → Payments → Notifications)
- Test each module before moving to the next
- Refer to inline TODO comments in each file for detailed requirements
- Check DEVELOPER_GUIDE.md for implementation details
