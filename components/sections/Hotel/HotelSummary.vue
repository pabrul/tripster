<template>
  <div
    class="bg-white border border-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8"
  >
    <div class="flex flex-col md:flex-row">
      <div class="relative w-full md:w-48 h-48">
        <img
          loading="lazy"
          :src="hotel?.image || defaultImage"
          :alt="hotel?.name"
          class="w-full h-full object-cover"
        />
        <span
          v-if="hotel?.popular"
          class="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
        >
          Popular
        </span>
      </div>

      <div class="flex-1 p-6">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {{ hotel?.name }}
            </h2>
            <div class="flex items-center text-gray-600 mb-4">
              <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2" />
              <span>{{ hotel?.location }}</span>
            </div>
          </div>

          <div class="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
            <Icon name="heroicons:star" class="w-5 h-5 text-yellow-400 mr-1" />
            <span class="font-semibold">{{ hotel?.rating }}/5</span>
          </div>
        </div>

        <div class="flex items-center justify-between mt-auto">
          <div>
            <span class="text-sm text-gray-600">Price</span>
            <div class="text-2xl font-bold text-blue-600">
              ${{ hotel?.price }}
              <span class="text-sm font-normal text-gray-600">/night</span>
            </div>
          </div>

          <div v-if="available" class="flex items-center gap-2">
            <Icon
              name="heroicons:check-circle"
              class="w-5 h-5 text-green-500"
            />
            <span class="text-sm text-gray-600">Disponível</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel, HotelFeature } from "~/types/hotel";

interface Props {
  hotel: Hotel | null;
  available: HotelFeature | null;
  defaultImage: string;
}

defineProps<Props>();
</script>
