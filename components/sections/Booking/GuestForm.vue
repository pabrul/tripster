<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Guest Information</h3>
    <div class="grid grid-cols-2 gap-4">
      <Input
        v-model="form.firstName"
        label="First Name"
        required
        :error="errors.firstName"
      />
      <Input
        v-model="form.lastName"
        label="Last Name"
        required
        :error="errors.lastName"
      />
    </div>
    <Input
      v-model="form.email"
      type="email"
      label="Email"
      required
      :error="errors.email"
    />
    <Input v-model="form.phone" label="Phone" required :error="errors.phone" />
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
