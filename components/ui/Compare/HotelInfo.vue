// components/ui/Compare/HotelInfo.vue
<script setup lang="ts">
import type { Hotel } from "~/types/hotel";

defineProps<{
  hotel: Hotel;
}>();
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold">{{ hotel.name }}</h2>

    <div class="flex items-center gap-2 text-gray-600">
      <Icon name="heroicons:map-pin" class="w-5 h-5" />
      <span>{{ hotel.location }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <!-- Rating stars -->
      <div class="flex items-center gap-1">
        <Icon
          v-for="i in 5"
          :key="i"
          :name="i <= hotel.rating ? 'heroicons:star-solid' : 'heroicons:star'"
          :class="i <= hotel.rating ? 'text-yellow-400' : 'text-gray-300'"
          class="w-5 h-5"
        />
        <span class="ml-2 text-sm text-gray-600">{{ hotel.rating }}/5</span>
      </div>
      <div class="text-sm text-gray-500">
        {{ Math.floor(hotel.rating * 20) }}% Positive Reviews
      </div>
    </div>
  </div>
</template>
