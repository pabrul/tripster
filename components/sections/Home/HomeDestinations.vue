// components/sections/Home/HomeDestinations.vue
<template>
  <section class="mt-16">
    <h3 class="text-2xl font-bold mb-6">
      {{ hotelsSearched ? "Search Results" : "Popular Destinations" }}
    </h3>

    <!-- Estado de loading com skeleton -->
    <div v-if="isLoading || isLoadingPopular">
      <SkeletonDestinationGrid />
    </div>

    <!-- Exibição de hotéis -->
    <div v-else-if="displayedHotels?.length" class="grid grid-cols-12 gap-4">
      <div
        v-for="hotel in displayedHotels"
        :key="hotel.id"
        :class="{ 'col-span-4': true, 'space-y-4': !hotel.large }"
      >
        <DestinationCard
          :name="hotel.name"
          :image="hotel.image || imageUrl"
          :large="hotel.large || false"
        />
      </div>
    </div>

    <!-- Estado de "Nenhum resultado encontrado" -->
    <EmptyState
      v-else-if="hotelsSearched"
      type="search"
      title="No Results Found"
      message="Try adjusting your search criteria or explore our popular destinations."
    >
      <template #action>
        <button
          @click="resetSearch"
          class="mt-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          View Popular Destinations
        </button>
      </template>
    </EmptyState>

    <!-- Estado de erro ao carregar destinos populares -->
    <EmptyState
      v-else
      type="error"
      title="Unable to Load Destinations"
      message="Please try refreshing the page or try again later."
    />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import DestinationCard from "@/components/ui/Destination/DestinationCard.vue";
import SkeletonDestinationGrid from "@/components/base/Skeleton/SkeletonDestinationGrid.vue";
import EmptyState from "@/components/base/EmptyState.vue";
import { useHotelStore } from "@/stores/useHotelStore";

const hotelStore = useHotelStore();
const { displayedHotels, hotelsSearched, isLoading, isLoadingPopular } =
  storeToRefs(hotelStore);
const { fetchPopularDestinations, resetSearch } = hotelStore;

const imageUrl =
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg";

onMounted(async () => {
  try {
    console.log("Fetching popular destinations...");
    await fetchPopularDestinations();
    console.log("Popular destinations loaded");
  } catch (error) {
    console.error("Error loading popular destinations:", error);
  }
});
</script>
