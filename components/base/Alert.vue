// components/base/Alert.vue
<template>
  <Transition name="fade">
    <div v-if="isVisible" :class="['alert', alertTypeClass]">
      <Icon :name="alertIcon" class="alert-icon" />

      <div class="alert-content">
        <p class="alert-message">{{ alertMessage }}</p>
      </div>

      <button class="alert-close" @click="hideAlert" aria-label="Close alert">
        <Icon name="heroicons:x-mark" class="h-5 w-5" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAlertStore } from "~/stores/useAlertStore";
import type { AlertType } from "~/types/alert";
import { ALERT_ICONS } from "~/types/alert";

const alertStore = useAlertStore();
const {
  message: alertMessage,
  type: alertType,
  visible: isVisible,
} = storeToRefs(alertStore);
const { hideAlert } = alertStore;

const alertIcon = computed(() => {
  const currentType = alertType.value as AlertType;
  return ALERT_ICONS[currentType];
});

const alertTypeClass = computed(() => `alert-${alertType.value}`);
</script>
