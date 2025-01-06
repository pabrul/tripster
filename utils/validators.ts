// utils/validators.ts
export const validateDates = (checkIn: string, checkOut: string) => {
  return new Date(checkIn) < new Date(checkOut);
};
