# Nila Backend - Quick Reference Card

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Install additional packages
npm install bcrypt jsonwebtoken razorpay cors
npm install -D @types/bcrypt @types/jsonwebtoken @types/cors nodemon

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run migrations
npm run migrate

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 File Structure Quick Map

```
src/
├── app.ts                    # Main Express app
├── server.ts                 # Server entry point
├── config/
│   ├── env.ts               # Environment config
│   └── db.ts                # Database connection
├── middlewares/
│   ├── auth.middleware.ts   # JWT auth
│   └── error.middleware.ts  # Error handling
├── modules/
│   ├── auth/                # Authentication
│   ├── users/               # User management
│   ├── experts/             # Expert profiles
│   ├── appointments/        # Booking system
│   ├── payments/            # Payment processing
│   └── notifications/       # Notifications
└── utils/
    ├── jwt.ts               # JWT utilities
    ├── otp.ts               # OTP generation
    └── logger.ts            # Logging
```

## 🔑 Environment Variables

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/nila_db
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
WHATSAPP_API_KEY=xxx
SMS_API_KEY=xxx
```

## 📊 Database Tables (17 migrations)

1. `001_init_extensions.sql` - PostgreSQL extensions
2. `002_users.sql` - Patient accounts
3. `003_roles.sql` - User roles
4. `004_admin_users.sql` - Staff accounts
5. `005_experts.sql` - Therapist profiles
6. `006_specializations.sql` - Mental health specializations
7. `007_expert_availability.sql` - Weekly schedules
8. `008_expert_pricing.sql` - Session pricing
9. `009_assessments.sql` - Mental health assessments
10. `010_appointments.sql` - Booking records
11. `011_payments.sql` - Payment transactions
12. `012_payment_links.sql` - Payment links
13. `013_notifications.sql` - Notification logs
14. `014_otps.sql` - OTP verification
15. `015_sessions.sql` - Session management
16. `016_google_meet.sql` - Meeting integration
17. `017_analytics.sql` - Analytics data

## 🎯 Implementation Order

1. ✅ Database migrations (001-017)
2. ✅ Auth module (OTP + JWT)
3. ✅ Users module
4. ✅ Experts module
5. ✅ Appointments module
6. ✅ Payments module
7. ✅ Notifications module

## 🔐 User Roles

- `user` - Patients (website)
- `admin` - Full system access
- `manager` - Operations management
- `expert` - View own appointments
- `front_desk` - Book for others

## 📡 API Endpoints Quick Reference

### Authentication

```
POST   /api/auth/send-otp          # Send OTP
POST   /api/auth/verify-otp        # Verify OTP & login
POST   /api/auth/admin/login       # Admin login
GET    /api/auth/me                # Get current user
```

### Users

```
POST   /api/users/register         # Register user
GET    /api/users/profile          # Get profile
PUT    /api/users/profile          # Update profile
GET    /api/users/appointments     # Get appointments
```

### Experts

```
GET    /api/experts                # List experts
GET    /api/experts/:id            # Get expert details
GET    /api/experts/:id/availability  # Get available slots
POST   /api/experts                # Create expert (admin)
PUT    /api/experts/:id            # Update expert (admin)
```

### Appointments

```
POST   /api/appointments           # Create appointment
GET    /api/appointments/:id       # Get appointment
PUT    /api/appointments/:id/cancel  # Cancel appointment
POST   /api/appointments/book-for-user  # Front desk booking
GET    /api/appointments           # List all (admin)
```

### Payments

```
POST   /api/payments/create-order  # Create Razorpay order
POST   /api/payments/verify        # Verify payment
POST   /api/payments/generate-link # Generate payment link
POST   /api/payments/webhook       # Razorpay webhook
GET    /api/payments/:id           # Get payment details
```

### Notifications

```
GET    /api/notifications          # Get user notifications
POST   /api/notifications/mark-read  # Mark as read
```

## 🔄 Booking Flow States

```
Appointment Status:
pending → confirmed → completed
         ↓
      cancelled
```

```
Payment Status:
pending → success
        ↓
      failed
```

## 💳 Razorpay Integration

### Create Order

```typescript
const order = await razorpay.orders.create({
  amount: 150000, // in paise (1500 INR)
  currency: "INR",
  receipt: appointmentId,
});
```

### Verify Signature

```typescript
const signature = crypto
  .createHmac("sha256", RAZORPAY_SECRET)
  .update(orderId + "|" + paymentId)
  .digest("hex");
```

## 📱 Notification Types

- `otp` - OTP delivery
- `booking` - Booking confirmation
- `payment` - Payment confirmation
- `reminder` - Session reminder
- `cancellation` - Cancellation notice

## 🧪 Testing Checklist

- [ ] Health check: `GET /health`
- [ ] Send OTP works
- [ ] Verify OTP works
- [ ] JWT token valid
- [ ] List experts works
- [ ] Check availability works
- [ ] Create appointment works
- [ ] Create payment order works
- [ ] Verify payment works
- [ ] Appointment confirmed
- [ ] Notifications sent
- [ ] Webhook handled

## 📚 Documentation Files

- `README.md` - Project overview
- `DEVELOPER_GUIDE.md` - Complete guide
- `IMPLEMENTATION_CHECKLIST.md` - Progress tracker
- `API_EXAMPLES.md` - API examples
- `TEAM_HANDOFF.md` - Team onboarding
- `SYSTEM_ARCHITECTURE.md` - Architecture diagrams
- `PROJECT_SUMMARY.md` - Project summary
- `QUICK_REFERENCE.md` - This file

## 🐛 Common Issues & Solutions

### Database Connection Error

```bash
# Check DATABASE_URL in .env
# Ensure PostgreSQL is running
# Test connection: psql $DATABASE_URL
```

### JWT Token Invalid

```bash
# Check JWT_SECRET is set
# Verify token format: Bearer <token>
# Check token expiry
```

### Payment Verification Failed

```bash
# Verify RAZORPAY_KEY_SECRET
# Check signature calculation
# Ensure order_id matches
```

### OTP Not Received

```bash
# Check WhatsApp/SMS API credentials
# Verify phone number format
# Check API logs
```

## 🔧 Useful Commands

```bash
# Check TypeScript errors
npx tsc --noEmit

# Format code
npx prettier --write "src/**/*.ts"

# Database query
psql $DATABASE_URL -c "SELECT * FROM users LIMIT 5;"

# View logs
tail -f logs/*.log

# Test endpoint
curl http://localhost:3000/health
```

## 📞 Need Help?

1. Check inline TODO comments in files
2. Read DEVELOPER_GUIDE.md
3. Review nila_project_overview.md
4. Check API_EXAMPLES.md
5. Review IMPLEMENTATION_CHECKLIST.md

## 🎯 Success Criteria

✅ All migrations run
✅ Health check returns 200
✅ User can login with OTP
✅ User can book appointment
✅ Payment flow works
✅ Notifications sent
✅ All 4 booking flows work

## ⏱️ Estimated Timeline

- Setup: 1-2 days
- Database: 2-3 days
- Auth: 3-4 days
- Users: 2-3 days
- Experts: 3-4 days
- Appointments: 4-5 days
- Payments: 3-4 days
- Notifications: 2-3 days
- Testing: 5-7 days

**Total: 4-6 weeks (3-4 developers)**

---

**Keep this file handy for quick reference during development!**
