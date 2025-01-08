// stores/useBookingStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { BookingWithDetails } from "~/types/booking";

export const useBookingStore = defineStore("booking", () => {
  const bookings = ref<BookingWithDetails[]>([]);
  const isLoading = ref(false);

  const fetchUserBookings = async () => {
    isLoading.value = true;
    try {
      bookings.value = await $fetch("/api/bookings");
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const createBooking = async (bookingData: any) => {
    isLoading.value = true;
    try {
      const newBooking = await $fetch("/api/bookings", {
        method: "POST",
        body: bookingData,
      });
      bookings.value.push(newBooking);
      return newBooking;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    bookings,
    isLoading,
    fetchUserBookings,
    createBooking,
  };
});
