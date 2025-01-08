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
    <div
      v-else-if="displayedHotels?.length"
      class="grid grid-cols-3 md:grid-cols-12 gap-4"
    >
      <div
        v-for="hotel in displayedHotels"
        :key="hotel.id"
        :class="{ 'col-span-4': true, 'space-y-4': !hotel.large }"
      >
        <DestinationCard
          :hotel="hotel"
          :name="hotel.name"
          :image="hotel.image"
          :large="hotel.large || false"
        />
      </div>

      <div v-if="isLoadingMore" class="col-span-12 mt-8">
        <SkeletonDestinationGrid :count="3" />
      </div>

      <!-- Sticky Compare Bar -->
      <CompareBar
        :selected-hotels="selectedHotels"
        @compare="navigateToCompare"
        :default-image="imageUrl"
        @reset="resetSelectedHotels"
      />
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
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import CompareBar from "@/components/ui/Compare/CompareBar.vue";
import DestinationCard from "@/components/ui/Destination/DestinationCard.vue";
import SkeletonDestinationGrid from "@/components/base/Skeleton/SkeletonDestinationGrid.vue";
import EmptyState from "@/components/base/EmptyState.vue";
import Button from "@/components/base/Button.vue";
import { useHotelStore } from "@/stores/useHotelStore";
import { useCompareStore } from "~/stores/useCompareStore";
import { useAlertStore } from "@/stores/useAlertStore";

const router = useRouter();
const alertStore = useAlertStore();
const hotelStore = useHotelStore();
const compareStore = useCompareStore();

const { selectedHotels } = storeToRefs(compareStore);

const resetSelectedHotels = () => {
  selectedHotels.value = [];
};

const {
  displayedHotels,
  hotelsSearched,
  isLoading,
  isLoadingPopular,
  isLoadingMore,
  hasMoreHotels,
} = storeToRefs(hotelStore);

const { fetchPopularDestinations, resetSearch, loadMore } = hotelStore;

const navigateToCompare = () => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    router.push(
      `/login?redirect=/compare?hotels=${selectedHotels.value
        .map((h) => h.id)
        .join(",")}`
    );
    alertStore.showAlert("Please login to compare hotels", "info");
    return;
  }

  router.push(
    `/compare?hotels=${selectedHotels.value.map((h) => h.id).join(",")}`
  );
};

const handleScroll = () => {
  // Removemos a verificação do isLoadingMore aqui porque queremos que ela aconteça dentro do if
  if (!hasMoreHotels?.value) return;

  const scrolledToBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200;

  if (scrolledToBottom && !isLoadingMore.value) {
    // Verificamos isLoadingMore aqui
    loadMore();
  }
};

const imageUrl =
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg";

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  try {
    console.log("Fetching popular destinations...");
    await fetchPopularDestinations();
    console.log("Popular destinations loaded");
  } catch (error) {
    console.error("Error loading popular destinations:", error);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
