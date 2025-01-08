// components/ui/Auth/LoginForm.vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Email Input -->
    <Input
      v-model="form.email"
      type="email"
      placeholder="your@email.com"
      :error="errors.email"
      autocomplete="email"
      class="w-full"
    />

    <!-- Password Input -->
    <Input
      v-model="form.password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Enter your password"
      :error="errors.password"
      autocomplete="current-password"
      class="w-full"
    >
      <template #icon>
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="opacity-50 hover:opacity-100 transition-opacity"
        >
          <Icon
            :name="showPassword ? 'heroicons:eye-off' : 'heroicons:eye'"
            class="w-4 h-4"
          />
        </button>
      </template>
    </Input>

    <!-- Remember Me & Forgot -->
    <div class="flex justify-between items-center text-sm">
      <label class="flex items-center gap-2">
        <input
          v-model="form.rememberMe"
          type="checkbox"
          class="w-4 h-4 rounded text-blue-600"
        />
        Remember me
      </label>
      <a href="#" class="text-blue-600">Forgot password?</a>
    </div>

    <!-- Login Button -->
    <Button
      type="submit"
      variant="primary"
      class="w-full !bg-blue-600"
      :loading="isLoading"
    >
      Sign in
    </Button>

    <!-- Divider -->
    <div class="flex items-center gap-3 my-4">
      <div class="h-px bg-gray-200 flex-1"></div>
      <span class="text-sm text-gray-500">Or continue with</span>
      <div class="h-px bg-gray-200 flex-1"></div>
    </div>

    <!-- Social Login -->
    <div class="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        class="border border-gray-300"
        @click="socialLogin('google')"
      >
        <Icon name="logos:google-icon" class="w-4 h-4 mr-2" /> Google
      </Button>
      <Button
        variant="outline"
        class="border border-gray-300"
        @click="socialLogin('github')"
      >
        <Icon name="logos:github-icon" class="w-4 h-4 mr-2" /> GitHub
      </Button>
    </div>

    <!-- Sign Up -->
    <div class="text-sm text-center text-gray-600 mt-6">
      Don't have an account?
      <NuxtLink to="/register" class="underline"> Sign up Now </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useAlertStore } from "~/stores/useAlertStore";
import type { AuthResponse } from "~/types/user";
import Button from "@/components/base/Button.vue";
import Input from "@/components/base/Input.vue";

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const showPassword = ref(false);
const isLoading = ref(false);
const errors = reactive({
  email: "",
  password: "",
});

const form = reactive({
  email: "john@example.com",
  password: "123456",
  rememberMe: false,
});

const validateForm = () => {
  let isValid = true;
  errors.email = "";
  errors.password = "";

  if (!form.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;

    const { data, error } = await useFetch<AuthResponse>("/api/auth/users", {
      method: "POST",
      body: {
        email: form.email,
        password: form.password,
      },
    });

    if (error.value || !data.value) {
      throw new Error("Invalid credentials");
    }

    authStore.login(data.value.user, data.value.token);
    alertStore.showAlert("Welcome back!", "success");

    const redirect = router.currentRoute.value.query.redirect as string;
    router.push(redirect || "/");
  } catch (err) {
    alertStore.showAlert("An error occurred", "error");
  } finally {
    isLoading.value = false;
  }
};

const socialLogin = (provider: "google" | "github") => {
  alertStore.showAlert(`${provider} login coming soon!`, "info");
};
</script>
