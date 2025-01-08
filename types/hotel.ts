// types/hotel.ts
export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string;
  large?: boolean;
  popular: boolean;
  maxGuests: number;
  checkIn: string;
  checkOut: string;
}

export interface HotelFeature {
  name: string;
  available: boolean;
}
