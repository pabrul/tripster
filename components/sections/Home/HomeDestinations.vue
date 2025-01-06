//components/sections/Home/HomeDestinations.vue
<template>
  <section class="mt-16">
    <h3 class="text-2xl font-bold mb-6">Popular destinations</h3>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-4">
        <DestinationCard name="Spain" :image="imageUrl" large />
      </div>

      <div class="col-span-4 space-y-4">
        <DestinationCard name="London" :image="imageUrl" />
        <DestinationCard name="Lisbon" :image="imageUrl" />
      </div>

      <div class="col-span-4">
        <DestinationCard name="Croatia" :image="imageUrl" large />
      </div>
    </div>
  </section>
</template>

<script setup>
import DestinationCard from "@/components/ui/Destination/DestinationCard.vue";

const imageUrl =
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg";
</script>
