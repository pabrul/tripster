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

definePageMeta({
  title: "Book Your Stay | Tripster",
  middleware: ["auth"],
});

useHead({
  title: "Complete Your Hotel Booking | Tripster",
  meta: [
    {
      name: "description",
      content:
        "Secure your hotel reservation with our easy booking process. Best price guarantee and free cancellation available.",
    },
    // Cache control for booking page
    {
      "http-equiv": "Cache-Control",
      content: "no-cache, no-store, must-revalidate",
    },
    { "http-equiv": "Pragma", content: "no-cache" },
    // Open Graph
    { property: "og:title", content: "Book Your Stay with Tripster" },
    { property: "og:type", content: "website" },
    {
      property: "og:description",
      content: "Secure your hotel reservation now. Best rates guaranteed!",
    },
    // Keywords
    {
      name: "keywords",
      content:
        "hotel booking, reserve hotel, book accommodation, hotel reservation",
    },
    { name: "robots", content: "noindex, nofollow" }, // Não indexar página de booking
  ],
});

const bookingStore = useBookingStore();
const { bookings } = storeToRefs(bookingStore);

onMounted(() => {
  bookingStore.fetchUserBookings();
});
</script>
