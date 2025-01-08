// components/sections/Booking/BookingForm.vue
<template>
  <div class="bg-white rounded-lg shadow-sm p-6 border border-blue-600">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <GuestForm :form="form" :errors="errors" />
      <StayDetails :form="form" :errors="errors" />
      <PaymentForm :form="form" :errors="errors" />
      <PriceSummary
        :price="hotelPrice"
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
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useBooking } from "~/composables/useBooking";
import type { BookingForm, BookingErrors } from "~/types/booking";
import GuestForm from "~/components/sections/Booking/GuestForm.vue";
import StayDetails from "~/components/sections/Booking/StayDetails.vue";
import PaymentForm from "~/components/sections/Booking/PaymentForm.vue";
import PriceSummary from "~/components/sections/Booking/PriceSummary.vue";
import Button from "@/components/base/Button.vue";

const props = defineProps<{
  hotelId: number | undefined; // ou hotelId?: number
  hotelPrice: number;
}>();

const emit = defineEmits<{
  (e: "submit", booking: any): void;
}>();

const { validateForm, calculateNights } = useBooking();
const isLoading = ref(false);

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
  () => props.hotelPrice * numberOfNights.value * form.rooms
);

const handleSubmit = async () => {
  const validationErrors = validateForm(form);
  if (Object.keys(validationErrors).length > 0) {
    Object.assign(errors, validationErrors);
    return;
  }

  isLoading.value = true;
  try {
    emit("submit", {
      ...form,
      hotelId: props.hotelId,
      totalPrice: totalPrice.value,
      nights: numberOfNights.value,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
