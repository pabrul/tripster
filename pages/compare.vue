// pages/compare.vue
<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold">Compare Hotels</h1>
          <p class="text-gray-600 mt-2">
            Compare features and prices to find your perfect stay
          </p>
        </div>
        <Button variant="secondary" @click="router.push('/')">
          <Icon name="heroicons:arrow-left" class="mr-2" />
          Back to Search
        </Button>
      </header>

      <!-- Comparison Grid -->
      <div v-if="selectedHotels?.length > 0" class="grid grid-cols-3 gap-6">
        <CompareHotelCard
          v-for="hotel in selectedHotels"
          :key="hotel.id"
          :hotel="hotel"
          :features="hotelFeatures"
          :default-image="imageUrl"
          @remove="removeHotel"
          @book="bookHotel"
        />
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        type="empty"
        title="No Hotels Selected"
        message="Select hotels to compare from the search results"
      >
        <template #action>
          <Button variant="primary" @click="router.push('/')">
            Back to Search
          </Button>
        </template>
      </EmptyState>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCompareStore } from "~/stores/useCompareStore";
import { useAlertStore } from "~/stores/useAlertStore";
import type { HotelFeature } from "~/types/hotel";

// Importações dos componentes
import Button from "~/components/base/Button.vue";
import EmptyState from "~/components/base/EmptyState.vue";
import CompareHotelCard from "~/components/ui/Compare/CompareHotelCard.vue";
import HotelInfo from "~/components/ui/Compare/HotelInfo.vue";
import HotelPricing from "~/components/ui/Compare/HotelPricing.vue";
import HotelFeatures from "~/components/ui/Compare/HotelFeatures.vue";

// Setup do router e stores
const router = useRouter();
const compareStore = useCompareStore();
const alertStore = useAlertStore();

// Refs do store
const { selectedHotels } = storeToRefs(compareStore);

// Constantes e refs
const imageUrl = ref(
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg"
);

const hotelFeatures = ref<HotelFeature[]>([
  { name: "Free WiFi", available: true },
  { name: "Pool", available: true },
  { name: "Spa", available: false },
  { name: "Restaurant", available: true },
  { name: "Room Service", available: true },
  { name: "Fitness Center", available: false },
]);

// Métodos
const removeHotel = (hotelId: number) => {
  compareStore.removeFromCompare(hotelId);
  alertStore.showAlert("Hotel removed from comparison", "info");
};

const bookHotel = (hotelId: number) => {
  alertStore.showAlert("Booking feature coming soon!", "info");
};

// Lifecycle hooks
onMounted(() => {
  if (selectedHotels.value.length === 0) {
    alertStore.showAlert("Select hotels to compare", "info");
  }

  // Debug
  console.log("Selected Hotels:", selectedHotels.value);
});
</script>
