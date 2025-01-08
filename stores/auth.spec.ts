// tests/stores/useAuthStore.test.ts
import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "@/stores/auth";

describe("useAuthStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should start with null values", () => {
    const store = useAuthStore();

    expect(store.user).toBeNull();
    expect(store.token).toBeNull();
  });

  it("should set user and token on login", () => {
    const store = useAuthStore();
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    const mockToken = "fake-jwt-token";

    store.login(mockUser, mockToken);

    expect(store.user).toEqual(mockUser);
    expect(store.token).toBe(mockToken);
  });

  it("should clear user and token on logout", () => {
    const store = useAuthStore();
    // Primeiro fazemos login
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    store.login(mockUser, "fake-jwt-token");

    // Então testamos o logout
    store.logout();

    expect(store.user).toBeNull();
    expect(store.token).toBeNull();
  });

  it("should update state correctly when logging in multiple times", () => {
    const store = useAuthStore();

    // Primeiro login
    const firstUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    store.login(firstUser, "token-1");
    expect(store.user).toEqual(firstUser);
    expect(store.token).toBe("token-1");

    // Segundo login
    const secondUser = {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
    };
    store.login(secondUser, "token-2");
    expect(store.user).toEqual(secondUser);
    expect(store.token).toBe("token-2");
  });
});
