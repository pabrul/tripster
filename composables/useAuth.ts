//composables/useAuth.ts
import { ref } from "vue";
import type { Hotel } from "@/types/hotel"; // Importando o tipo Hotel

export default function useHotels() {
  const hotels = ref<Hotel[]>([]);

  const fetchHotels = async (filters: Record<string, any>) => {
    // Simulação de chamada SSR
    const res = await $fetch<Hotel[]>("/api/hotels", { params: filters });
    hotels.value = res;
  };

  return { hotels, fetchHotels };
}
