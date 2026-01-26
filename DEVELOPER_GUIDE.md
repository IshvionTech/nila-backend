# Nila Backend - Developer Guide

## Project Overview

Nila is a mental health clinic platform with three main components:

- **Website**: Patient-facing portal for booking sessions
- **Admin Panel**: Internal system for clinic staff and experts
- **Backend**: This API (single source of truth)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Required Dependencies

Add these to package.json:

```bash
npm install express pg dotenv bcrypt jsonwebtoken razorpay
npm install -D typescript @types/express @types/node @types/bcrypt @types/jsonwebtoken ts-node nodemon
```

### 3. Environment Setup

Copy `.env.example` to `.env` and configure:

- Database connection (PostgreSQL)
- JWT secret
- Razorpay credentials
- WhatsApp/SMS API credentials

### 4. Database Setup

Run migrations in order:

```bash
npm run migrate
```

## Architecture

### Module Structure

Each module follows this pattern:

```
module/
├── module.routes.ts    # API endpoints
├── module.controller.ts # Request handling
├── module.service.ts    # Business logic
└── module.repo.ts       # Database operations
```

### Data Flow

```
Request → Routes → Controller → Service → Repository → Database
```

## Core Modules

### 1. Auth Module

- OTP-based authentication for patients
- Email/password for admin users
- JWT token management
- Role-based access control

### 2. Users Module

- Patient profiles
- Dashboard data
- Appointment history

### 3. Experts Module

- Expert profiles and specializations
- Availability management
- Pricing configuration
- Time slot calculation

### 4. Appointments Module

- Booking flow (4 different flows - see project overview)
- Status management (pending → confirmed → completed)
- Conflict checking
- Meeting link generation

### 5. Payments Module

- Razorpay integration
- Order creation and verification
- Payment link generation (for front desk)
- Webhook handling

### 6. Notifications Module

- WhatsApp/SMS integration
- OTP delivery
- Booking confirmations
- Session reminders

## User Flows

### Flow 1: Direct Online Booking

1. User browses experts (no login)
2. Selects expert, date, time, session mode
3. System sends OTP
4. User verifies OTP + enters name/email
5. Account created automatically
6. Redirected to payment
7. Payment confirmed → Appointment confirmed
8. Notifications sent

### Flow 2: Login First, Then Book

1. User logs in with phone + OTP
2. Browses experts from dashboard
3. Books appointment
4. Makes payment
5. Appointment confirmed

### Flow 3: Assessment-Based Booking

1. User takes mental health assessment
2. System recommends suitable experts
3. User selects expert
4. Continues with standard booking flow

### Flow 4: Front Desk Booking

1. User calls clinic
2. Front desk logs into admin panel
3. Checks availability, books appointment
4. Generates payment link
5. Sends link via WhatsApp/SMS
6. User pays → Appointment confirmed

## Database Schema

### Key Tables

- `users` - Patient accounts
- `admin_users` - Staff accounts (admin, manager, expert, front_desk)
- `experts` - Therapist profiles
- `specializations` - Mental health specializations
- `expert_availability` - Weekly schedules
- `expert_pricing` - Session pricing
- `appointments` - Booking records
- `payments` - Payment transactions
- `payment_links` - Generated payment links
- `notifications` - Communication logs
- `otps` - OTP verification
- `sessions` - JWT sessions

## Authentication

### Patient Auth (OTP)

```typescript
POST /auth/send-otp { phone }
POST /auth/verify-otp { phone, otp } → returns JWT
```

### Admin Auth (Email/Password)

```typescript
POST /auth/admin/login { email, password } → returns JWT with role
```

### JWT Structure

```json
{
  "userId": "uuid",
  "role": "user|admin|manager|expert|front_desk",
  "expertId": "uuid" // if role is expert
}
```

## Payment Integration

### Razorpay Flow

1. Create order: `POST /payments/create-order`
2. Frontend shows Razorpay checkout
3. Verify payment: `POST /payments/verify`
4. Webhook: `POST /payments/webhook` (for async updates)

### Payment Link Flow (Front Desk)

1. Generate link: `POST /payments/generate-link`
2. Send via WhatsApp/SMS
3. User pays through link
4. Webhook confirms payment
5. Appointment auto-confirmed

## Role-Based Access

### Roles

- **user**: Patients (website only)
- **admin**: Full system access
- **manager**: Operational management
- **expert**: View own appointments only
- **front_desk**: Book on behalf of users

### Middleware

```typescript
authMiddleware; // Validates JWT
roleMiddleware(["admin", "manager"]); // Restricts by role
```

## Development Workflow

### 1. Implement Database Migrations

Start with `db/migrations/*.sql` files in order

### 2. Implement Repositories

Database operations in `*.repo.ts` files

### 3. Implement Services

Business logic in `*.service.ts` files

### 4. Implement Controllers

Request handling in `*.controller.ts` files

### 5. Wire Up Routes

Connect controllers to routes in `*.routes.ts`

### 6. Update app.ts

Register all routes in main app file

## Testing

### Manual Testing Flow

1. Send OTP → Verify OTP → Get token
2. Browse experts → Check availability
3. Create appointment → Make payment
4. Verify appointment confirmed
5. Check notifications sent

### Key Test Cases

- OTP expiry validation
- Double booking prevention
- Payment signature verification
- Role-based access control
- Webhook signature validation

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Razorpay webhooks configured
- [ ] WhatsApp/SMS API configured
- [ ] CORS configured for frontend domains
- [ ] JWT secret is strong and secure
- [ ] Database connection pooling configured
- [ ] Error logging setup
- [ ] Rate limiting enabled

## Support

Refer to:

- `nila_project_overview.md` - Complete system design
- `folder_structure.md` - Project structure
- Individual `*.ts` files - Implementation instructions

## Next Steps

1. Set up database and run migrations
2. Implement Auth module first (foundation)
3. Then Users module
4. Then Experts module
5. Then Appointments module
6. Then Payments module
7. Finally Notifications module
8. Test end-to-end flows
9. Deploy and configure webhooks
