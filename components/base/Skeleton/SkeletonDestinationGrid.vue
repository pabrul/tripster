// components/base/Skeleton/SkeletonDestinationGrid.vue
<template>
  <div class="grid grid-cols-3 md:grid-cols-12 gap-4">
    <div v-for="index in count" :key="index" class="col-span-4">
      <SkeletonDestinationCard :large="index % 3 === 1" />
    </div>
  </div>
</template>

<script setup>
import SkeletonDestinationCard from "./SkeletonDestinationCard.vue";

defineProps({
  count: {
    type: Number,
    default: 6,
  },
});
</script>
