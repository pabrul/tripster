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

  // Name validation
  if (!form.name) {
    errors.name = "Name is required";
    isValid = false;
  }

  // Email validation
  if (!form.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  // Password validation
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

    const response = await $fetch("/api/auth/users", {
      method: "PUT",
      body: form,
    });

    authStore.login(response.user, response.token);
    alertStore.showAlert("Account created successfully!", "success");
    router.push("/");
  } catch (error: any) {
    alertStore.showAlert(error.message || "Registration failed", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
