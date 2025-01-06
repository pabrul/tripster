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

  const hotelsSearched = computed(() => searchPerformed.value);
  const displayedHotels = computed(() => {
    if (searchPerformed.value) {
      return hotels.value;
    }
    return popularDestinations.value;
  });

  const fetchPopularDestinations = async () => {
    if (isLoadingPopular.value || popularDestinations.value.length > 0) {
      return;
    }

    isLoadingPopular.value = true;
    console.log("Started loading popular destinations");

    try {
      const response = await $fetch<Hotel[]>("/api/hotels");
      console.log("API response:", response);

      if (!response || !Array.isArray(response)) {
        throw new Error("Invalid API response");
      }

      // Transformando os dados para corresponder à interface Hotel
      const popularHotels = response
        .filter((hotel) => hotel.popular === true)
        .map((hotel) => ({
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          price: hotel.price,
          rating: hotel.rating,
          large: hotel.large,
          popular: hotel.popular,
          image: hotel.image || undefined, // Adicionando image como opcional
        }));

      console.log("Filtered popular hotels:", popularHotels);
      popularDestinations.value = popularHotels;

      if (popularHotels.length === 0) {
        console.warn("No popular hotels found");
        alertStore.showAlert("No popular destinations found.", "warning");
      }
    } catch (error) {
      console.error("Error fetching popular destinations:", error);
      alertStore.showAlert("Failed to load popular destinations.", "error");
      popularDestinations.value = [];
    } finally {
      console.log("Finished loading popular destinations");
      isLoadingPopular.value = false;
    }
  };

  const fetchHotels = async (filters: Record<string, any>) => {
    isLoading.value = true;
    searchPerformed.value = true;

    try {
      const response = await $fetch<Hotel[]>("/api/hotels", {
        params: filters,
      });

      // Transformando os dados para corresponder à interface Hotel
      hotels.value = response.map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        price: hotel.price,
        rating: hotel.rating,
        large: hotel.large,
        popular: hotel.popular,
        image: hotel.image || undefined,
      }));

      if (hotels.value.length === 0) {
        alertStore.showAlert("No results found.", "error");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
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
    hotelsSearched,
    displayedHotels,
    fetchHotels,
    fetchPopularDestinations,
    resetSearch,
  };
});
