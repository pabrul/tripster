// stores/useCompareStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Hotel } from "@/types/hotel";

export const useCompareStore = defineStore("compare", () => {
  const selectedHotels = ref<Hotel[]>([]);
  const maxComparisons = 3;

  const addToCompare = (hotel: Hotel) => {
    if (selectedHotels.value.length < maxComparisons) {
      selectedHotels.value.push(hotel);
    }
  };

  const removeFromCompare = (hotelId: number) => {
    selectedHotels.value = selectedHotels.value.filter((h) => h.id !== hotelId);
  };

  return { selectedHotels, addToCompare, removeFromCompare };
});
