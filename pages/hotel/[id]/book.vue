// pages/hotel/[id]/book.vue
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
      <div class="bg-white rounded-lg shadow-sm p-6 border border-blue-600">
        <form @submit.prevent="handleBooking" class="space-y-6">
          <GuestForm :form="form" :errors="errors" />
          <StayDetails :form="form" :errors="errors" />
          <PaymentForm :form="form" :errors="errors" />
          <PriceSummary
            :price="hotel?.price || 0"
            :nights="numberOfNights"
            :total="totalPrice"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="isLoading"
          >
            {{ isLoading ? "Processing..." : "Complete Booking" }}
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAlertStore } from "~/stores/useAlertStore";
import { useAuthStore } from "~/stores/auth";
import { useBookingStore } from "~/stores/useBookingStore";
import { useBooking } from "~/composables/useBooking";
import type { Hotel, HotelFeature } from "~/types/hotel";
import type { BookingForm, BookingErrors } from "~/types/booking";
import Button from "@/components/base/Button.vue";

import BookingHeader from "~/components/sections/Booking/BookingHeader.vue";
import HotelSummary from "~/components/sections/Hotel/HotelSummary.vue";
import GuestForm from "~/components/sections/Booking/GuestForm.vue";
import StayDetails from "~/components/sections/Booking/StayDetails.vue";
import PaymentForm from "~/components/sections/Booking/PaymentForm.vue";
import PriceSummary from "~/components/sections/Booking/PriceSummary.vue";

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();
const authStore = useAuthStore();
const bookingStore = useBookingStore();
const { validateForm, calculateNights } = useBooking();

const hotel = ref<Hotel | null>(null);
const isLoading = ref(false);
const defaultImageUrl = "https://example.com/default.jpg";

const available = ref<HotelFeature>({
  name: "availability",
  available: Math.random() > 0.5, // Gera true ou false aleatoriamente
});

const form = reactive<BookingForm>({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "1234567890",
  checkIn: "2025-01-15",
  checkOut: "2025-01-20",
  guests: 2,
  rooms: 1,
  cardNumber: "4111111111111111",
  expMonth: "12",
  expYear: "2025",
  cvv: "123",
});

const errors = reactive<BookingErrors>({});

const numberOfNights = computed(() =>
  calculateNights(form.checkIn, form.checkOut)
);

const totalPrice = computed(
  () => (hotel.value?.price || 0) * numberOfNights.value * form.rooms
);

const fetchHotelData = async () => {
  try {
    const hotelId = route.params.id;
    const response = await $fetch<Hotel>(`/api/hotels/${hotelId}`);
    hotel.value = response;
  } catch (error) {
    alertStore.showAlert("Failed to load hotel details", "error");
    router.push("/");
  }
};

const handleBooking = async () => {
  const validationErrors = validateForm(form);
  if (Object.keys(validationErrors).length > 0) {
    Object.assign(errors, validationErrors);
    return;
  }

  try {
    isLoading.value = true;
    await bookingStore.createBooking({
      ...form,
      hotelId: hotel.value?.id,
      totalPrice: totalPrice.value,
      nights: numberOfNights.value,
    });
    alertStore.showAlert("Booking confirmed successfully!", "success");
    router.push("/bookings");
  } catch (error) {
    alertStore.showAlert("Failed to process booking", "error");
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchHotelData);
</script>
