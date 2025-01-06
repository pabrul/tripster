// components/base/Skeleton/SkeletonDestinationCard.vue
<template>
  <div
    :class="{
      'animate-pulse rounded-2xl overflow-hidden': true,
      'h-64': !large,
      'h-[400px]': large,
    }"
  >
    <!-- Imagem skeleton -->
    <div class="w-full h-full bg-gray-200"></div>

    <!-- Overlay com texto skeleton -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
      <div class="absolute bottom-6 left-6 space-y-2">
        <!-- Nome do destino skeleton -->
        <div class="h-6 w-32 bg-gray-300/50 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  large: {
    type: Boolean,
    default: false,
  },
});
</script>
