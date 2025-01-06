<template>
  <nav class="flex space-x-6">
    <NavItem v-for="item in items" :key="item">
      {{ item }}
    </NavItem>
  </nav>
</template>

<script setup>
import NavItem from "./NavItem.vue";

defineProps({
  items: {
    type: Array,
    default: () => ["Properties", "Attractions", "Popular"],
  },
});
</script>
