# Nila Backend - API Examples

Quick reference for testing API endpoints.

## Authentication

### Send OTP

```bash
POST /api/auth/send-otp
Content-Type: application/json

{
  "phone": "+919876543210"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### Verify OTP

```bash
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone": "+919876543210",
  "otp": "123456"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "phone": "+919876543210",
    "name": "John Doe"
  }
}
```

### Admin Login

```bash
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@nila.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@nila.com",
    "role": "admin"
  }
}
```

## Experts

### List All Experts

```bash
GET /api/experts?specialization=anxiety

Response:
{
  "success": true,
  "experts": [
    {
      "id": "uuid",
      "name": "Dr. Sarah Johnson",
      "specializations": ["Anxiety", "Depression"],
      "bio": "10 years of experience...",
      "pricing": {
        "online": 1500,
        "in-person": 2000
      }
    }
  ]
}
```

### Get Expert Details

```bash
GET /api/experts/:expertId

Response:
{
  "success": true,
  "expert": {
    "id": "uuid",
    "name": "Dr. Sarah Johnson",
    "email": "sarah@nila.com",
    "phone": "+919876543210",
    "bio": "Experienced therapist...",
    "specializations": ["Anxiety", "Depression"],
    "pricing": [
      { "sessionType": "online", "price": 1500, "duration": 60 },
      { "sessionType": "in-person", "price": 2000, "duration": 60 }
    ],
    "availability": [
      { "dayOfWeek": 1, "startTime": "09:00", "endTime": "17:00" }
    ]
  }
}
```

### Get Expert Availability

```bash
GET /api/experts/:expertId/availability?date=2026-01-27

Response:
{
  "success": true,
  "availableSlots": [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ]
}
```

## Appointments

### Create Appointment

```bash
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "expertId": "uuid",
  "date": "2026-01-27",
  "timeSlot": "10:00",
  "sessionMode": "online"
}

Response:
{
  "success": true,
  "appointment": {
    "id": "uuid",
    "expertId": "uuid",
    "date": "2026-01-27",
    "time": "10:00",
    "sessionMode": "online",
    "status": "pending"
  }
}
```

### Get Appointment Details

```bash
GET /api/appointments/:appointmentId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "appointment": {
    "id": "uuid",
    "date": "2026-01-27",
    "time": "10:00",
    "sessionMode": "online",
    "status": "confirmed",
    "meetingLink": "https://meet.google.com/xxx-yyyy-zzz",
    "expert": {
      "name": "Dr. Sarah Johnson",
      "specializations": ["Anxiety"]
    },
    "payment": {
      "amount": 1500,
      "status": "success"
    }
  }
}
```

### Cancel Appointment

```bash
PUT /api/appointments/:appointmentId/cancel
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```

### Front Desk Booking

```bash
POST /api/appointments/book-for-user
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "phone": "+919876543210",
  "name": "John Doe",
  "expertId": "uuid",
  "date": "2026-01-27",
  "timeSlot": "10:00",
  "sessionMode": "online"
}

Response:
{
  "success": true,
  "appointment": {
    "id": "uuid",
    "status": "pending"
  },
  "paymentLink": "https://razorpay.com/payment-link/xxx"
}
```

## Payments

### Create Payment Order

```bash
POST /api/payments/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "appointmentId": "uuid",
  "amount": 1500
}

Response:
{
  "success": true,
  "orderId": "order_xxx",
  "amount": 1500,
  "currency": "INR",
  "key": "rzp_test_xxx"
}
```

### Verify Payment

```bash
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "appointment": {
    "id": "uuid",
    "status": "confirmed",
    "meetingLink": "https://meet.google.com/xxx-yyyy-zzz"
  }
}
```

### Generate Payment Link (Front Desk)

```bash
POST /api/payments/generate-link
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "appointmentId": "uuid",
  "amount": 1500,
  "phone": "+919876543210"
}

Response:
{
  "success": true,
  "paymentLink": "https://razorpay.com/payment-link/xxx",
  "expiresAt": "2026-01-28T10:00:00Z"
}
```

### Razorpay Webhook

```bash
POST /api/payments/webhook
X-Razorpay-Signature: <signature>
Content-Type: application/json

{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_xxx",
        "order_id": "order_xxx",
        "amount": 150000,
        "status": "captured"
      }
    }
  }
}

Response:
{
  "success": true
}
```

## Users

### Get User Profile

```bash
GET /api/users/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "uuid",
    "phone": "+919876543210",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Update Profile

```bash
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}

Response:
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
}
```

### Get User Appointments

```bash
GET /api/users/appointments
Authorization: Bearer <token>

Response:
{
  "success": true,
  "appointments": [
    {
      "id": "uuid",
      "date": "2026-01-27",
      "time": "10:00",
      "status": "confirmed",
      "expert": {
        "name": "Dr. Sarah Johnson"
      }
    }
  ]
}
```

## Testing with cURL

### Example: Complete Booking Flow

```bash
# 1. Send OTP
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}'

# 2. Verify OTP
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "otp": "123456"}'

# Save the token from response

# 3. Browse experts
curl http://localhost:3000/api/experts

# 4. Check availability
curl http://localhost:3000/api/experts/EXPERT_ID/availability?date=2026-01-27

# 5. Create appointment
curl -X POST http://localhost:3000/api/appointments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "expertId": "EXPERT_ID",
    "date": "2026-01-27",
    "timeSlot": "10:00",
    "sessionMode": "online"
  }'

# 6. Create payment order
curl -X POST http://localhost:3000/api/payments/create-order \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "appointmentId": "APPOINTMENT_ID",
    "amount": 1500
  }'

# 7. After payment on frontend, verify
curl -X POST http://localhost:3000/api/payments/verify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "signature_xxx"
  }'
```

## Postman Collection

Import these examples into Postman for easier testing. Create environment variables:

- `baseUrl`: http://localhost:3000
- `token`: (set after login)
- `expertId`: (set after creating expert)
- `appointmentId`: (set after creating appointment)
