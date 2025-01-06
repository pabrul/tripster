// pages/compare.vue
<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Compare Hotels</h1>
        <Button variant="secondary" @click="router.push('/')">
          <Icon name="heroicons:arrow-left" class="mr-2" />
          Back to Search
        </Button>
      </div>

      <!-- Comparison Grid -->
      <div class="grid grid-cols-3 gap-6">
        <template v-for="hotel in selectedHotels" :key="hotel.id">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <!-- Hotel Image -->
            <div class="relative h-48">
              <img
                :src="hotel.image || imageUrl"
                :alt="hotel.name"
                class="w-full h-full object-cover"
              />
              <button
                @click="removeHotel(hotel.id)"
                class="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <!-- Hotel Details -->
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">{{ hotel.name }}</h2>

              <!-- Location -->
              <div class="flex items-center gap-2 mb-4">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-500" />
                <span>{{ hotel.location }}</span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2 mb-4">
                <div class="flex items-center">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    :name="
                      i <= hotel.rating
                        ? 'heroicons:star-solid'
                        : 'heroicons:star'
                    "
                    class="w-5 h-5"
                    :class="
                      i <= hotel.rating ? 'text-yellow-400' : 'text-gray-300'
                    "
                  />
                </div>
                <span class="text-sm text-gray-600">{{ hotel.rating }}/5</span>
              </div>

              <!-- Price -->
              <div class="flex items-center justify-between mt-6 pt-6 border-t">
                <div class="text-sm text-gray-600">Starting from</div>
                <div class="text-2xl font-bold text-blue-600">
                  ${{ hotel.price }}
                </div>
              </div>

              <!-- Book Button -->
              <Button
                variant="primary"
                class="w-full mt-4"
                @click="bookHotel(hotel.id)"
              >
                Book Now
              </Button>
            </div>

            <!-- Feature Comparison -->
            <div class="p-6 bg-gray-50">
              <h3 class="font-semibold mb-4">Features</h3>
              <ul class="space-y-3">
                <li
                  v-for="feature in hotelFeatures"
                  :key="feature.name"
                  class="flex items-center gap-2"
                >
                  <Icon
                    :name="
                      feature.available
                        ? 'heroicons:check-circle'
                        : 'heroicons:x-circle'
                    "
                    :class="
                      feature.available ? 'text-green-500' : 'text-red-500'
                    "
                    class="w-5 h-5"
                  />
                  <span>{{ feature.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-if="selectedHotels.length === 0"
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
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCompareStore } from "~/stores/useCompareStore";
import { useAlertStore } from "~/stores/useAlertStore";

const router = useRouter();
const compareStore = useCompareStore();
const alertStore = useAlertStore();
const { selectedHotels } = storeToRefs(compareStore);

const imageUrl =
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg";

const hotelFeatures = [
  { name: "Free WiFi", available: true },
  { name: "Pool", available: true },
  { name: "Spa", available: false },
  { name: "Restaurant", available: true },
  { name: "Room Service", available: true },
  { name: "Fitness Center", available: false },
];

const removeHotel = (hotelId: number) => {
  compareStore.removeFromCompare(hotelId);
  alertStore.showAlert("Hotel removed from comparison", "info");
};

const bookHotel = (hotelId: number) => {
  alertStore.showAlert("Booking feature coming soon!", "info");
};

onMounted(() => {
  if (selectedHotels.value.length === 0) {
    alertStore.showAlert("Select hotels to compare", "info");
  }
});
</script>
