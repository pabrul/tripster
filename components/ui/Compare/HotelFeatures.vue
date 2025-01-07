// components/ui/Compare/HotelFeatures.vue
<template>
  <div class="p-6 bg-gray-50">
    <h3 class="font-semibold mb-4">Features</h3>
    <ul class="space-y-3">
      <li
        v-for="feature in features"
        :key="feature.name"
        class="flex items-center gap-2 p-2 rounded-lg transition-colors"
        :class="feature.available ? 'hover:bg-green-50' : 'hover:bg-red-50'"
      >
        <Icon
          :name="
            feature.available ? 'heroicons:check-circle' : 'heroicons:x-circle'
          "
          :class="feature.available ? 'text-green-500' : 'text-red-500'"
          class="w-5 h-5"
        />
        <span :class="feature.available ? 'text-gray-900' : 'text-gray-500'">
          {{ feature.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  name: string;
  available: boolean;
}

defineProps<{
  features: Feature[];
}>();
</script>
