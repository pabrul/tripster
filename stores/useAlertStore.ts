// stores/useAlertStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { AlertType } from "~/types/alert";

export const useAlertStore = defineStore("alert", () => {
  const message = ref<string>("");
  const type = ref<AlertType>("info");
  const visible = ref<boolean>(false);
  let timeout: NodeJS.Timeout | null = null;

  const showAlert = (
    msg: string,
    alertType: AlertType = "info",
    duration = 3000
  ) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    message.value = msg;
    type.value = alertType;
    visible.value = true;

    timeout = setTimeout(() => {
      hideAlert();
    }, duration);
  };

  const hideAlert = () => {
    visible.value = false;
    message.value = "";

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return {
    message,
    type,
    visible,
    showAlert,
    hideAlert,
  };
});
