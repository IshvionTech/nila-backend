# Nila Backend - Team Handoff Document

## 📦 What's Been Set Up

This project folder contains a complete backend structure for the Nila mental health clinic platform, ready for your development team to implement.

## 📁 Project Structure

```
nila-backend/
├── README.md                      # Project overview and quick start
├── DEVELOPER_GUIDE.md             # Complete implementation guide
├── IMPLEMENTATION_CHECKLIST.md    # Track your progress
├── API_EXAMPLES.md                # API endpoint examples
├── TEAM_HANDOFF.md               # This file
│
├── src/
│   ├── app.ts                    # Express app setup (with route placeholders)
│   ├── server.ts                 # Server entry point
│   │
│   ├── config/
│   │   ├── env.ts                # Environment configuration
│   │   └── db.ts                 # Database connection (TODO)
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts    # JWT authentication (TODO)
│   │   └── error.middleware.ts   # Error handling
│   │
│   ├── modules/
│   │   ├── auth/                 # Authentication module
│   │   │   ├── auth.routes.ts    # Route definitions with TODOs
│   │   │   ├── auth.controller.ts # Controller with instructions
│   │   │   ├── auth.service.ts    # Service with business logic TODOs
│   │   │   └── auth.repo.ts       # Database operations with schema
│   │   │
│   │   ├── users/                # Users module (same structure)
│   │   ├── experts/              # Experts module (same structure)
│   │   ├── appointments/         # Appointments module (same structure)
│   │   ├── payments/             # Payments module (same structure)
│   │   └── notifications/        # Notifications module (same structure)
│   │
│   ├── utils/
│   │   ├── jwt.ts                # JWT utilities (TODO)
│   │   ├── otp.ts                # OTP generation
│   │   └── logger.ts             # Logging utility
│   │
│   └── types/
│       ├── express.d.ts          # Express type extensions
│       └── index.ts              # Shared types and enums
│
├── db/
│   ├── migrations/               # 17 blank SQL migration files (001-017)
│   └── seeds/                    # Seed data folder
│
├── scripts/
│   └── migrate.ts                # Migration runner (TODO)
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── .env.example                  # Environment variables template

```

## 🎯 What Each File Contains

### Documentation Files

- **README.md**: Quick start guide and project overview
- **DEVELOPER_GUIDE.md**: Detailed implementation instructions, architecture, flows
- **IMPLEMENTATION_CHECKLIST.md**: Step-by-step checklist to track progress
- **API_EXAMPLES.md**: cURL examples for testing each endpoint
- **nila_project_overview.md**: Complete system design and user flows
- **folder_structure.md**: Original structure reference

### Code Files

Every `.ts` file contains:

- ✅ Proper imports (commented out until implemented)
- ✅ Class/function structure
- ✅ Detailed TODO comments explaining what to implement
- ✅ Database schema definitions (in repo files)
- ✅ Method signatures with descriptions
- ✅ Business logic requirements
- ✅ Integration points

### Migration Files

- 17 blank SQL files in `db/migrations/`
- Named 001-017 for execution order
- Each has a comment indicating its purpose

## 🚀 Getting Started (For Your Team)

### Step 1: Environment Setup

```bash
# Install dependencies
npm install

# Install additional packages
npm install bcrypt jsonwebtoken razorpay cors
npm install -D @types/bcrypt @types/jsonwebtoken @types/cors nodemon

# Copy environment file
cp .env.example .env

# Configure .env with your credentials
```

### Step 2: Database Setup

1. Create PostgreSQL database
2. Update `DATABASE_URL` in `.env`
3. Implement SQL schemas in `db/migrations/*.sql` files
4. Implement `scripts/migrate.ts` to run migrations
5. Run: `npm run migrate`

### Step 3: Implementation Order

Follow this sequence (detailed in IMPLEMENTATION_CHECKLIST.md):

1. **Database Migrations** (db/migrations/)
   - Implement all 17 SQL files with table schemas
   - Run migrations

2. **Auth Module** (src/modules/auth/)
   - Implement OTP generation and verification
   - Implement JWT token management
   - Test login flow

3. **Users Module** (src/modules/users/)
   - User CRUD operations
   - Profile management

4. **Experts Module** (src/modules/experts/)
   - Expert profiles
   - Availability management
   - Pricing configuration

5. **Appointments Module** (src/modules/appointments/)
   - Booking logic
   - Conflict checking
   - Status management

6. **Payments Module** (src/modules/payments/)
   - Razorpay integration
   - Payment verification
   - Webhook handling

7. **Notifications Module** (src/modules/notifications/)
   - WhatsApp/SMS integration
   - Notification triggers

### Step 4: Testing

```bash
# Start development server
npm run dev

# Test health check
curl http://localhost:3000/health

# Follow API_EXAMPLES.md for endpoint testing
```

## 📋 Key Implementation Notes

### 1. Database Schema

- All table schemas are documented in `*.repo.ts` files
- Use PostgreSQL with UUID primary keys
- Follow the migration order (001-017)

### 2. Authentication Flow

- **Patients**: OTP-based (phone + OTP → JWT)
- **Admin users**: Email + password → JWT
- JWT includes userId and role

### 3. Booking Flows

Four different flows are supported (see DEVELOPER_GUIDE.md):

- Direct online booking (no account initially)
- Login first, then book
- Assessment-based booking
- Front desk booking (phone orders)

### 4. Payment Integration

- Use Razorpay for payments
- Verify payment signatures
- Handle webhooks for async updates
- Generate payment links for front desk

### 5. Notifications

- Primary: WhatsApp
- Fallback: SMS
- Types: OTP, booking, payment, reminder, cancellation

## 🔑 Environment Variables Needed

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/nila_db
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
WHATSAPP_API_KEY=your_whatsapp_api_key
SMS_API_KEY=your_sms_api_key
```

## 👥 Team Roles Suggestion

### Backend Developer 1: Core Auth & Users

- Auth module (OTP, JWT)
- Users module
- Middleware (auth, error handling)

### Backend Developer 2: Experts & Appointments

- Experts module (profiles, availability, pricing)
- Appointments module (booking logic, conflict checking)

### Backend Developer 3: Payments & Notifications

- Payments module (Razorpay integration)
- Notifications module (WhatsApp/SMS)
- Webhook handling

### Database Developer

- All migration files (001-017)
- Database connection setup
- Query optimization

## 📚 Documentation Priority

Read in this order:

1. **README.md** - Get oriented
2. **nila_project_overview.md** - Understand the system
3. **DEVELOPER_GUIDE.md** - Learn the architecture
4. **IMPLEMENTATION_CHECKLIST.md** - Track your work
5. **API_EXAMPLES.md** - Test as you build

## ✅ What's Already Done

- ✅ Complete folder structure
- ✅ All TypeScript files with detailed instructions
- ✅ Package.json with scripts
- ✅ TypeScript configuration
- ✅ Environment template
- ✅ Comprehensive documentation
- ✅ Implementation checklist
- ✅ API examples

## ⏳ What Needs Implementation

- ⏳ SQL schemas in migration files
- ⏳ Database connection logic
- ⏳ All TODO items in TypeScript files
- ⏳ Third-party integrations (Razorpay, WhatsApp, SMS)
- ⏳ Testing

## 🎯 Success Criteria

Your implementation is complete when:

- [ ] All migrations run successfully
- [ ] Health check endpoint returns 200
- [ ] User can send OTP and login
- [ ] User can browse experts
- [ ] User can book appointment
- [ ] Payment flow works end-to-end
- [ ] Notifications are sent
- [ ] All 4 booking flows work
- [ ] Admin panel APIs work
- [ ] Webhooks are handled correctly

## 🆘 Need Help?

- Check inline TODO comments in each file
- Refer to DEVELOPER_GUIDE.md for detailed explanations
- Review nila_project_overview.md for business logic
- Use API_EXAMPLES.md for testing

## 📞 Questions to Clarify

Before starting, confirm:

1. PostgreSQL version and hosting
2. Razorpay account credentials
3. WhatsApp API provider (Twilio, MSG91, etc.)
4. SMS API provider
5. Deployment target (AWS, Heroku, etc.)
6. Frontend domains for CORS configuration

## 🎉 Ready to Start!

Everything is set up for your team to start implementing. Each file has clear instructions, and the documentation provides complete context. Follow the implementation order, use the checklist to track progress, and refer to the guides when needed.

Good luck! 🚀
