<template>
  <button
    :class="[
      'btn',
      `btn-${size}`,
      `btn-${variant}`,
      { 'btn-rounded': rounded },
      { 'btn-icon': $slots.icon },
    ]"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-bind="$attrs"
  >
    <slot name="icon">
      <span class="sr-only">Ícone</span>
    </slot>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
        "success",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
