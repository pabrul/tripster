<template>
  <form
    @submit.prevent="handleSearch"
    class="bg-white rounded-full shadow-lg p-2 flex items-center gap-4 relative z-40"
  >
    <!-- Dropdown para mobile -->
    <div class="relative w-full sm:hidden z-auto">
      <Button
        variant="primary"
        size="md"
        rounded
        @click.prevent="toggleDropdown"
        class="w-full"
      >
        <Icon name="heroicons:adjustments-horizontal" class="w-5 h-5 mr-2" />
        Search Options
      </Button>
      <div
        v-if="isDropdownOpen"
        class="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-2 p-4 z-50"
      >
        <!-- Campo de localização -->
        <SearchField
          v-model="location"
          label="Location"
          placeholder="Where are you going?"
          :disabled="isLoading"
          class="py-1"
        />

        <!-- Campo de data de check-in -->
        <SearchField
          v-model="checkIn"
          label="Check-in"
          type="date"
          placeholder="Select check-in date"
          :disabled="isLoading"
          class="py-1"
        />

        <!-- Campo de data de check-out -->
        <SearchField
          v-model="checkOut"
          label="Check-out"
          type="date"
          placeholder="Select check-out date"
          :disabled="isLoading"
          class="py-1"
        />

        <!-- Campo de número de hóspedes -->
        <div class="flex-1 px-3">
          <label class="block text-sm text-gray-500">Guests</label>
          <Select
            v-model="guests"
            placeholder="Number of guests"
            class="bg-transparent border-none focus:ring-0 py-1"
            :disabled="isLoading"
          >
            <option v-for="n in 10" :key="n" :value="n">
              {{ n }} {{ n === 1 ? "Guest" : "Guests" }}
            </option>
          </Select>
        </div>

        <!-- Botões de ação no dropdown -->
        <div class="flex justify-between gap-2 mt-4">
          <Button
            type="button"
            variant="secondary"
            @click.prevent="handleReset"
            rounded
            size="md"
          >
            Reset
          </Button>
          <Button type="submit" variant="primary" rounded size="md">
            Search
          </Button>
        </div>
      </div>
    </div>

    <!-- Formulário completo para desktop -->
    <div class="hidden sm:flex items-center gap-4">
      <SearchField
        v-model="location"
        label="Location"
        placeholder="Where are you going?"
        :disabled="isLoading"
      />
      <SearchField
        v-model="checkIn"
        label="Check-in"
        type="date"
        placeholder="Select check-in date"
        bordered
        :disabled="isLoading"
      />
      <SearchField
        v-model="checkOut"
        label="Check-out"
        type="date"
        placeholder="Select check-out date"
        bordered
        :disabled="isLoading"
      />
      <div class="flex-1 px-3">
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
      <Button
        type="submit"
        :disabled="isLoading"
        variant="primary"
        rounded
        size="md"
      >
        <Icon name="heroicons:arrow-right" class="w-6 h-6" />
      </Button>
      <Button
        type="submit"
        @click.prevent="handleReset"
        :disabled="isLoading"
        variant="secondary"
        rounded
        size="md"
      >
        Reset
      </Button>
    </div>
  </form>
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

const isDropdownOpen = ref(false);
const location = ref("");
const checkIn = ref("");
const checkOut = ref("");
const guests = ref(1);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const validateDates = () => {
  if (!checkIn.value || !checkOut.value) {
    alertStore.showAlert("Select both dates", "error");
    return false;
  }
  if (new Date(checkIn.value) >= new Date(checkOut.value)) {
    alertStore.showAlert("Invalid date range", "error");
    return false;
  }
  return true;
};

const handleSearch = async () => {
  if (!location.value) {
    alertStore.showAlert("Please enter a location to search.", "error");
    return;
  }

  if (!validateDates()) return;

  console.log("Searching with params:", {
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
  alertStore.showAlert("Search fields have been cleared.", "success");
};
</script>
