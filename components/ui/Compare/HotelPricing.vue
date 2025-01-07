// components/ui/Compare/HotelPricing.vue
<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between pt-4 border-t">
      <span class="text-sm text-gray-600">Starting from</span>
      <div class="text-2xl font-bold text-blue-600">${{ price }}</div>
    </div>
    <div class="text-xs text-gray-500 text-right">
      Per night, taxes included
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  price: number;
}>();
</script>
