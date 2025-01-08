// components/sections/Booking/index.vue
<template>
  <div class="min-h-screen p-8">
    <div class="max-w-3xl mx-auto">
      <BookingHeader
        title="Book Your Stay"
        subtitle="Complete your reservation"
      />
      <HotelSummary
        :hotel="hotel"
        :defaultImage="defaultImageUrl"
        :available="available"
      />
      <BookingForm
        :hotel-id="hotel?.id"
        :hotel-price="hotel?.price || 0"
        @submit="handleBooking"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAlertStore } from "~/stores/useAlertStore";
import { useBookingStore } from "~/stores/useBookingStore";
import type { Hotel, HotelFeature } from "~/types/hotel";
import BookingForm from "./BookingForm.vue";
import BookingHeader from "~/components/sections/Booking/BookingHeader.vue";
import HotelSummary from "~/components/sections/Hotel/HotelSummary.vue";

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();
const bookingStore = useBookingStore();

const hotel = ref<Hotel | null>(null);
const defaultImageUrl = "https://example.com/default.jpg";
const available = ref<HotelFeature>({
  name: "availability",
  available: Math.random() > 0.5,
});

const fetchHotelData = async () => {
  try {
    const hotelId = route.params.id;
    hotel.value = await $fetch<Hotel>(`/api/hotels/${hotelId}`);
  } catch (error) {
    alertStore.showAlert("Failed to load hotel details", "error");
    router.push("/");
  }
};

const handleBooking = async (bookingData: any) => {
  try {
    await bookingStore.createBooking(bookingData);
    alertStore.showAlert("Booking confirmed successfully!", "success");
    router.push("/bookings");
  } catch {
    alertStore.showAlert("Failed to process booking", "error");
  }
};

onMounted(fetchHotelData);
</script>
