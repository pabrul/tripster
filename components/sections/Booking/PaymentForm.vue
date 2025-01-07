<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Payment Details</h3>
    <Input
      v-model="form.cardNumber"
      label="Card Number"
      placeholder="1234 5678 9012 3456"
      required
      :error="errors.cardNumber"
    />
    <div class="grid grid-cols-3 gap-4">
      <Input
        v-model="form.expMonth"
        label="Month"
        placeholder="MM"
        required
        :error="errors.expMonth"
      />
      <Input
        v-model="form.expYear"
        label="Year"
        placeholder="YY"
        required
        :error="errors.expYear"
      />
      <Input
        v-model="form.cvv"
        label="CVV"
        placeholder="123"
        required
        :error="errors.cvv"
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
