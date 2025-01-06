// components/ui/Search/SearchField.vue
<template>
  <div class="flex-1 px-6" :class="{ 'border-l': bordered }">
    <label class="block text-sm text-gray-500">{{ label }}</label>
    <Input
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :type="type"
      :placeholder="placeholder"
      :size="size"
      class="bg-transparent border-none focus:ring-0"
    />
  </div>
</template>

<script setup>
import Input from "@/components/base/Input.vue";

defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  size: {
    type: String,
    default: "md",
  },
  bordered: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
