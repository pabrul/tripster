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
      <div
        class="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-lg transform transition-all duration-300 shadow-lg"
        @click.stop
      >
        <label class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="isSelected"
            @change="handleCompare"
            :disabled="isCompareDisabled && !isSelected"
            class="sr-only peer"
          />
          <div
            class="relative w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
          <span class="ml-2 text-sm font-medium">Compare</span>
        </label>
      </div>

      <!-- Imagem do hotel -->
      <img :src="image" :alt="name" class="w-full h-full object-cover" />

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
</style>
