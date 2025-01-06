// components/base/EmptyState.vue
<template>
  <div class="text-center py-12">
    <div class="mb-4">
      <Icon :name="iconName" class="w-16 h-16 mx-auto text-gray-400" />
    </div>
    <h4 class="text-xl font-semibold text-gray-700 mb-2">
      {{ title }}
    </h4>
    <p class="text-gray-500">
      {{ message }}
    </p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { EmptyStateType } from "@/types/empty-state";
import { EMPTY_STATE_ICONS } from "@/types/empty-state";

interface Props {
  type?: EmptyStateType;
  title: string;
  message: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "empty",
});

const iconName = computed(() => EMPTY_STATE_ICONS[props.type]);
</script>
