// server/api/hotels/index.ts
import { hotels } from "~/server/data/hotels";

export default defineEventHandler((event) => {
  // Pega os parâmetros da query
  const query = getQuery(event);
  const searchLocation = query.location?.toString().toLowerCase() || "";
  const checkIn = query.checkIn ? new Date(query.checkIn.toString()) : null;
  const checkOut = query.checkOut ? new Date(query.checkOut.toString()) : null;
  const guests = query.guests ? parseInt(query.guests.toString()) : null;

  if (!searchLocation) {
    return hotels;
  }

  return hotels.filter((hotel) => {
    const locationMatch =
      hotel.name.toLowerCase().includes(searchLocation) ||
      hotel.location.toLowerCase().includes(searchLocation);

    if (!checkIn || !checkOut || !guests) {
      return locationMatch;
    }

    const hotelCheckIn = new Date(hotel.checkIn);
    const hotelCheckOut = new Date(hotel.checkOut);
    const guestsMatch = guests <= hotel.maxGuests;

    return (
      locationMatch &&
      hotelCheckIn <= checkOut &&
      hotelCheckOut >= checkIn &&
      guestsMatch
    );
  });
});
