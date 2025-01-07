// types/hotel.ts
export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image?: string; // Tornando opcional
  large?: boolean; // Adicionando large
  popular: boolean;
}

export interface HotelFeature {
  name: string;
  available: boolean;
}
