# Healthcare Admin Platform

A full-stack healthcare administration platform with a React frontend and Node.js/Express backend, backed by PostgreSQL. It supports patient management, expert (doctor) management, appointment scheduling, payments, analytics, and notifications.

---

## Project Structure

```
/
├── database/               # SQL migrations and setup scripts
│   ├── migrations/         # Ordered SQL migration files
│   ├── run_migrations.sh
│   └── setup_database.sh
├── backend/                # Node.js + Express API (TypeScript)
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── routes/         # Express routers
│   │   ├── services/       # Business logic (OTP, etc.)
│   │   ├── types/          # TypeScript interfaces
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
└── frontend/               # React + Vite + Tailwind (TypeScript)
    ├── src/
    │   ├── pages/          # Page components
    │   ├── services/       # Axios API calls
    │   ├── types/          # TypeScript interfaces
    │   ├── App.tsx         # Routes & layout
    │   └── main.tsx        # Entry point
    ├── package.json
    └── vite.config.ts
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

---

## Setup

### 1. Database

```bash
cd database
cp ../backend/.env.example ../backend/.env
# Edit .env with your PostgreSQL credentials
bash setup_database.sh
bash run_migrations.sh
```

This creates the `nila_healthcare` database and runs all 17 migrations, setting up tables for users, roles, experts, specializations, appointments, payments, notifications, OTPs, sessions, and analytics.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Fill in your environment variables (see Configuration section)
npm install
npm run dev
```

The API server starts on `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`. API requests to `/api/*` are proxied to the backend automatically.

---

## Configuration

Create a `.env` file in the backend directory based on `.env.example`:

| Variable | Description | Required |
|---|---|---|
| `PORT` | Backend server port (default: 5000) | Yes |
| `NODE_ENV` | `development` or `production` | Yes |
| `DB_HOST` | PostgreSQL host | Yes |
| `DB_PORT` | PostgreSQL port (default: 5432) | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_USER` | Database user | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `JWT_SECRET` | Secret for access tokens (min 32 chars) | Yes |
| `JWT_EXPIRE` | Access token expiry (e.g. `7d`) | Yes |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens | Yes |
| `REFRESH_TOKEN_EXPIRE` | Refresh token expiry (e.g. `30d`) | Yes |
| `CORS_ORIGIN` | Allowed frontend origin | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio SID for SMS OTP | Optional |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Optional |
| `TWILIO_PHONE_NUMBER` | Twilio sender number | Optional |
| `RAZORPAY_KEY_ID` | Razorpay key for payments | Optional |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | Optional |

> **Note:** Twilio and Razorpay are optional in development. OTPs are logged to the console when Twilio is not configured.

---

## API Endpoints

All protected routes require a `Bearer <token>` Authorization header.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/generate-otp` | No | Send OTP to phone number |
| POST | `/verify-otp` | No | Verify OTP and receive JWT |
| POST | `/admin/login` | No | Admin login with email/password |
| GET | `/me` | Yes | Get current user info |
| POST | `/logout` | Yes | Logout and invalidate session |

### Appointments — `/api/appointments`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | List all appointments |
| GET | `/available-slots` | Get available time slots |
| GET | `/:id` | Get appointment by ID |
| POST | `/` | Create a new appointment |
| PUT | `/:id/status` | Update appointment status |

### Experts — `/api/experts`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | No | List all experts |
| GET | `/:id` | No | Get expert by ID |
| POST | `/` | Yes | Create a new expert |
| PUT | `/:id` | Yes | Update expert details |

### Other Routes (all protected)

- `/api/patients` — Patient CRUD
- `/api/payments` — Payment management
- `/api/notifications` — Notification management
- `/api/analytics` — Platform analytics
- `/api/dashboard` — Dashboard summary stats
- `/api/reports` — Reporting
- `/api/settings` — Application settings

---

## Frontend Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | OTP or admin password login |
| Dashboard | `/` | Key metrics overview |
| Patients | `/patients` | Patient list and management |
| Experts | `/experts` | Doctor/expert management |
| Appointments | `/appointments` | Appointment scheduling |
| Payments | `/payments` | Payment tracking |
| Notifications | `/notifications` | Notification center |
| Analytics | `/analytics` | Charts and usage data |
| Reports | `/reports` | Generate and view reports |
| Settings | `/settings` | Platform configuration |

---

## Scripts

### Backend

```bash
npm run dev       # Start development server with hot-reload
npm run build     # Compile TypeScript to dist/
npm run start     # Run compiled production build
npm run migrate   # Run database migrations
```

### Frontend

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## Tech Stack

**Backend:** Node.js, Express, TypeScript, PostgreSQL (`pg`), JWT (`jsonwebtoken`), bcryptjs

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Recharts, Axios

**Database:** PostgreSQL with raw SQL migrations

**Integrations:** Twilio (SMS OTP), Razorpay (payments), Google Meet (video sessions)