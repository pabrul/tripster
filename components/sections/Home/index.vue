// components/sections/Home/index.vue
<template>
  <div class="min-h-screen bg-blue-600 p-4">
    <div class="max-w-7xl mx-auto bg-white rounded-3xl p-6">
      <!-- Header Organism -->
      <HomeHeader />

      <!-- Hero Organism -->
      <HomeHero
        :hero-image="heroImage"
        :title="heroTitle"
        :subtitle="heroSubtitle"
      />

      <!-- Destinations Organism -->
      <HomeDestinations />
    </div>
  </div>
</template>

<script setup>
import HomeHeader from "./HomeHeader.vue";
import HomeHero from "./HomeHero.vue";
import HomeDestinations from "./HomeDestinations.vue";

// Props para permitir customização no nível da página
defineProps({
  heroImage: {
    type: String,
    required: true,
  },
  heroTitle: {
    type: String,
    default: "Book your stay with Tripster",
  },
  heroSubtitle: {
    type: String,
    default: "1,480,086 rooms around the world are waiting for you!",
  },
});
</script>
