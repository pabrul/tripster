// components/ui/Destination/DestinationCard.vue
<template>
  <div class="relative group">
    <div
      class="card relative rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
      :class="{ 'h-80': large, 'h-64': !large }"
      @click="navigateToHotel"
    >
      <!-- Overlay gradiente -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      ></div>

      <!-- Checkbox para comparação -->
      <div class="absolute top-4 right-4 z-10" @click.stop>
        <Button
          :variant="isSelected ? 'primary' : 'secondary'"
          :size="'md'"
          :rounded="true"
          :disabled="isCompareDisabled && !isSelected"
          @click="handleCompare"
          class="flex items-center gap-2 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <!-- Ícone -->
          <template #icon>
            <Icon
              :name="
                isSelected ? 'heroicons:check-circle' : 'heroicons:plus-circle'
              "
              class="w-5 h-5"
              :class="isSelected ? 'text-white' : 'text-blue-500'"
            />
          </template>

          <!-- Texto -->
          <span class="text-sm font-medium whitespace-nowrap">
            {{ isSelected ? "Added" : "Compare" }}
          </span>

          <!-- Contador (opcional) -->
          <span
            v-if="selectedHotels.length > 0"
            :class="[
              'text-xs font-bold ml-1',
              isSelected ? 'text-white/90' : 'text-gray-500',
            ]"
          >
            ({{ selectedHotels.length }}/3)
          </span>
        </Button>

        <!-- Tooltip para disabled -->
        <div
          v-if="isCompareDisabled && !isSelected"
          class="absolute top-full mt-2 right-0 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl"
        >
          Maximum 3 hotels can be compared
        </div>
      </div>

      <!-- Imagem do hotel -->
      <img
        :src="image"
        :alt="`Imagem do hotel ${name}`"
        class="w-full h-full object-cover"
      />

      <!-- Informações do hotel -->
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <h3 class="text-2xl font-bold text-white mb-2">{{ name }}</h3>
        <div class="flex items-center gap-4">
          <div class="flex items-center text-white">
            <Icon name="heroicons:map-pin" class="w-5 h-5 mr-1" />
            <span class="text-sm">{{ hotel.location }}</span>
          </div>
          <div class="flex items-center text-white">
            <Icon name="heroicons:currency-dollar" class="w-5 h-5 mr-1" />
            <span class="text-sm">${{ hotel.price }}</span>
          </div>
          <div class="flex items-center text-white">
            <Icon name="heroicons:star" class="w-5 h-5 mr-1 text-yellow-400" />
            <span class="text-sm">{{ hotel.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCompareStore } from "~/stores/useCompareStore";
import Button from "~/components/base/Button.vue";

const props = defineProps({
  hotel: {
    type: Object,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  large: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const compareStore = useCompareStore();
const { selectedHotels } = storeToRefs(compareStore);

const isSelected = computed(() =>
  selectedHotels.value.some((h) => h.id === props.hotel.id)
);

const isCompareDisabled = computed(
  () => selectedHotels.value.length >= 3 && !isSelected.value
);

const handleCompare = () => {
  if (isSelected.value) {
    compareStore.removeFromCompare(props.hotel.id);
  } else {
    compareStore.addToCompare(props.hotel);
  }
};

const navigateToHotel = () => {
  router.push(`/hotel/${props.hotel.id}`);
};
</script>

<style scoped>
.card {
  @apply cursor-pointer shadow-lg;
}

/* Animação suave para o tooltip */
.absolute {
  @apply transition-opacity duration-200;
}
</style>
