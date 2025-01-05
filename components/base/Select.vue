<template>
  <div>
    <label v-if="label" class="select-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :class="[
        'select',
        `select-${size}`
      ]"
      :value="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <slot />
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  size: {
    type: String,
    default: 'md'
  },
  placeholder: String,
  required: Boolean,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>