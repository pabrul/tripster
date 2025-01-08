import { setActivePinia, createPinia } from "pinia";
import { useHotelStore } from "./useHotelStore";
import { vi, describe, beforeEach, it, expect } from "vitest";

vi.mock("@/stores/useAlertStore", () => ({
  useAlertStore: () => ({
    showAlert: vi.fn(),
  }),
}));

describe("useHotelStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should initialize with default values", () => {
    const store = useHotelStore();
    expect(store.hotels).toEqual([]);
    expect(store.popularDestinations).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.isLoadingPopular).toBe(false);
  });

  it("should fetch popular destinations and filter by popular hotels", async () => {
    const mockHotels = [
      { id: 1, name: "Hotel A", popular: true, price: 100 },
      { id: 2, name: "Hotel B", popular: false, price: 200 },
    ];

    vi.stubGlobal(
      "$fetch",
      vi.fn(() => Promise.resolve(mockHotels))
    );

    const store = useHotelStore();
    await store.fetchPopularDestinations();

    expect(store.popularDestinations).toEqual([
      { id: 1, name: "Hotel A", popular: true, price: 100 },
    ]);
    expect(store.isLoadingPopular).toBe(false);
  });

  it("should handle fetchPopularDestinations error", async () => {
    vi.stubGlobal(
      "$fetch",
      vi.fn(() => Promise.reject(new Error("Error fetching")))
    );

    const store = useHotelStore();
    await store.fetchPopularDestinations();

    expect(store.popularDestinations).toEqual([]);
    expect(store.isLoadingPopular).toBe(false);
  });

  it("should fetch hotels based on filters", async () => {
    const mockHotels = [
      { id: 1, name: "Hotel A", price: 100 },
      { id: 2, name: "Hotel B", price: 200 },
    ];

    vi.stubGlobal(
      "$fetch",
      vi.fn(() => Promise.resolve(mockHotels))
    );

    const store = useHotelStore();
    await store.fetchHotels({ location: "Paris" });

    expect(store.hotels).toEqual(mockHotels);
    expect(store.isLoading).toBe(false);
  });

  it("should reset search to popular destinations", () => {
    const store = useHotelStore();

    store.resetSearch();

    expect(store.hotels).toEqual([]);
  });

  it("should load more hotels", async () => {
    const store = useHotelStore();
    store.popularDestinations = Array(10).fill({
      id: 1,
      name: "Hotel",
      price: 100,
    });

    await store.loadMore();

    expect(store.isLoadingMore).toBe(false);
  });
});
