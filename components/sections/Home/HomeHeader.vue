<template>
  <header class="flex justify-between items-center mb-8">
    <h1 class="text-xl font-bold">Tripster</h1>

    <NavigationMenu />

    <div class="flex items-center space-x-4">
      <Button variant="ghost">Sign up</Button>
      <Button variant="primary">Log in</Button>
      <Button variant="primary" rounded class="bg-blue-500 hover:bg-blue-600">
        Pro
      </Button>
    </div>
  </header>
</template>

<script setup>
import Button from "@/components/base/Button.vue";
import NavigationMenu from "@/components/ui/Navigation/NavigationMenu.vue";
</script>
