// server/api/bookings/index.get.ts
import { bookings } from "../../data/bookings";
export default defineEventHandler(() => bookings);
