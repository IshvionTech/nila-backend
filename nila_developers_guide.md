
# NILA – Implementation Tasks & Development Checklist

## Purpose of This Document

This document defines all major implementation tasks for the Nila platform.
It provides a structured, end-to-end checklist for backend and frontend developers to follow while building the system.

The goal is to ensure:

* No major feature is missed
* Work is done in the correct order
* All business flows are implemented
* Responsibilities are clearly understood

This document should be treated as the **official execution roadmap**.

---

## Phase 1 – Project Setup

1. Clone the backend repository.
2. Install all project dependencies.
3. Create local PostgreSQL database.
4. Run all database migrations.
5. Run all seed files.
6. Verify that all tables exist.
7. Insert test records and validate schema.
8. Start Express server and confirm health endpoint works.

---

## Phase 2 – Core Infrastructure

9. Configure environment variables for database, JWT, Razorpay, WhatsApp, Google.
10. Set up database connection pool.
11. Implement centralized error handling middleware.
12. Implement request logging system.
13. Implement JWT token generation and validation utilities.
14. Implement OTP generation and validation utilities.
15. Set up basic health check endpoint.

---

## Phase 3 – Authentication System

16. Implement OTP request API for users.
17. Implement OTP verification API for users.
18. Create user records after OTP verification.
19. Implement JWT-based session management.
20. Store refresh tokens in user sessions table.
21. Implement logout and token invalidation.
22. Ensure user remains logged in after browser refresh.

---

## Phase 4 – Admin Panel Authentication

23. Implement admin login using email and password.
24. Implement role-based authorization middleware.
25. Restrict admin routes based on roles.
26. Ensure experts can only access their own data.
27. Ensure front desk has limited permissions.

---

## Phase 5 – Experts Management

28. Implement create expert API.
29. Implement update expert profile API.
30. Implement list experts API.
31. Implement expert activation/deactivation.
32. Implement expert specialization mapping.
33. Implement expert availability management.
34. Implement expert pricing management.

---

## Phase 6 – Expert Discovery (Website)

35. Implement public experts listing API.
36. Implement expert filtering by specialization.
37. Implement expert availability fetching API.
38. Implement expert details API.

---

## Phase 7 – Booking System (Core)

39. Implement create appointment API.
40. Validate time slot conflicts.
41. Validate expert availability.
42. Handle online vs in-person mode.
43. Store appointment in pending state.
44. Implement appointment confirmation flow.
45. Implement appointment cancellation.
46. Implement appointment rescheduling.
47. Log all status changes.

---

## Phase 8 – Assessment Flow

48. Implement assessment questions API.
49. Implement assessment answer submission API.
50. Map answers to experts or specializations.
51. Calculate best matching experts.
52. Return ranked experts list.

---

## Phase 9 – Payments Integration

53. Implement Razorpay order creation.
54. Implement Razorpay webhook verification.
55. Store payment records.
56. Update appointment status after payment.
57. Handle failed payments.
58. Implement front desk payment link flow.
59. Track payment link usage.

---

## Phase 10 – Google Meet Integration

60. Implement Google Meet link generation.
61. Store meeting links in database.
62. Send meeting links to users and experts.
63. Display meeting links in dashboards.

---

## Phase 11 – Notifications System

64. Implement unified notification service.
65. Integrate WhatsApp provider.
66. Integrate SMS provider.
67. Send OTP notifications.
68. Send booking confirmation notifications.
69. Send payment success notifications.
70. Send session reminder notifications.
71. Log all notifications.

---

## Phase 12 – Dashboards

72. Implement user dashboard API.
73. Show upcoming appointments.
74. Show past appointments.
75. Show meeting links.
76. Implement expert dashboard.
77. Show expert-specific appointments.
78. Implement admin dashboard.
79. Show all clinic appointments.

---

## Phase 13 – Analytics & Reports

80. Implement analytics queries.
81. Calculate total bookings.
82. Calculate revenue.
83. Calculate new users.
84. Calculate completed sessions.
85. Implement CSV export.
86. Implement PDF export.

---

## Phase 14 – Front Desk Flow

87. Implement front desk booking API.
88. Validate expert availability.
89. Generate payment link.
90. Send payment link via WhatsApp/SMS.
91. Track booking status.
92. Confirm appointment after payment.

---

## Phase 15 – System Hardening

93. Implement rate limiting on OTP APIs.
94. Add input validation on all endpoints.
95. Implement transaction safety for booking + payment.
96. Add database indexes on key columns.
97. Add soft delete where required.
98. Implement audit logs.
99. Handle edge cases and failures.

---

## Phase 16 – Testing & Validation

100. Test all booking flows manually.
101. Test OTP login flow.
102. Test admin role permissions.
103. Test front desk booking flow.
104. Test payment success and failure.
105. Test Google Meet links.
106. Test notification delivery.
107. Test concurrency scenarios.

---

## Phase 17 – Deployment Readiness

108. Prepare environment configs for staging.
109. Prepare production database.
110. Run migrations on production.
111. Seed production baseline data.
112. Verify monitoring and logs.
113. Perform final regression testing.

---

## Final Execution Principle

Developers must follow this order:
Database → Backend → Integrations → Frontend

No feature is considered complete unless:

* Database schema supports it
* Backend APIs exist
* Business rules are enforced
* Flows work end-to-end

