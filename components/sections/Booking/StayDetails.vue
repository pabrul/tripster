<template>
  <div class="space-y-4">
    <hr class="border-blue-600" />

    <h3 class="text-lg font-semibold">Stay Details</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        v-model="form.checkIn"
        type="date"
        label="Check-in"
        required
        :error="errors.checkIn"
      />
      <Input
        v-model="form.checkOut"
        type="date"
        label="Check-out"
        required
        :error="errors.checkOut"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        v-model="form.guests"
        type="number"
        label="Number of Guests"
        required
        :error="errors.guests"
      />
      <Input
        v-model="form.rooms"
        type="number"
        label="Number of Rooms"
        required
        :error="errors.rooms"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingForm, BookingErrors } from "~/types/booking";
import Input from "@/components/base/Input.vue";

defineProps<{
  form: BookingForm;
  errors: BookingErrors;
}>();
</script>
