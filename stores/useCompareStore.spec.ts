import { setActivePinia, createPinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import { useCompareStore } from "./useCompareStore";

describe("useCompareStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should start with an empty selectedHotels array", () => {
    const store = useCompareStore();
    expect(store.selectedHotels).toEqual([]);
  });

  it("should add a hotel to selectedHotels", () => {
    const store = useCompareStore();
    const hotel = { id: 1, name: "Hotel 1", price: 100 } as any;
    store.addToCompare(hotel);
    expect(store.selectedHotels).toHaveLength(1);
    expect(store.selectedHotels[0]).toEqual(hotel);
  });

  it("should not add more than 3 hotels to selectedHotels", () => {
    const store = useCompareStore();
    const hotel1 = { id: 1, name: "Hotel 1", price: 100 } as any;
    const hotel2 = { id: 2, name: "Hotel 2", price: 150 } as any;
    const hotel3 = { id: 3, name: "Hotel 3", price: 200 } as any;
    const hotel4 = { id: 4, name: "Hotel 4", price: 250 } as any;

    store.addToCompare(hotel1);
    store.addToCompare(hotel2);
    store.addToCompare(hotel3);
    store.addToCompare(hotel4); // Este não deve ser adicionado

    expect(store.selectedHotels).toHaveLength(3);
    expect(store.selectedHotels).toEqual([hotel1, hotel2, hotel3]);
  });

  it("should remove a hotel from selectedHotels", () => {
    const store = useCompareStore();
    const hotel1 = { id: 1, name: "Hotel 1", price: 100 } as any;
    const hotel2 = { id: 2, name: "Hotel 2", price: 150 } as any;

    store.addToCompare(hotel1);
    store.addToCompare(hotel2);
    store.removeFromCompare(1);

    expect(store.selectedHotels).toHaveLength(1);
    expect(store.selectedHotels[0]).toEqual(hotel2);
  });
});
