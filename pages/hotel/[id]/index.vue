<template>
  <div class="min-h-screen">
    <!-- Conteúdo Principal -->
    <main>
      <!-- Seção de Imagem -->
      <div
        class="relative w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] overflow-hidden"
      >
        <img
          loading="lazy"
          :src="hotel?.image || defaultImageUrl"
          :alt="hotel?.name"
          class="w-full h-full object-cover border rounded-xl"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent border rounded-xl"
        ></div>
        <div class="absolute bottom-4 left-4 text-white max-w-3xl">
          <div class="flex items-center gap-4 mb-2">
            <span
              v-if="hotel?.popular"
              class="bg-blue-600 px-4 py-1 rounded-full text-sm font-medium"
            >
              Popular
            </span>
            <div class="flex items-center bg-black/40 px-4 py-1 rounded-full">
              <Icon name="heroicons:star" class="w-5 h-5 text-yellow-400" />
              <span class="ml-1 font-medium">{{ hotel?.rating }}/5</span>
            </div>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold">{{ hotel?.name }}</h1>
          <p class="flex items-center text-lg mt-1">
            <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2" />
            {{ hotel?.location }}
          </p>
        </div>
      </div>

      <!-- Detalhes e Reserva -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative">
        <div
          class="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border border-blue-600"
        >
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Coluna 1: Detalhes Principais -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Preço e Capacidade -->
              <div
                class="flex flex-wrap items-center justify-between gap-4 p-6 bg-blue-50 rounded-xl"
              >
                <div class="space-y-1">
                  <p class="text-gray-600">Price per night</p>
                  <div class="flex items-baseline">
                    <span class="text-3xl font-bold text-blue-600"
                      >${{ hotel?.price }}</span
                    >
                    <span class="ml-1 text-gray-600">/night</span>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Icon
                    name="heroicons:user-group"
                    class="w-6 h-6 text-gray-600"
                  />
                  <div>
                    <p class="text-sm text-gray-600">Capacity</p>
                    <p class="font-medium">
                      {{ hotel?.maxGuests || 2 }} guests
                    </p>
                  </div>
                </div>
              </div>

              <!-- Amenidades -->
              <HotelFeatures :features="hotelFeatures" class="border-t" />

              <!-- Informações Adicionais -->
              <div class="space-y-4">
                <h2 class="text-2xl font-semibold">Hotel Information</h2>
                <p class="text-gray-600 leading-relaxed">
                  This hotel offers a unique experience, combining comfort and
                  privileged location. Perfect for business trips or leisure.
                </p>
              </div>
            </div>

            <!-- Coluna 2: Reserva -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 bg-blue-50 rounded-xl p-6 space-y-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">Make Reservation</h3>
                  <div class="space-y-2">
                    <p class="flex items-center text-gray-600">
                      <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
                      Check-in: {{ hotel?.checkIn }}
                    </p>
                    <p class="flex items-center text-gray-600">
                      <Icon name="heroicons:clock" class="w-5 h-5 mr-2" />
                      Check-out: {{ hotel?.checkOut }}
                    </p>
                  </div>
                </div>

                <Button
                  @click="navigateToBooking"
                  variant="primary"
                  size="lg"
                  class="w-full py-4 text-lg font-semibold"
                >
                  Reservar Agora
                </Button>

                <div class="text-center space-y-2">
                  <p class="text-sm text-gray-500">
                    No cancellation fee up to 48 hours in advance
                  </p>
                  <p class="text-sm text-gray-500">Immediate confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Hotel } from "~/types/hotel";
import Button from "~/components/base/Button.vue";

const route = useRoute();
const router = useRouter();
const hotel = ref<Hotel | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const defaultImageUrl = "https://via.placeholder.com/800x600";

definePageMeta({
  middleware: ["auth"],
  title: `${hotel.value?.name} - Tripster`,
});

useHead({
  title: `${hotel.value?.name || "Hotel Details"} | Tripster`,
  meta: [
    {
      name: "description",
      content: `${
        hotel.value?.name ||
        "View hotel details, photos, amenities, and guest reviews. Book your stay at the best rates."
      }`,
    },
  ],
});

const hotelFeatures = ref([
  { name: "Free WiFi", available: true },
  { name: "Pool", available: true },
  { name: "Spa", available: false },
  { name: "Restaurant", available: true },
  { name: "Room Service", available: true },
  { name: "Fitness Center", available: false },
]);

const fetchHotelData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const hotelId = route.params.id;
    hotel.value = await $fetch(`/api/hotels/${hotelId}`);
  } catch (err) {
    error.value = "Não foi possível carregar as informações do hotel.";
  } finally {
    loading.value = false;
  }
};

const navigateToBooking = () => {
  router.push(`/hotel/${route.params.id}/book`);
};

onMounted(fetchHotelData);
</script>
