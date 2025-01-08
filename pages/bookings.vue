// pages/bookings.vue
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6">My Bookings</h1>
    <div class="grid gap-6">
      <BookingCard
        v-for="booking in bookings"
        :key="booking.id"
        :booking="booking"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBookingStore } from "~/stores/useBookingStore";
import BookingCard from "~/components/sections/Booking/BookingCard.vue";

const bookingStore = useBookingStore();
const { bookings } = storeToRefs(bookingStore);

onMounted(() => {
  bookingStore.fetchUserBookings();
});
</script>
