// pages/hotel/[id]/book.vue
<template>
  <div class="min-h-screen p-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <Button variant="ghost" @click="router.back()" class="mb-4">
          <Icon name="heroicons:arrow-left" class="mr-2" />
          Back
        </Button>
        <h1 class="text-3xl font-bold">Book Your Stay</h1>
        <p class="text-gray-600 mt-2">Complete your reservation</p>
      </header>

      <!-- Hotel Summary -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex gap-4">
          <img
            :src="hotel?.image || imageUrl"
            :alt="hotel?.name"
            class="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h2 class="text-xl font-bold">{{ hotel?.name }}</h2>
            <p class="text-gray-600">{{ hotel?.location }}</p>
            <div class="mt-2 flex items-center gap-2">
              <Icon name="heroicons:star" class="w-5 h-5 text-yellow-400" />
              <span>{{ hotel?.rating }}/5</span>
            </div>
            <div class="mt-2 text-lg font-bold text-blue-600">
              ${{ hotel?.price }} /night
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Form -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <form @submit.prevent="handleBooking" class="space-y-6">
          <!-- Guest Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Guest Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <Input
                v-model="form.firstName"
                label="First Name"
                required
                :error="errors.firstName"
              />
              <Input
                v-model="form.lastName"
                label="Last Name"
                required
                :error="errors.lastName"
              />
            </div>
            <Input
              v-model="form.email"
              type="email"
              label="Email"
              required
              :error="errors.email"
            />
            <Input
              v-model="form.phone"
              label="Phone"
              required
              :error="errors.phone"
            />
          </div>

          <!-- Stay Details -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Stay Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <Input
                v-model="form.checkIn"
                type="date"
                label="Check-in"
                required
                :error="errors.checkIn"
              />
              <Input
                v-model="form.checkOut"
                type="date"
                label="Check-out"
                required
                :error="errors.checkOut"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <Input
                v-model="form.guests"
                type="number"
                label="Number of Guests"
                required
                :error="errors.guests"
              />
              <Input
                v-model="form.rooms"
                type="number"
                label="Number of Rooms"
                required
                :error="errors.rooms"
              />
            </div>
          </div>

          <!-- Payment Details -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Payment Details</h3>
            <Input
              v-model="form.cardNumber"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              required
              :error="errors.cardNumber"
            />
            <div class="grid grid-cols-3 gap-4">
              <Input
                v-model="form.expMonth"
                label="Month"
                placeholder="MM"
                required
                :error="errors.expMonth"
              />
              <Input
                v-model="form.expYear"
                label="Year"
                placeholder="YY"
                required
                :error="errors.expYear"
              />
              <Input
                v-model="form.cvv"
                label="CVV"
                placeholder="123"
                required
                :error="errors.cvv"
              />
            </div>
          </div>

          <!-- Price Summary -->
          <div class="bg-gray-50 p-4 rounded-lg space-y-2">
            <div class="flex justify-between">
              <span>Room Rate (per night)</span>
              <span>${{ hotel?.price }}</span>
            </div>
            <div class="flex justify-between">
              <span>Number of Nights</span>
              <span>{{ numberOfNights }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${{ totalPrice }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="isLoading"
          >
            {{ isLoading ? "Processing..." : "Complete Booking" }}
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAlertStore } from "~/stores/useAlertStore";
import { useAuthStore } from "~/stores/auth";
import Button from "~/components/base/Button.vue";
import Input from "~/components/base/Input.vue";
import type { Hotel } from "~/types/hotel";

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();
const authStore = useAuthStore();

const hotel = ref<Hotel | null>(null);
const isLoading = ref(false);
const imageUrl = ref(
  "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/17deb1c9d160d0eb/original/Mercury-Hotel.jpg"
);

// Form state
interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

interface BookingErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  rooms?: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  cvv?: string;
}

const form = reactive<BookingForm>({
  firstName: authStore.user?.name?.split(" ")[0] || "",
  lastName: authStore.user?.name?.split(" ").slice(1).join(" ") || "",
  email: authStore.user?.email || "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  rooms: 1,
  cardNumber: "",
  expMonth: "",
  expYear: "",
  cvv: "",
});

const errors = reactive<BookingErrors>({});

// Computed properties
const numberOfNights = computed(() => {
  if (!form.checkIn || !form.checkOut) return 0;
  const checkIn = new Date(form.checkIn);
  const checkOut = new Date(form.checkOut);
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const totalPrice = computed(() => {
  return (hotel.value?.price || 0) * numberOfNights.value * form.rooms;
});

// Validation
const validateForm = () => {
  errors.firstName = !form.firstName ? "First name is required" : "";
  errors.lastName = !form.lastName ? "Last name is required" : "";
  errors.email = !form.email ? "Email is required" : "";
  errors.phone = !form.phone ? "Phone is required" : "";
  errors.checkIn = !form.checkIn ? "Check-in date is required" : "";
  errors.checkOut = !form.checkOut ? "Check-out date is required" : "";
  errors.guests = form.guests < 1 ? "At least 1 guest is required" : "";
  errors.rooms = form.rooms < 1 ? "At least 1 room is required" : "";
  errors.cardNumber = !form.cardNumber ? "Card number is required" : "";
  errors.expMonth = !form.expMonth ? "Expiry month is required" : "";
  errors.expYear = !form.expYear ? "Expiry year is required" : "";
  errors.cvv = !form.cvv ? "CVV is required" : "";

  // Additional validations
  if (form.checkIn && form.checkOut) {
    const checkIn = new Date(form.checkIn);
    const checkOut = new Date(form.checkOut);
    if (checkIn >= checkOut) {
      errors.checkOut = "Check-out must be after check-in";
    }
  }

  return Object.values(errors).every((error) => !error);
};

// Fetch hotel data
const fetchHotelData = async () => {
  try {
    const hotelId = route.params.id;
    const response = await $fetch<Hotel>(`/api/hotels/${hotelId}`);
    hotel.value = response;
  } catch (error) {
    alertStore.showAlert("Failed to load hotel details", "error");
    router.push("/");
  }
};

// Handle booking submission
const handleBooking = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay

    // Simulated booking success
    alertStore.showAlert("Booking confirmed successfully!", "success");
    router.push("/bookings"); // Redirect to bookings page (you'll need to create this)
  } catch (error) {
    alertStore.showAlert("Failed to process booking", "error");
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle hooks
onMounted(fetchHotelData);
</script>
