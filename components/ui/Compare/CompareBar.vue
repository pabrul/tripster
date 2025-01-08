<template>
  <div
    v-if="selectedHotels.length > 0"
    class="fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ease-in-out"
  >
    <div class="bg-white/95 backdrop-blur-sm border-t shadow-lg">
      <div class="max-w-7xl mx-auto p-4">
        <div class="flex items-center justify-between">
          <!-- Left Side: Selected Hotels Preview -->
          <div class="flex items-center gap-4">
            <div class="flex -space-x-4">
              <div
                v-for="hotel in selectedHotels"
                :key="hotel.id"
                class="relative w-12 h-12 rounded-full ring-2 ring-white overflow-hidden"
              >
                <img
                  :src="hotel.image || defaultImage"
                  :alt="hotel.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="ml-2">
              <h4 class="font-semibold text-gray-900">Selected Hotels</h4>
              <p class="text-sm text-gray-600">
                {{ selectedHotels.length }}/{{ maxSelections }} hotels selected
              </p>
            </div>
          </div>

          <!-- Right Side: Actions -->
          <div class="flex items-center gap-4">
            <Button
              v-if="selectedHotels.length < minSelections"
              variant="outline"
              size="md"
              disabled
              class="border-dashed"
            >
              <template #icon>
                <Icon
                  name="heroicons:information-circle"
                  class="w-5 h-5 mr-2"
                />
              </template>
              Select at least {{ minSelections }} hotels
            </Button>

            <div v-else class="flex items-center gap-2">
              <Button
                @click="handleCompare"
                variant="primary"
                size="md"
                rounded
                class="shadow-md hover:shadow-lg transition-shadow"
              >
                <template #icon>
                  <Icon
                    name="heroicons:arrows-right-left"
                    class="w-5 h-5 mr-2"
                  />
                </template>
                Compare {{ selectedHotels.length }} Hotels
              </Button>
              <!-- Reset Button -->
              <Button
                @click="handleReset"
                variant="secondary"
                size="md"
                rounded
                class="shadow-md hover:shadow-lg transition-shadow"
              >
                <template #icon>
                  <Icon name="heroicons:x-circle" class="w-6 h-6 mr-2" />
                </template>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Hotel } from "@/types/hotel";
import Button from "@/components/base/Button.vue";

interface Props {
  selectedHotels: Hotel[];
  defaultImage?: string;
  maxSelections?: number;
  minSelections?: number;
}

const props = withDefaults(defineProps<Props>(), {
  defaultImage: "",
  maxSelections: 3,
  minSelections: 2,
});

const emit = defineEmits<{
  (e: "compare", selectedHotels: Hotel[]): void;
  (e: "reset"): void; // Evento para resetar
}>();

const handleCompare = () => {
  emit("compare", props.selectedHotels);
};

const handleReset = () => {
  emit("reset"); // Emitindo o evento de reset
};
</script>
