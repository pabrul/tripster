// server/api/hotels/[id].ts
import { hotels } from "~/server/data/hotels";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || "0");

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    throw createError({
      statusCode: 404,
      message: "Hotel not found",
    });
  }

  return hotel;
});
