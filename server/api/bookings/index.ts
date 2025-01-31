// server/api/bookings/index.ts
import type { BookingWithDetails } from "~/types/booking";
import { hotels } from "../../data/hotels";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const booking: BookingWithDetails = {
    id: Date.now(),
    hotelId: body.hotelId,
    userId: 1, // Usar authStore.user.id
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    guests: body.guests,
    rooms: body.rooms,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    totalPrice: body.totalPrice,
    paymentStatus: "paid",
    status: "upcoming",
    nights: body.nights,
    hotel: hotels.find((h) => h.id === body.hotelId),
  };

  return booking;
});
