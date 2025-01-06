// components/sections/Home/index.vue
<template>
  <div class="">
    <HomeHero
      :hero-image="heroImage"
      :title="heroTitle"
      :subtitle="heroSubtitle"
    />
    <HomeDestinations />
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
