// pages/login.vue
<template>
  <div class="min-h-screen flex">
    <!-- Left Section - Brand Info -->
    <div
      class="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white"
    >
      <div class="max-w-lg">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 mb-12">
          <Icon name="heroicons:building-office-2" class="w-10 h-10" />
          <h1 class="text-4xl font-bold">Tripster</h1>
        </NuxtLink>

        <!-- Brand Message -->
        <h2 class="text-3xl font-bold mb-6">
          Find and book your perfect stay worldwide
        </h2>
        <p class="text-lg text-white/80 mb-8">
          Join thousands of travelers who trust Tripster for their accommodation
          needs. Compare hotels, read reviews, and book with confidence.
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8">
          <div>
            <div class="text-3xl font-bold">1M+</div>
            <div class="text-sm text-white/80">Happy Customers</div>
          </div>
          <div>
            <div class="text-3xl font-bold">50k+</div>
            <div class="text-sm text-white/80">Hotels</div>
          </div>
          <div>
            <div class="text-3xl font-bold">100+</div>
            <div class="text-sm text-white/80">Countries</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Section - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <!-- Mobile Logo (shown only on mobile) -->
          <NuxtLink
            to="/"
            class="flex items-center justify-center gap-2 mb-8 lg:hidden"
          >
            <Icon
              name="heroicons:building-office-2"
              class="w-8 h-8 text-blue-600"
            />
            <h1 class="text-2xl font-bold text-gray-900">Tripster</h1>
          </NuxtLink>

          <h1 class="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h1>
          <p class="mt-2 text-sm text-gray-600">
            To continue comparing and booking hotels
          </p>
        </div>

        <!-- Login Form -->
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "~/components/ui/Auth/LoginForm.vue";

// Define o layout de autenticação
definePageMeta({
  layout: "auth",
});
</script>
