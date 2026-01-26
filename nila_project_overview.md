# NILA – Project Overview & System Flow

## 1. Project Overview

Nila is a digital platform for a mental health clinic that enables patients to discover mental health experts, book therapy or counselling sessions, and manage their appointments seamlessly. The platform consists of a public-facing website for patients, an internal admin panel for clinic staff, and a centralized backend system that handles all business logic, data storage, and third-party integrations.

The core objective of Nila is to simplify the entire journey of mental healthcare — from identifying the right expert, to booking sessions, making payments, attending online or in-person consultations, and receiving continuous support through reminders and notifications. The system is designed to work for both digitally active users who book sessions online and traditional users who prefer calling the clinic and booking through the front desk.

Nila is built as a scalable system, meaning that while the current scope focuses on expert discovery and appointment booking, the architecture supports future extensions such as video consultations, insurance integrations, wearable data, long-term therapy plans, and advanced analytics.

---

## 2. System Components

The Nila platform is divided into three main components:

### 1. Website (Patient Portal)

This is the user-facing application used by patients. Through the website, users can:

- Browse available mental health experts
- Understand different specializations
- Book online or in-person sessions
- Make payments
- View their upcoming and past appointments
- Receive session links and notifications

### 2. Admin Panel (Internal System)

This is used by clinic staff and experts. It allows:

- Managing experts and their profiles
- Setting availability and pricing
- Viewing and managing appointments
- Handling walk-in or phone bookings
- Viewing business analytics and reports

### 3. Backend System (Core Engine)

The backend is the central system that:

- Stores all data (users, experts, appointments, payments)
- Applies business rules
- Handles authentication and authorization
- Integrates with external services like Razorpay, WhatsApp, and Google Meet
- Acts as the single source of truth for the entire platform

---

## 3. User Roles and Responsibilities

### 3.1 Patients (Website Users)

Patients are the end users of the platform. They interact only with the public website and do not have access to the admin panel.

Patients can:

- Sign up using their phone number and OTP
- Create a basic profile with name and email
- Browse experts by specialization
- Book appointments
- Choose session mode (online or in-person)
- Make payments
- View a personal dashboard with session history

From a system perspective, patients are represented as **users** in the database and are authenticated using OTP-based login combined with JWT sessions.

---

### 3.2 Admin Panel Roles

The admin panel supports multiple internal roles, each with different permissions.

#### Admin

Admins have full access to the system. They can:

- Create and manage all other roles
- View all appointments
- Modify expert profiles
- Change pricing and availability
- Access complete business analytics
- Export reports in CSV or PDF

Admins are responsible for overall system configuration and business control.

---

#### Manager

Managers have similar privileges to admins but are more focused on operational management. They can:

- Add or remove experts
- Set expert availability
- Configure session pricing
- View analytics and performance metrics
- Manage appointments across the clinic

Managers typically handle day-to-day operations.

---

#### Expert

Experts are therapists, counsellors, or mental health professionals. They:

- Log into the admin panel
- View only their own appointments
- See upcoming and past sessions
- Access Google Meet links for online sessions

Experts cannot see other experts’ data or business analytics.

---

#### Front Desk

Front desk staff are responsible for handling offline users. They:

- Receive calls from patients
- Check expert availability
- Book appointments on behalf of users
- Generate and send payment links
- Help users complete the booking flow

They act as a bridge between traditional users and the digital system.

---

## 4. Core Project Flow

At a high level, the entire system revolves around **four core activities**:

1. Discovering experts
2. Booking appointments
3. Making payments
4. Attending sessions and receiving notifications

All flows in Nila are variations of these four steps.

---

## 5. User Booking Flows

### Flow 1 – Direct Online Booking (No Account Initially)

In this flow, a new user directly books a session without creating an account first. The user browses the experts, selects one, chooses a time slot and session mode, and confirms the booking. The system then sends an OTP to verify the phone number. After OTP verification, the user enters their name and email, which creates a new user account automatically. The user is then redirected to the payment gateway. After successful payment, the appointment is confirmed, and the user is redirected to their dashboard. Notifications are sent to both the user and the expert.

This flow is optimized for first-time users.

---

### Flow 2 – Login First, Then Book

In this flow, the user first signs in using phone and OTP. Once logged in, they are redirected to their dashboard. From there, they can click on “Book Appointment”, browse experts, and follow the same booking and payment steps. Since the user is already authenticated, their profile already exists, and no new account creation is required.

This flow is designed for returning users.

---

### Flow 3 – Assessment-Based Booking

In this flow, users who are unsure which expert they need can take an assessment. The assessment consists of multiple-choice questions related to mental health concerns. Each answer is linked to one or more experts or specializations. After completing the assessment, the system calculates and displays the most suitable experts. The user then selects an expert and continues with the standard booking flow.

This flow is designed to help users make informed decisions.

---

### Flow 4 – Front Desk Booking

In this flow, the user does not use the website at all. Instead, they call the clinic directly. The front desk logs into the admin panel, checks expert availability, and books an appointment on behalf of the user. The system generates a payment link and sends it to the user via WhatsApp or SMS. Once the user completes the payment, the appointment is confirmed and notifications are sent.

This flow supports offline users and traditional booking methods.

---

## 6. Authentication Philosophy

Nila uses **OTP-based authentication** instead of passwords for patients. This simplifies the user experience and avoids password management issues. Once a user verifies their OTP, the system issues a JWT token which keeps the user logged in across sessions, browser refreshes, and temporary closures.

Admin panel users (admins, managers, experts, front desk) use traditional email/password authentication.

---

## 7. Payment and Session Handling

Payments are handled using Razorpay. Every booking must be associated with a successful payment before the appointment is confirmed. For online sessions, a Google Meet link is generated and stored in the system. This link is shared with both the user and the expert via notifications and is also visible on their respective dashboards.

For in-person sessions, no meeting link is generated, but the appointment details are still tracked in the system.

---

## 8. Notifications and Communication

Nila uses WhatsApp and SMS for all critical communication, including:

- OTP delivery
- Booking confirmation
- Payment confirmation
- Session reminders
- Online session links

All notifications are logged in the backend for audit and tracking purposes.

---

## 9. Overall Design Philosophy

The entire system is built on a few core principles:

- The backend is the single source of truth
- The database represents the business reality
- All flows are event-driven (booking → payment → notification)
- Roles define access, not UI
- The system must support both digital and non-digital users

Nila is not just a website; it is a **complete operational system for a mental health clinic**, capable of handling real-world workflows, staff operations, and patient experiences in a unified and scalable way.
