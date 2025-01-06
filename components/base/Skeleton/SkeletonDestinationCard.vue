// components/base/Skeleton/SkeletonDestinationCard.vue
<template>
  <div class="relative group">
    <div
      class="card relative rounded-2xl overflow-hidden transition-transform duration-300"
      :class="{ 'h-80': large, 'h-64': !large }"
    >
      <!-- Background Skeleton -->
      <div class="absolute inset-0 bg-gray-200 animate-pulse"></div>

      <!-- Overlay Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      >
        <!-- Content Skeleton -->
        <div class="absolute bottom-6 left-6 space-y-4 w-full pr-6">
          <!-- Title -->
          <div class="h-8 w-32 bg-gray-300/50 rounded"></div>

          <!-- Info Row -->
          <div class="flex items-center gap-4">
            <!-- Location -->
            <div class="flex items-center gap-2">
              <div class="h-5 w-5 rounded-full bg-gray-300/50"></div>
              <div class="h-4 w-20 bg-gray-300/50 rounded"></div>
            </div>

            <!-- Price -->
            <div class="flex items-center gap-2">
              <div class="h-5 w-5 rounded-full bg-gray-300/50"></div>
              <div class="h-4 w-16 bg-gray-300/50 rounded"></div>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="h-5 w-5 rounded-full bg-gray-300/50"></div>
              <div class="h-4 w-12 bg-gray-300/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compare Toggle Skeleton -->
      <div class="absolute top-4 right-4 z-10">
        <div class="h-10 w-24 bg-white/90 rounded-lg animate-pulse"></div>
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

<style scoped>
.card {
  @apply cursor-pointer shadow-lg;
}
</style>
