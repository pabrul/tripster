<template>
  <BookingId />
</template>

<script setup lang="ts">
import BookingId from "@/components/sections/Booking/index.vue";

definePageMeta({
  middleware: ["auth"],
  title: "Complete Your Booking - Tripster",
});

useHead({
  title: "Complete Your Booking - Tripster",
  meta: [
    {
      name: "description",
      content:
        "Complete your hotel booking with Tripster. Secure checkout and best price guarantee.",
    },
    {
      "http-equiv": "Cache-Control",
      content: "no-cache, no-store, must-revalidate",
    },
    { "http-equiv": "Expires", content: "0" },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
</script>
