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
          :hotel="hotel"
          :name="hotel.name"
          :image="hotel.image || imageUrl"
          :large="hotel.large || false"
        />
      </div>

      <div v-if="isLoadingMore" class="col-span-12 mt-8">
        <SkeletonDestinationGrid :count="3" />
      </div>

      <!-- Botão de comparação -->
      <div
        v-if="selectedHotels.length > 0"
        class="fixed bottom-0 left-0 right-0 px-4"
      >
        <div class="max-w-7xl mx-auto p-4">
          <div
            class="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between"
          >
            <div>
              <h4 class="font-semibold">Selected Hotels</h4>
              <p class="text-sm text-gray-600">
                {{ selectedHotels.length }}/3 hotels selected
              </p>
            </div>

            <div class="flex items-center gap-4">
              <Button
                v-if="selectedHotels.length < 2"
                variant="outline"
                size="md"
                disabled
              >
                Select at least 2 hotels
              </Button>
              <Button
                v-else
                @click="navigateToCompare"
                variant="primary"
                size="lg"
                rounded
              >
                <template #icon>
                  <Icon
                    name="heroicons:arrows-right-left"
                    class="w-5 h-5 mr-2"
                  />
                </template>
                Compare {{ selectedHotels.length }} Hotels
              </Button>
            </div>
          </div>
        </div>
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
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import DestinationCard from "@/components/ui/Destination/DestinationCard.vue";
import SkeletonDestinationGrid from "@/components/base/Skeleton/SkeletonDestinationGrid.vue";
import EmptyState from "@/components/base/EmptyState.vue";
import Button from "@/components/base/Button.vue";
import { useHotelStore } from "@/stores/useHotelStore";
import { useCompareStore } from "~/stores/useCompareStore";

const router = useRouter();

const hotelStore = useHotelStore();
const compareStore = useCompareStore();

const { selectedHotels } = storeToRefs(compareStore);

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
  const hotelIds = selectedHotels.value.map((h) => h.id).join(",");
  router.push(`/compare?hotels=${hotelIds}`);
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
