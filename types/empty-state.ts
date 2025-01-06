// types/empty - state.ts;
export type EmptyStateType = "search" | "error" | "empty" | "noData";

// Mapeamento de tipos para ícones
export const EMPTY_STATE_ICONS: Record<EmptyStateType, string> = {
  search: "heroicons:magnifying-glass",
  error: "heroicons:exclamation-triangle",
  empty: "heroicons:inbox",
  noData: "heroicons:document",
} as const;
