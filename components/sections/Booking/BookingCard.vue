// components/BookingCard.vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-blue-600">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold">{{ props.booking.hotel?.name }}</h3>
        <p class="text-gray-600">{{ props.booking.hotel?.location }}</p>
      </div>
      <span :class="statusClasses">{{ props.booking.status }}</span>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p class="text-sm text-gray-500">Check-in</p>
        <p class="font-medium">{{ formatDate(props.booking.checkIn) }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Check-out</p>
        <p class="font-medium">{{ formatDate(props.booking.checkOut) }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Guests</p>
        <p class="font-medium">{{ props.booking.guests }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Rooms</p>
        <p class="font-medium">{{ props.booking.rooms }}</p>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <p class="font-bold text-lg">Total: ${{ props.booking.totalPrice }}</p>
      <p class="text-sm" :class="paymentStatusClasses">
        {{ props.booking.paymentStatus }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BookingWithDetails } from "~/types/booking";

const props = defineProps<{
  booking: BookingWithDetails;
}>();

const statusClasses = computed(() => ({
  "px-3 py-1 rounded-full text-sm": true,
  "bg-blue-100 text-blue-800": props.booking.status === "upcoming",
  "bg-green-100 text-green-800": props.booking.status === "completed",
  "bg-red-100 text-red-800": props.booking.status === "cancelled",
}));

const paymentStatusClasses = computed(() => ({
  "font-semibold": true,
  "text-green-600": props.booking.paymentStatus === "paid",
  "text-yellow-600": props.booking.paymentStatus === "pending",
  "text-red-600": props.booking.paymentStatus === "failed",
}));

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>
