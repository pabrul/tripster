<template>
  <HomeSection 
    :hero-image="heroImage"
    hero-title="Book your stay with Tripster"
    hero-subtitle="1,480,086 rooms around the world are waiting for you!"
  />
</template>

<script setup>
import HomeSection from '@/components/sections/Home/index.vue'

const heroImage = 'https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg'
</script>