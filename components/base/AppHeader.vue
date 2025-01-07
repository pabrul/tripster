// components/base/AppHeader.vue
<template>
  <header
    class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <Icon
            name="heroicons:building-office-2"
            class="w-8 h-8 text-blue-600"
          />
          <h1 class="text-xl font-bold">Tripster</h1>
        </NuxtLink>

        <!-- Nav Menu -->
        <nav class="hidden md:flex items-center space-x-6">
          <!-- <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900 font-medium"
          >
            {{ item.label }}
          </NuxtLink> -->
        </nav>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </NuxtLink>
            <NuxtLink to="/register">
              <Button variant="primary" size="sm">Sign up</Button>
            </NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center gap-4">
              <!-- User Profile -->
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
                >
                  <span class="text-sm font-medium text-blue-600">
                    {{ userInitials }}
                  </span>
                </div>
                <span class="text-sm font-medium">{{ user?.name }}</span>
              </div>

              <!-- Logout Button -->
              <Button variant="ghost" size="sm" @click="handleLogout">
                <Icon
                  name="heroicons:arrow-right-on-rectangle"
                  class="w-5 h-5 mr-1"
                />
                Logout
              </Button>
            </div>
          </template>
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
          <!-- <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink> -->

          <!-- Mobile Auth Buttons -->
          <div class="pt-4 space-y-2">
            <template v-if="!isAuthenticated">
              <NuxtLink to="/login" class="block">
                <Button variant="ghost" size="sm" class="w-full">Log in</Button>
              </NuxtLink>
              <NuxtLink to="/register" class="block">
                <Button variant="primary" size="sm" class="w-full"
                  >Sign up</Button
                >
              </NuxtLink>
            </template>
            <template v-else>
              <div class="flex items-center gap-2 py-2">
                <div
                  class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
                >
                  <span class="text-sm font-medium text-blue-600">{{
                    userInitials
                  }}</span>
                </div>
                <span class="text-sm font-medium">{{ user?.name }}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                class="w-full"
                @click="handleLogout"
              >
                Logout
              </Button>
            </template>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useAlertStore } from "~/stores/useAlertStore";
import Button from "~/components/base/Button.vue";

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const isMenuOpen = ref(false);

// Auth
const isAuthenticated = computed(() => authStore.user !== null);
const user = computed(() => authStore.user);
const userInitials = computed(() => {
  if (!user.value?.name) return "";
  return user.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const handleLogout = () => {
  authStore.logout();
  alertStore.showAlert("Successfully logged out", "success");
  router.push("/");
  isMenuOpen.value = false;
};
</script>
