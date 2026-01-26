# Nila Backend - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         NILA PLATFORM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   Website    │    │ Admin Panel  │    │   Backend    │     │
│  │  (Patient)   │───▶│   (Staff)    │───▶│     API      │     │
│  │   Portal     │    │              │    │ (This Repo)  │     │
│  └──────────────┘    └──────────────┘    └──────────────┘     │
│                                                   │              │
│                                                   ▼              │
│                                          ┌──────────────┐       │
│                                          │  PostgreSQL  │       │
│                                          │   Database   │       │
│                                          └──────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## Backend Architecture (This Repository)

```
┌─────────────────────────────────────────────────────────────────┐
│                      NILA BACKEND API                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    API LAYER                            │    │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │    │
│  │  │ Auth │  │Users │  │Expert│  │Appts │  │ Pay  │    │    │
│  │  │Routes│  │Routes│  │Routes│  │Routes│  │Routes│    │    │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘    │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                 CONTROLLER LAYER                        │    │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │    │
│  │  │ Auth │  │Users │  │Expert│  │Appts │  │ Pay  │    │    │
│  │  │Ctrl  │  │Ctrl  │  │Ctrl  │  │Ctrl  │  │Ctrl  │    │    │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘    │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                  SERVICE LAYER                          │    │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │    │
│  │  │ Auth │  │Users │  │Expert│  │Appts │  │ Pay  │    │    │
│  │  │Svc   │  │Svc   │  │Svc   │  │Svc   │  │Svc   │    │    │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘    │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                REPOSITORY LAYER                         │    │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │    │
│  │  │ Auth │  │Users │  │Expert│  │Appts │  │ Pay  │    │    │
│  │  │Repo  │  │Repo  │  │Repo  │  │Repo  │  │Repo  │    │    │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘    │    │
│  └────────────────────────────────────────────────────────┘    │
│                           │                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   DATABASE LAYER                        │    │
│  │              PostgreSQL Connection Pool                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

```
1. HTTP Request
   │
   ▼
2. Routes (auth.routes.ts)
   │
   ▼
3. Middleware (authMiddleware)
   │
   ▼
4. Controller (auth.controller.ts)
   │  - Validates request
   │  - Extracts data
   │
   ▼
5. Service (auth.service.ts)
   │  - Business logic
   │  - Calls other services
   │
   ▼
6. Repository (auth.repo.ts)
   │  - Database queries
   │  - Data mapping
   │
   ▼
7. Database (PostgreSQL)
   │
   ▼
8. Response flows back up
```

## Module Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                     MODULE RELATIONSHIPS                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      ┌──────────────┐                       │
│                      │     Auth     │                       │
│                      │   (OTP/JWT)  │                       │
│                      └──────┬───────┘                       │
│                             │                                │
│                    ┌────────┴────────┐                      │
│                    │                 │                       │
│              ┌─────▼─────┐     ┌────▼────┐                 │
│              │   Users   │     │  Admin  │                 │
│              │ (Patients)│     │  Users  │                 │
│              └─────┬─────┘     └────┬────┘                 │
│                    │                │                       │
│                    │         ┌──────▼──────┐               │
│                    │         │   Experts   │               │
│                    │         │  (Profiles) │               │
│                    │         └──────┬──────┘               │
│                    │                │                       │
│                    └────────┬───────┘                       │
│                             │                                │
│                      ┌──────▼──────┐                       │
│                      │Appointments │                       │
│                      │  (Booking)  │                       │
│                      └──────┬──────┘                       │
│                             │                                │
│                    ┌────────┴────────┐                      │
│                    │                 │                       │
│              ┌─────▼─────┐     ┌────▼────────┐             │
│              │  Payments │     │Notifications│             │
│              │(Razorpay) │     │(WhatsApp/SMS)│            │
│              └───────────┘     └─────────────┘             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE TABLES                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐         ┌──────────────┐                     │
│  │  users   │────────▶│ appointments │                     │
│  └──────────┘         └──────┬───────┘                     │
│                              │                               │
│  ┌──────────┐               │         ┌──────────┐         │
│  │ experts  │───────────────┘         │ payments │         │
│  └────┬─────┘                         └──────────┘         │
│       │                                                      │
│       ├──────▶┌────────────────────┐                       │
│       │       │expert_availability │                       │
│       │       └────────────────────┘                       │
│       │                                                      │
│       ├──────▶┌────────────────┐                           │
│       │       │expert_pricing  │                           │
│       │       └────────────────┘                           │
│       │                                                      │
│       └──────▶┌────────────────────────┐                   │
│               │expert_specializations  │                   │
│               └────────────────────────┘                   │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐                     │
│  │admin_users   │    │    roles     │                     │
│  └──────────────┘    └──────────────┘                     │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐                     │
│  │     otps     │    │  sessions    │                     │
│  └──────────────┘    └──────────────┘                     │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐                     │
│  │notifications │    │payment_links │                     │
│  └──────────────┘    └──────────────┘                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Booking Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    BOOKING FLOW                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. User browses experts                                    │
│     │                                                        │
│     ▼                                                        │
│  2. Selects expert, date, time                             │
│     │                                                        │
│     ▼                                                        │
│  3. OTP sent to phone                                       │
│     │                                                        │
│     ▼                                                        │
│  4. User verifies OTP                                       │
│     │                                                        │
│     ▼                                                        │
│  5. Account created (if new)                               │
│     │                                                        │
│     ▼                                                        │
│  6. Appointment created (status: pending)                  │
│     │                                                        │
│     ▼                                                        │
│  7. Razorpay order created                                 │
│     │                                                        │
│     ▼                                                        │
│  8. User completes payment                                 │
│     │                                                        │
│     ▼                                                        │
│  9. Payment verified                                        │
│     │                                                        │
│     ▼                                                        │
│  10. Appointment confirmed                                  │
│     │                                                        │
│     ├──▶ Generate Google Meet link (if online)            │
│     │                                                        │
│     ├──▶ Send confirmation to user                         │
│     │                                                        │
│     └──▶ Notify expert                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION FLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  USER AUTHENTICATION (OTP):                                 │
│                                                              │
│  1. POST /auth/send-otp { phone }                          │
│     │                                                        │
│     ├──▶ Generate 6-digit OTP                              │
│     ├──▶ Store in database (expires in 5 min)             │
│     └──▶ Send via WhatsApp/SMS                             │
│                                                              │
│  2. POST /auth/verify-otp { phone, otp }                   │
│     │                                                        │
│     ├──▶ Validate OTP                                       │
│     ├──▶ Find/Create user                                   │
│     ├──▶ Generate JWT token                                 │
│     └──▶ Return token + user data                          │
│                                                              │
│  3. Subsequent requests                                     │
│     │                                                        │
│     └──▶ Authorization: Bearer <token>                     │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  ADMIN AUTHENTICATION (Email/Password):                     │
│                                                              │
│  1. POST /auth/admin/login { email, password }             │
│     │                                                        │
│     ├──▶ Validate credentials                               │
│     ├──▶ Check role (admin/manager/expert/front_desk)     │
│     ├──▶ Generate JWT with role                            │
│     └──▶ Return token + admin data                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Payment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     PAYMENT FLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DIRECT PAYMENT:                                            │
│                                                              │
│  1. POST /payments/create-order                            │
│     │  { appointmentId, amount }                           │
│     │                                                        │
│     ├──▶ Create Razorpay order                             │
│     ├──▶ Store in database                                  │
│     └──▶ Return order_id                                    │
│                                                              │
│  2. Frontend shows Razorpay checkout                       │
│     │                                                        │
│     └──▶ User completes payment                            │
│                                                              │
│  3. POST /payments/verify                                   │
│     │  { order_id, payment_id, signature }                │
│     │                                                        │
│     ├──▶ Verify signature                                   │
│     ├──▶ Update payment status                              │
│     ├──▶ Confirm appointment                                │
│     └──▶ Trigger notifications                              │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  PAYMENT LINK (Front Desk):                                │
│                                                              │
│  1. POST /payments/generate-link                           │
│     │  { appointmentId, amount, phone }                    │
│     │                                                        │
│     ├──▶ Create Razorpay payment link                      │
│     ├──▶ Store link in database                             │
│     └──▶ Return link URL                                    │
│                                                              │
│  2. Send link via WhatsApp/SMS                             │
│                                                              │
│  3. User clicks link and pays                              │
│                                                              │
│  4. POST /payments/webhook (from Razorpay)                 │
│     │                                                        │
│     ├──▶ Verify webhook signature                           │
│     ├──▶ Update payment status                              │
│     ├──▶ Confirm appointment                                │
│     └──▶ Trigger notifications                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## External Integrations

```
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │  Razorpay    │  ◀──  Payment processing                 │
│  │   (Payment)  │  ──▶  Webhooks for status updates        │
│  └──────────────┘                                           │
│                                                              │
│  ┌──────────────┐                                           │
│  │  WhatsApp    │  ◀──  OTP delivery                       │
│  │     API      │  ◀──  Booking confirmations              │
│  │              │  ◀──  Session reminders                  │
│  └──────────────┘                                           │
│                                                              │
│  ┌──────────────┐                                           │
│  │   SMS API    │  ◀──  Fallback for WhatsApp              │
│  │ (Twilio/MSG91)│  ◀──  OTP delivery                      │
│  └──────────────┘                                           │
│                                                              │
│  ┌──────────────┐                                           │
│  │ Google Meet  │  ◀──  Generate meeting links             │
│  │     API      │  ──▶  For online sessions                │
│  └──────────────┘                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. HTTPS/TLS                                               │
│     └─▶ All communication encrypted                        │
│                                                              │
│  2. JWT Authentication                                      │
│     └─▶ Stateless token-based auth                         │
│                                                              │
│  3. OTP Verification                                        │
│     └─▶ 6-digit code, 5-minute expiry                      │
│                                                              │
│  4. Payment Signature Verification                          │
│     └─▶ HMAC SHA256 signature check                        │
│                                                              │
│  5. Webhook Signature Verification                          │
│     └─▶ Verify Razorpay webhook authenticity               │
│                                                              │
│  6. Role-Based Access Control                               │
│     └─▶ Middleware checks user role                        │
│                                                              │
│  7. SQL Injection Prevention                                │
│     └─▶ Parameterized queries only                         │
│                                                              │
│  8. Environment Variables                                   │
│     └─▶ Secrets stored in .env                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  DEPLOYMENT ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    FRONTEND                           │  │
│  │  ┌────────────┐              ┌────────────┐         │  │
│  │  │  Website   │              │Admin Panel │         │  │
│  │  │  (Vercel)  │              │  (Vercel)  │         │  │
│  │  └─────┬──────┘              └─────┬──────┘         │  │
│  └────────┼─────────────────────────────┼──────────────┘  │
│           │                             │                   │
│           └──────────────┬──────────────┘                   │
│                          │                                   │
│  ┌───────────────────────▼──────────────────────────────┐  │
│  │                  BACKEND API                          │  │
│  │            (AWS/Heroku/DigitalOcean)                 │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         Node.js + Express + TypeScript       │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └────────────────────────┬──────────────────────────────┘  │
│                           │                                   │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │              PostgreSQL Database                      │  │
│  │         (AWS RDS / Heroku Postgres)                  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              EXTERNAL SERVICES                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │Razorpay  │  │WhatsApp  │  │Google    │           │  │
│  │  │          │  │   API    │  │  Meet    │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

This architecture provides a clear, scalable, and maintainable structure for the Nila platform backend.
