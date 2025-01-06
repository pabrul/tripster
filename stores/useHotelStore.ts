// stores/useHotelStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAlertStore } from "@/stores/useAlertStore";
import type { Hotel } from "@/types/hotel";

export const useHotelStore = defineStore("hotel", () => {
  const alertStore = useAlertStore();
  const hotels = ref<Hotel[]>([]);
  const popularDestinations = ref<Hotel[]>([]);
  const isLoading = ref(false);
  const isLoadingPopular = ref(false);
  const searchPerformed = ref(false);

  const PAGE_SIZE = 6;
  const currentPage = ref(1);
  const isLoadingMore = ref(false);

  // Computed Properties
  const hotelsSearched = computed(() => searchPerformed.value);
  const allHotels = computed(() => {
    if (searchPerformed.value) {
      return hotels.value;
    }
    return popularDestinations.value;
  });

  const displayedHotels = computed(() => {
    const end = currentPage.value * PAGE_SIZE;
    return allHotels.value.slice(0, end);
  });

  const hasMoreHotels = computed(() => {
    return displayedHotels.value.length < allHotels.value.length;
  });

  const loadMore = async () => {
    if (isLoadingMore.value || !hasMoreHotels.value) return;

    isLoadingMore.value = true;
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulação de delay
    currentPage.value++;
    isLoadingMore.value = false;
  };

  const resetPagination = () => {
    currentPage.value = 1;
    isLoadingMore.value = false;
  };

  const fetchPopularDestinations = async () => {
    if (isLoadingPopular.value || popularDestinations.value.length > 0) return;

    isLoadingPopular.value = true;
    resetPagination();

    try {
      const response = await $fetch<Hotel[]>("/api/hotels");
      // Aqui está alteração importante - filtramos apenas para destinos populares
      popularDestinations.value = response.filter((hotel) => hotel.popular);
    } catch (error) {
      console.error(error);
      alertStore.showAlert("Failed to load popular destinations.", "error");
      popularDestinations.value = [];
    } finally {
      isLoadingPopular.value = false;
    }
  };

  const fetchHotels = async (filters: Record<string, any>) => {
    isLoading.value = true;
    searchPerformed.value = true;
    resetPagination();

    try {
      const response = await $fetch<Hotel[]>("/api/hotels", {
        params: filters,
      });
      // Aqui NÃO filtramos - mostramos todos os hotéis retornados da busca
      hotels.value = response;
    } catch (error) {
      console.error(error);
      alertStore.showAlert("Failed to fetch hotels.", "error");
      hotels.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const resetSearch = () => {
    hotels.value = [];
    searchPerformed.value = false;
    alertStore.showAlert("Search reset to popular destinations.", "success");
  };

  return {
    hotels,
    popularDestinations,
    isLoading,
    isLoadingPopular,
    isLoadingMore,
    hasMoreHotels,
    hotelsSearched,
    displayedHotels,
    fetchHotels,
    fetchPopularDestinations,
    resetSearch,
    loadMore,
  };
});
