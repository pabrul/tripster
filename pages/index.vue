<template>
  <HomeSection
    :hero-image="heroImage"
    hero-title="Book your stay with Tripster"
    hero-subtitle="1,480,086 rooms around the world are waiting for you!"
  />
</template>

<script setup>
import HomeSection from "@/components/sections/Home/index.vue";

useHead({
  title: "Tripster - Find Your Perfect Travel Experience",
  meta: [
    {
      name: "description",
      content:
        "Discover amazing destinations, book hotels, and plan your perfect trip with Tripster. Your journey starts here.",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Tripster - Find Your Perfect Travel Experience",
    },
    {
      property: "og:description",
      content:
        "Discover amazing destinations, book hotels, and plan your perfect trip with Tripster. Your journey starts here.",
    },
    { property: "og:url", content: "https://tripster.com" },
    { property: "og:image", content: "/images/home-og.jpg" }, // Atualize com o caminho real da sua imagem

    // Twitter
    {
      name: "twitter:title",
      content: "Tripster - Find Your Perfect Travel Experience",
    },
    {
      name: "twitter:description",
      content:
        "Discover amazing destinations, book hotels, and plan your perfect trip with Tripster. Your journey starts here.",
    },
    { name: "twitter:image", content: "/images/home-og.jpg" },

    // Keywords específicos para a home
    {
      name: "keywords",
      content:
        "travel booking, hotels, vacation packages, travel deals, trip planning, destinations, accommodation search",
    },

    // Outras meta tags relevantes
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Tripster" },
  ],
  link: [
    { rel: "canonical", href: "https://tripster.com" }, // Atualize com sua URL real
  ],
});

definePageMeta({
  title: "Home",
  description:
    "Welcome to Tripster - Find and book your perfect travel experience",
});

const heroImage =
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg";
</script>
