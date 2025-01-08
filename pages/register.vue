// pages/register.vue
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
        <h2 class="text-3xl font-bold mb-6">Start your journey with us</h2>
        <p class="text-lg text-white/80 mb-8">
          Create an account to unlock all features. Compare hotels, save your
          favorites, and get exclusive deals.
        </p>
      </div>
    </div>

    <!-- Right Section - Register Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Create your account</h1>
          <p class="mt-2 text-sm text-gray-600">
            Join thousands of happy travelers
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "~/components/ui/Auth/RegisterForm.vue";

definePageMeta({
  layout: "auth",
  title: "Join Tripster - Create Your Account",
  robots: "noindex, nofollow",
});

useHead({
  title: "Join Tripster - Create Your Account",
  meta: [
    // Descrição básica e atrativa
    {
      name: "description",
      content:
        "Create your free Tripster account today. Join our community of travelers, unlock exclusive deals, and start planning your next adventure.",
    },

    // Prevenção de cache
    {
      "http-equiv": "Cache-Control",
      content: "no-cache, no-store, must-revalidate",
    },
    { "http-equiv": "Pragma", content: "no-cache" },
    { "http-equiv": "Expires", content: "0" },

    // Segurança
    { name: "referrer", content: "no-referrer-when-downgrade" },

    // Open Graph
    { property: "og:title", content: "Join Tripster - Create Your Account" },
    {
      property: "og:description",
      content:
        "Join our community of travelers. Create your free account today and start planning your next adventure!",
    },
    { property: "og:type", content: "website" },

    // Twitter Card
    { name: "twitter:title", content: "Join Tripster - Create Your Account" },
    {
      name: "twitter:description",
      content:
        "Join our community of travelers. Create your free account today!",
    },
    { name: "twitter:card", content: "summary" },

    // Viewport
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    // Keywords relevantes
    {
      name: "keywords",
      content:
        "travel account, signup, register, join tripster, travel planning, travel community",
    },
  ],
});
</script>
