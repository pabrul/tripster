// types/booking.ts
import type { Hotel } from "./hotel";

export interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

export interface BookingErrors
  extends Partial<Record<keyof BookingForm, string>> {
  general?: string; // Erro geral
}

export interface Booking {
  id: number;
  hotelId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rooms: number;
  totalPrice: number;
  paymentStatus: "pending" | "paid" | "failed";
}

export interface BookingWithDetails extends Booking {
  hotel?: Hotel;
  status: "upcoming" | "completed" | "cancelled";
  nights: number;
}

export interface BookingPayment {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}
