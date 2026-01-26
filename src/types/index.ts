/**
 * TODO: Define shared TypeScript types and interfaces
 *
 * COMMON TYPES:
 */

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MANAGER = "manager",
  EXPERT = "expert",
  FRONT_DESK = "front_desk",
}

export enum SessionMode {
  ONLINE = "online",
  IN_PERSON = "in-person",
}

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum NotificationType {
  OTP = "otp",
  BOOKING = "booking",
  PAYMENT = "payment",
  REMINDER = "reminder",
  CANCELLATION = "cancellation",
}

export enum NotificationChannel {
  WHATSAPP = "whatsapp",
  SMS = "sms",
  EMAIL = "email",
}

/**
 * TODO: Add interfaces for your entities
 *
 * Example:
 *
 * export interface User {
 *   id: string;
 *   phone: string;
 *   name: string;
 *   email?: string;
 *   createdAt: Date;
 *   updatedAt: Date;
 * }
 *
 * export interface Expert {
 *   id: string;
 *   name: string;
 *   email: string;
 *   phone: string;
 *   bio: string;
 *   profileImage?: string;
 *   isActive: boolean;
 *   specializations: Specialization[];
 *   pricing: ExpertPricing[];
 *   availability: ExpertAvailability[];
 * }
 *
 * export interface Appointment {
 *   id: string;
 *   userId: string;
 *   expertId: string;
 *   appointmentDate: Date;
 *   appointmentTime: string;
 *   sessionMode: SessionMode;
 *   status: AppointmentStatus;
 *   meetingLink?: string;
 *   paymentId?: string;
 *   notes?: string;
 * }
 */
