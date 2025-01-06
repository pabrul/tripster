// components/ui/Search/SearchForm.vue
<template>
  <div class="bg-white rounded-full shadow-lg p-2 flex items-center gap-4">
    <!-- Campo de localização -->
    <SearchField
      v-model="location"
      label="Location"
      placeholder="Where are you going?"
      :disabled="isLoading"
    />

    <!-- Campo de data de check-in -->
    <SearchField
      v-model="checkIn"
      label="Check-in"
      type="date"
      placeholder="Select check-in date"
      bordered
      :disabled="isLoading"
    />

    <!-- Campo de data de check-out -->
    <SearchField
      v-model="checkOut"
      label="Check-out"
      type="date"
      placeholder="Select check-out date"
      bordered
      :disabled="isLoading"
    />

    <!-- Campo de número de hóspedes -->
    <div class="flex-1 px-6">
      <label class="block text-sm text-gray-500">Guests</label>
      <Select
        v-model="guests"
        placeholder="Number of guests"
        class="bg-transparent border-none focus:ring-0"
        :disabled="isLoading"
      >
        <option v-for="n in 10" :key="n" :value="n">
          {{ n }} {{ n === 1 ? "Guest" : "Guests" }}
        </option>
      </Select>
    </div>

    <!-- Botão de pesquisa -->
    <Button
      @click="handleSearch"
      :disabled="isLoading"
      variant="primary"
      rounded
      size="lg"
      class="!bg-blue-500 hover:!bg-blue-600"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </template>
    </Button>

    <!-- Botão de reset -->
    <Button
      @click="handleReset"
      :disabled="isLoading"
      variant="secondary"
      rounded
      size="lg"
      class="ml-2"
    >
      Reset
    </Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "@/components/base/Button.vue";
import Select from "@/components/base/Select.vue";
import SearchField from "./SearchField.vue";
import { useHotelStore } from "@/stores/useHotelStore";
import { useAlertStore } from "@/stores/useAlertStore";

const hotelStore = useHotelStore();
const alertStore = useAlertStore();

// Use storeToRefs para valores reativos
const { isLoading } = storeToRefs(hotelStore);
const { fetchHotels, resetSearch } = hotelStore;

const location = ref("");
const checkIn = ref("");
const checkOut = ref("");
const guests = ref(1);

const handleSearch = async () => {
  if (!location.value) {
    alertStore.showAlert("Please enter a location to search.", "error");
    return;
  }

  console.log("Searching with paraams:", {
    location: location.value,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    guests: guests.value,
  });

  await fetchHotels({
    location: location.value,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    guests: guests.value,
  });
};

const handleReset = () => {
  location.value = "";
  checkIn.value = "";
  checkOut.value = "";
  guests.value = 1;
  resetSearch();
};
</script>
