// tests/stores/useAlertStore.spec.ts
import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAlertStore } from "@/stores/useAlertStore";

describe("useAlertStore", () => {
  beforeEach(() => {
    // Cria uma nova instância do Pinia antes de cada teste
    setActivePinia(createPinia());
    // Restaura todos os mocks
    vi.restoreAllMocks();
  });

  it("should initialize with default values", () => {
    const store = useAlertStore();

    expect(store.message).toBe("");
    expect(store.type).toBe("info");
    expect(store.visible).toBe(false);
  });

  it("should show alert with default values", () => {
    const store = useAlertStore();

    store.showAlert("Test message");

    expect(store.message).toBe("Test message");
    expect(store.type).toBe("info");
    expect(store.visible).toBe(true);
  });

  it("should show alert with custom type", () => {
    const store = useAlertStore();

    store.showAlert("Error message", "error");

    expect(store.message).toBe("Error message");
    expect(store.type).toBe("error");
    expect(store.visible).toBe(true);
  });

  it("should hide alert", () => {
    const store = useAlertStore();

    store.showAlert("Test message");
    store.hideAlert();

    expect(store.message).toBe("");
    expect(store.visible).toBe(false);
  });

  it("should auto-hide alert after duration", async () => {
    vi.useFakeTimers();
    const store = useAlertStore();

    store.showAlert("Test message", "info", 1000);

    expect(store.visible).toBe(true);

    vi.advanceTimersByTime(1000);

    expect(store.visible).toBe(false);
    expect(store.message).toBe("");

    vi.useRealTimers();
  });

  it("should clear previous timeout when showing new alert", () => {
    vi.useFakeTimers();
    const store = useAlertStore();

    store.showAlert("First message");
    store.showAlert("Second message");

    vi.advanceTimersByTime(3000);

    expect(store.message).toBe("");
    expect(store.visible).toBe(false);

    vi.useRealTimers();
  });
});
