// types/booking.ts
import type { Hotel } from "./hotel";

export interface Booking {
  id: number;
  hotelId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingWithDetails extends Booking {
  hotel?: Hotel;
  status: "upcoming" | "completed" | "cancelled";
  nights: number;
}
