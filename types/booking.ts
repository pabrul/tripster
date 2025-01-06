export interface Booking {
  id: number;
  hotelId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}
