<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
    <div class="flex gap-4">
      <img
        :src="hotel?.image || defaultImage"
        :alt="hotel?.name"
        class="w-32 h-32 object-cover rounded-lg"
      />
      <div>
        <h2 class="text-xl font-bold">{{ hotel?.name }}</h2>
        <p class="text-gray-600">{{ hotel?.location }}</p>
        <div class="mt-2 flex items-center gap-2">
          <Icon name="heroicons:star" class="w-5 h-5 text-yellow-400" />
          <span>{{ hotel?.rating }}/5</span>
        </div>
        <div class="mt-2 text-lg font-bold text-blue-600">
          ${{ hotel?.price }} /night
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "~/types/hotel";

defineProps<{
  hotel: Hotel | null;
  defaultImage: string;
}>();
</script>
