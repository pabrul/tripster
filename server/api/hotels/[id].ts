// server/api/hotels/[id].ts
export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || "0");

  const hotels = [
    {
      id: 1,
      name: "Spain",
      location: "Spain",
      price: 100,
      rating: 4.5,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      checkIn: "2025-01-15",
      checkOut: "2025-01-20",
    },
    {
      id: 2,
      name: "London",
      location: "London",
      price: 200,
      rating: 4.8,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      checkIn: "2025-02-10",
      checkOut: "2025-02-15",
    },
    {
      id: 3,
      name: "Lisbon",
      location: "Portugal",
      price: 150,
      rating: 4.2,
      large: false,
      popular: false,
      image: "https://images.pexels.com/photos/358485/pexels-photo-358485.jpeg",
      checkIn: "2025-03-05",
      checkOut: "2025-03-10",
    },
    {
      id: 4,
      name: "Croatia",
      location: "Croatia",
      price: 180,
      rating: 4.6,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      checkIn: "2025-01-25",
      checkOut: "2025-01-30",
    },
    {
      id: 5,
      name: "Paris",
      location: "France",
      price: 250,
      rating: 4.9,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      checkIn: "2025-02-20",
      checkOut: "2025-02-25",
    },
    {
      id: 6,
      name: "Berlin",
      location: "Germany",
      price: 170,
      rating: 4.4,
      large: true,
      popular: false,
      image:
        "https://images.pexels.com/photos/1112496/pexels-photo-1112496.jpeg",
      checkIn: "2025-03-01",
      checkOut: "2025-03-06",
    },
    {
      id: 7,
      name: "Tokyo",
      location: "Japan",
      price: 300,
      rating: 4.7,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/358483/pexels-photo-358483.jpeg",
      checkIn: "2025-04-10",
      checkOut: "2025-04-15",
    },
    {
      id: 8,
      name: "New York",
      location: "USA",
      price: 280,
      rating: 4.6,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      checkIn: "2025-05-05",
      checkOut: "2025-05-10",
    },
    {
      id: 9,
      name: "Buenos Aires",
      location: "Argentina",
      price: 120,
      rating: 4.1,
      large: false,
      popular: false,
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      checkIn: "2025-02-12",
      checkOut: "2025-02-17",
    },
    {
      id: 10,
      name: "Cape Town",
      location: "South Africa",
      price: 200,
      rating: 4.5,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/358485/pexels-photo-358485.jpeg",
      checkIn: "2025-03-18",
      checkOut: "2025-03-23",
    },
    {
      id: 11,
      name: "Sydney",
      location: "Australia",
      price: 270,
      rating: 4.7,
      large: false,
      popular: false,
      image: "https://images.pexels.com/photos/358483/pexels-photo-358483.jpeg",
      checkIn: "2025-04-01",
      checkOut: "2025-04-06",
    },
    {
      id: 12,
      name: "Dubai",
      location: "UAE",
      price: 320,
      rating: 4.9,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      checkIn: "2025-02-25",
      checkOut: "2025-03-01",
    },
    {
      id: 13,
      name: "Rome",
      location: "Italy",
      price: 210,
      rating: 4.7,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
    },
    {
      id: 14,
      name: "Athens",
      location: "Greece",
      price: 180,
      rating: 4.6,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      checkIn: "2025-03-10",
      checkOut: "2025-03-15",
    },
    {
      id: 15,
      name: "Istanbul",
      location: "Turkey",
      price: 220,
      rating: 4.8,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/358485/pexels-photo-358485.jpeg",
      checkIn: "2025-04-15",
      checkOut: "2025-04-20",
    },
    {
      id: 16,
      name: "Bangkok",
      location: "Thailand",
      price: 190,
      rating: 4.5,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/358483/pexels-photo-358483.jpeg",
      checkIn: "2025-05-01",
      checkOut: "2025-05-06",
    },
    {
      id: 17,
      name: "Seoul",
      location: "South Korea",
      price: 260,
      rating: 4.7,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      checkIn: "2025-03-22",
      checkOut: "2025-03-27",
    },
    {
      id: 18,
      name: "Los Angeles",
      location: "USA",
      price: 300,
      rating: 4.8,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      checkIn: "2025-02-05",
      checkOut: "2025-02-10",
    },
    {
      id: 19,
      name: "Rio de Janeiro",
      location: "Brazil",
      price: 150,
      rating: 4.3,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      checkIn: "2025-01-20",
      checkOut: "2025-01-25",
    },
    {
      id: 20,
      name: "Mexico City",
      location: "Mexico",
      price: 140,
      rating: 4.4,
      large: true,
      popular: true,
      image: "https://images.pexels.com/photos/358485/pexels-photo-358485.jpeg",
      checkIn: "2025-02-18",
      checkOut: "2025-02-23",
    },
    {
      id: 21,
      name: "Toronto",
      location: "Canada",
      price: 240,
      rating: 4.6,
      large: false,
      popular: true,
      image: "https://images.pexels.com/photos/358483/pexels-photo-358483.jpeg",
      checkIn: "2025-03-12",
      checkOut: "2025-03-17",
    },
  ];

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    throw createError({
      statusCode: 404,
      message: "Hotel not found",
    });
  }

  return hotel;
});
