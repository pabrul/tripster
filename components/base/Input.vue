// components/base/Input.vue
<template>
  <div>
    <label v-if="label" :class="['input-label', { 'text-red-500': error }]">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :class="[
        'input',
        `input-${size}`,
        { 'input-error': error },
        { 'input-success': success },
      ]"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <span v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: String,
  type: {
    type: String,
    default: "text",
  },
  size: {
    type: String,
    default: "md",
  },
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  error: String,
  success: Boolean,
});

defineEmits(["update:modelValue"]);
</script>
