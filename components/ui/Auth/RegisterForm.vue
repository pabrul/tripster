// components/ui/Auth/RegisterForm.vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Name Input -->
    <Input
      v-model="form.name"
      type="text"
      placeholder="Your full name"
      :error="errors.name"
      autocomplete="name"
    />

    <!-- Email Input -->
    <Input
      v-model="form.email"
      type="email"
      placeholder="your@email.com"
      :error="errors.email"
      autocomplete="email"
    />

    <!-- Password Input -->
    <Input
      v-model="form.password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Create a password"
      :error="errors.password"
      autocomplete="new-password"
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

    <div class="text-sm text-gray-600">
      <p>Password must be at least 6 characters long</p>
    </div>

    <!-- Register Button -->
    <Button
      type="submit"
      variant="primary"
      class="w-full !bg-blue-600"
      :loading="isLoading"
    >
      Create account
    </Button>

    <!-- Sign In Link -->
    <div class="text-sm text-center text-gray-600 mt-6">
      Already have an account?
      <NuxtLink to="/login" class="text-blue-600">Sign in</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useAlertStore } from "~/stores/useAlertStore";
import Button from "@/components/base/Button.vue";
import Input from "@/components/base/Input.vue";
import type { AuthResponse } from "~/types/user";

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const showPassword = ref(false);
const isLoading = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
});

const validateForm = () => {
  let isValid = true;

  errors.name = !form.name ? "Name is required" : "";
  errors.email = !form.email
    ? "Email is required"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? "Please enter a valid email"
    : "";
  errors.password = !form.password
    ? "Password is required"
    : form.password.length < 6
    ? "Password must be at least 6 characters"
    : "";

  return isValid && !errors.name && !errors.email && !errors.password;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;

    const { data, error } = await useFetch<AuthResponse>("/api/auth/users", {
      method: "PUT",
      body: form,
    });

    if (error.value || !data.value) {
      throw new Error(error.value?.message || "Registration failed");
    }

    authStore.login(data.value.user, data.value.token);
    alertStore.showAlert("Account created successfully!", "success");
    router.push("/");
  } catch (err: any) {
    alertStore.showAlert(err.message || "Registration failed", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
