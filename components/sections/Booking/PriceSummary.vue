<template>
  <div class="bg-gray-50 p-4 rounded-lg space-y-2">
    <div class="flex justify-between">
      <span>Room Rate (per night)</span>
      <span>${{ price }}</span>
    </div>
    <div class="flex justify-between">
      <span>Number of Nights</span>
      <span>{{ nights }}</span>
    </div>
    <div class="flex justify-between font-bold text-lg pt-2 border-t">
      <span>Total</span>
      <span>${{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  price: number;
  nights: number;
  total: number;
}>();
</script>
