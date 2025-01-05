<template>
  <a 
    :href="href" 
    class="text-gray-600 hover:text-gray-900"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    default: '#'
  }
})
</script>