<template>
  <header class="mb-8">
    <Button variant="ghost" @click="router.back()" class="mb-4">
      <Icon name="heroicons:arrow-left" class="mr-2" />
      Back
    </Button>
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <p class="text-gray-600 mt-2">{{ subtitle }}</p>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@/components/base/Button.vue";

defineProps<{
  title: string;
  subtitle: string;
}>();

const router = useRouter();
</script>
