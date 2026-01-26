# Nila Backend API

Backend system for Nila mental health clinic platform.

## 🏥 About Nila

Nila is a comprehensive digital platform for a mental health clinic that enables:

- Patients to discover experts and book therapy sessions
- Clinic staff to manage appointments and operations
- Experts to view their schedules and sessions
- Front desk to handle phone bookings

## 📁 Project Structure

```
nila-backend/
├── src/
│   ├── modules/          # Feature modules (auth, users, experts, etc.)
│   ├── config/           # Configuration files
│   ├── middlewares/      # Express middlewares
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript type definitions
├── db/
│   ├── migrations/       # Database migration files
│   └── seeds/            # Seed data
└── scripts/              # Utility scripts
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Additional Required Packages

```bash
npm install bcrypt jsonwebtoken razorpay cors
npm install -D @types/bcrypt @types/jsonwebtoken @types/cors nodemon
```

### 3. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### 4. Database Setup

Run migrations in order (001 to 017):

```bash
npm run migrate
```

### 5. Start Development Server

```bash
npm run dev
```

Server will run on http://localhost:3000

## 📚 Documentation

- **DEVELOPER_GUIDE.md** - Complete implementation guide
- **nila_project_overview.md** - System design and user flows
- **folder_structure.md** - Project structure reference

## 🔑 Key Features

- **OTP-based authentication** for patients
- **Role-based access control** (admin, manager, expert, front desk)
- **Razorpay payment integration**
- **Google Meet integration** for online sessions
- **WhatsApp/SMS notifications**
- **Multiple booking flows** (direct, login-first, assessment-based, front-desk)

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + OTP
- **Payments**: Razorpay
- **Notifications**: WhatsApp/SMS APIs

## 📋 Implementation Order

1. ✅ Project structure created
2. ⏳ Database migrations (implement SQL schemas)
3. ⏳ Auth module (OTP + JWT)
4. ⏳ Users module
5. ⏳ Experts module
6. ⏳ Appointments module
7. ⏳ Payments module
8. ⏳ Notifications module

## 🔐 Environment Variables

Required in `.env`:

- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens
- `RAZORPAY_KEY_ID` - Razorpay API key
- `RAZORPAY_KEY_SECRET` - Razorpay secret
- `WHATSAPP_API_KEY` - WhatsApp API credentials
- `SMS_API_KEY` - SMS API credentials

## 📝 API Endpoints

### Authentication

- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/admin/login` - Admin login

### Experts

- `GET /api/experts` - List all experts
- `GET /api/experts/:id` - Get expert details
- `GET /api/experts/:id/availability` - Get available slots

### Appointments

- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### Payments

- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Razorpay webhook

## 👥 For Backend Developers

Each TypeScript file contains detailed TODO comments with:

- Database schema definitions
- Method signatures to implement
- Business logic requirements
- Integration points

Start with `DEVELOPER_GUIDE.md` for complete implementation instructions.

## 🧪 Testing

Health check endpoint:
(your port might vary)
```bash
curl http://localhost:3000/health
```

## 📞 Support

Refer to inline documentation in each module for detailed implementation guidance.

