// types/alert.ts
export type AlertType = "success" | "error" | "warning" | "info";

export const ALERT_ICONS: Record<AlertType, string> = {
  success: "heroicons:check-circle",
  error: "heroicons:exclamation-circle",
  warning: "heroicons:exclamation-triangle",
  info: "heroicons:information-circle",
} as const;
