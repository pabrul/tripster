<template>
  <div class="relative mb-12">
    <img
      :src="heroImage"
      alt="Hotel Room"
      class="w-full h-[400px] object-cover rounded-3xl"
    />
    <div class="absolute inset-0 bg-black bg-opacity-30 rounded-3xl">
      <div class="flex flex-col justify-center h-full px-12 text-white">
        <h2 class="text-4xl font-bold mb-4">{{ title }}</h2>
        <p class="text-lg">{{ subtitle }}</p>
      </div>
    </div>
    <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%]">
      <SearchForm />
    </div>
  </div>
</template>

<script setup>
import SearchForm from "@/components/ui/Search/SearchForm.vue";

defineProps({
  heroImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Book your stay with Tripster",
  },
  subtitle: {
    type: String,
    default: "1,480,086 rooms around the world are waiting for you!",
  },
});
</script>
