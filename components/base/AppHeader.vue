// components/base/AppHeader.vue
<template>
  <header
    class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <h1 class="text-xl font-bold">Tripster</h1>
        </NuxtLink>

        <!-- Nav Menu -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900 font-medium"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="sm" class="hidden md:inline-flex"
            >Sign up</Button
          >
          <Button variant="primary" size="sm" class="hidden md:inline-flex"
            >Log in</Button
          >
          <Button variant="primary" size="sm" rounded>
            Pro
            <Icon name="heroicons:sparkles" class="ml-1 w-4 h-4" />
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2" @click="isMenuOpen = !isMenuOpen">
          <Icon
            :name="isMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
            class="w-6 h-6"
          />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="md:hidden py-4">
        <nav class="flex flex-col space-y-4">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="pt-4 flex flex-col space-y-2">
            <Button variant="ghost" size="sm">Sign up</Button>
            <Button variant="primary" size="sm">Log in</Button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import Button from "~/components/base/Button.vue";

const isMenuOpen = ref(false);

const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Compare", path: "/compare" },
  { label: "About", path: "/about" },
];
</script>
