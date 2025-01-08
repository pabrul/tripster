import { setActivePinia, createPinia } from "pinia";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { useBookingStore } from "./useBookingStore";
import type { $Fetch } from "nitropack";

// Mock global para $fetch
global.$fetch = vi.fn() as unknown as $Fetch;

describe("useBookingStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should start with an empty bookings array and isLoading as false", () => {
    const store = useBookingStore();
    expect(store.bookings).toEqual([]);
    expect(store.isLoading).toBe(false);
  });

  it("should fetch user bookings and populate the bookings array", async () => {
    const store = useBookingStore();
    const mockBookings = [
      { id: 1, user: "John Doe", details: "Booking 1 details" },
      { id: 2, user: "Jane Doe", details: "Booking 2 details" },
    ];

    ($fetch as any).mockResolvedValueOnce(mockBookings);

    await store.fetchUserBookings();

    expect(store.bookings).toEqual(mockBookings);
    expect(store.isLoading).toBe(false);
    expect($fetch).toHaveBeenCalledWith("/api/bookings");
  });

  it("should handle errors when fetching user bookings", async () => {
    const store = useBookingStore();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    ($fetch as any).mockRejectedValueOnce(
      new Error("Failed to fetch bookings")
    );

    await store.fetchUserBookings();

    expect(store.bookings).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error("Failed to fetch bookings")
    );
  });

  it("should handle errors when creating a booking", async () => {
    const store = useBookingStore();
    const errorMessage = "Failed to create booking";

    ($fetch as any).mockRejectedValueOnce(new Error(errorMessage));

    await expect(store.createBooking({})).rejects.toThrow(errorMessage);
    expect(store.bookings).toEqual([]);
    expect(store.isLoading).toBe(false);
  });
});
