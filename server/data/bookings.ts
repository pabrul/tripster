// server/data/bookings.ts
import type { BookingWithDetails } from "~/types/booking";
import { hotels } from "./hotels";

export const bookings: BookingWithDetails[] = [
  {
    id: 1,
    hotelId: 1,
    userId: 1,
    checkIn: "2025-01-15",
    checkOut: "2025-01-20",
    guests: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    rooms: 1,
    totalPrice: 500,
    paymentStatus: "paid",
    status: "upcoming",
    nights: 5,
    hotel: hotels[0],
  },
];
