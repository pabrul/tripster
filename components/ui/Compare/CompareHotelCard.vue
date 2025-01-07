<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
  >
    <!-- Hotel Image Section -->
    <div class="relative h-48 group">
      <img
        :src="hotel.image || defaultImage"
        :alt="hotel.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <button
        @click="$emit('remove', hotel.id)"
        class="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
      >
        <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <!-- Hotel Info Section -->
    <div class="p-6 space-y-4">
      <HotelInfo :hotel="hotel" />
      <HotelPricing :price="hotel.price" />
      <Button variant="primary" class="w-full" @click="$emit('book', hotel.id)">
        Book Now
      </Button>
    </div>

    <!-- Features Section -->
    <HotelFeatures :features="features" class="border-t" />
  </div>
</template>

<script setup lang="ts">
import type { Hotel, HotelFeature } from "~/types/hotel";
import HotelInfo from "./HotelInfo.vue";
import HotelPricing from "./HotelPricing.vue";
import HotelFeatures from "./HotelFeatures.vue";
import Button from "~/components/base/Button.vue";

interface Props {
  hotel: Hotel;
  features: HotelFeature[];
  defaultImage: string;
}

defineProps<Props>();
defineEmits<{
  (e: "remove", id: number): void;
  (e: "book", id: number): void;
}>();
</script>
