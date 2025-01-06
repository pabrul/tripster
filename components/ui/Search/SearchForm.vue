// components/ui/Search/SearchForm.vue
<template>
  <div class="bg-white rounded-full shadow-lg p-2 flex items-center">
    <SearchField
      v-model="location"
      label="Location"
      placeholder="Where are you going?"
    />

    <SearchField
      v-model="checkIn"
      label="Check-in"
      type="date"
      placeholder="Add date"
      bordered
    />

    <SearchField
      v-model="checkOut"
      label="Check-out"
      type="date"
      placeholder="Add date"
      bordered
    />

    <div class="flex-1 px-6 border-l">
      <label class="block text-sm text-gray-500">Guests</label>
      <Select
        v-model="guests"
        placeholder="Number of guests"
        class="bg-transparent border-none focus:ring-0"
      >
        <option v-for="n in 10" :key="n" :value="n">
          {{ n }} {{ n === 1 ? "Guest" : "Guests" }}
        </option>
      </Select>
    </div>

    <Button
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "@/components/base/Button.vue";
import Select from "@/components/base/Select.vue";
import SearchField from "./SearchField.vue";

const location = ref("");
const checkIn = ref("");
const checkOut = ref("");
const guests = ref("");
</script>
