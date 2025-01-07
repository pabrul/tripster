// composables/useBooking.ts
import type { BookingForm, BookingErrors } from "~/types/booking";

export const useBooking = () => {
  const validateForm = (form: BookingForm) => {
    const errors: BookingErrors = {};

    if (!form.firstName) errors.firstName = "First name is required";
    if (!form.lastName) errors.lastName = "Last name is required";
    if (!form.email) errors.email = "Email is required";
    if (!form.phone) errors.phone = "Phone is required";
    if (!form.checkIn) errors.checkIn = "Check-in date is required";
    if (!form.checkOut) errors.checkOut = "Check-out date is required";
    if (form.guests < 1) errors.guests = "At least 1 guest is required";
    if (form.rooms < 1) errors.rooms = "At least 1 room is required";

    return errors;
  };

  const calculateNights = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return {
    validateForm,
    calculateNights,
  };
};
