// server/api/bookings/index.post.ts
import type { BookingWithDetails } from "~/types/booking";
import { bookings } from "../../data/bookings";
import { hotels } from "../../data/hotels";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const booking: BookingWithDetails = {
    id: Date.now(),
    hotelId: body.hotelId,
    userId: 1,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    guests: body.guests,
    rooms: body.rooms,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    totalPrice: body.totalPrice,
    paymentStatus: "paid" as const,
    status: "upcoming" as const,
    nights: body.nights,
    hotel: hotels.find((h) => h.id === body.hotelId),
  };
  bookings.push(booking);
  return booking;
});
