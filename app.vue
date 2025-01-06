// app.vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Alert />
  </div>
</template>

<script setup>
import Alert from "@/components/base/Alert.vue";
</script>
