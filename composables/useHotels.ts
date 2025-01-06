// composables/useHotels.ts
import { ref } from "vue";
import type { Hotel } from "@/types/hotel";

const hotels = ref<Hotel[]>([]);

export function useHotels() {
  const fetchHotels = async (filters: Record<string, any>) => {
    const res = await $fetch<Hotel[]>("/api/hotels", { params: filters });
    hotels.value = res;
  };

  return { hotels, fetchHotels };
}
