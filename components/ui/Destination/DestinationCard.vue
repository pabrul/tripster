// components/ui/Destination/DestinationCard.vue
<template>
  <div
    class="card card-hover relative rounded-2xl overflow-hidden"
    :class="{ 'h-80': large, 'h-38': !large }"
  >
    <img :src="image" :alt="name" class="w-full h-full object-cover" />
    <div class="absolute bottom-4 left-4 text-white font-semibold text-xl">
      {{ name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
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
</script>
