// layouts/default.vue // layouts/default.vue
<template>
  <div class="min-h-screen bg-blue-600">
    <AppHeader />
    <div class="max-w-7xl mx-auto p-4 pt-20">
      <div class="bg-white rounded-3xl p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "~/components/base/AppHeader.vue";
</script>
