// server/api/hotels/index.ts
export default defineEventHandler((event) => {
  // Dados mockados dos hotéis
  const hotels = [
    {
      id: 1,
      name: "Spain",
      location: "Spain",
      price: 100,
      rating: 4.5,
      large: false,
      popular: true,
    },
    {
      id: 2,
      name: "London",
      location: "London",
      price: 200,
      rating: 4.8,
      large: true,
      popular: true,
    },
    {
      id: 3,
      name: "Lisbon",
      location: "Portugal",
      price: 150,
      rating: 4.2,
      large: false,
      popular: false,
    },
    {
      id: 4,
      name: "Croatia",
      location: "Croatia",
      price: 180,
      rating: 4.6,
      large: true,
      popular: true,
    },
    {
      id: 5,
      name: "Paris",
      location: "France",
      price: 250,
      rating: 4.9,
      large: false,
      popular: true,
    },
    {
      id: 6,
      name: "Berlin",
      location: "Germany",
      price: 170,
      rating: 4.4,
      large: true,
      popular: false,
    },
    {
      id: 7,
      name: "Tokyo",
      location: "Japan",
      price: 300,
      rating: 4.7,
      large: false,
      popular: true,
    },
    {
      id: 8,
      name: "New York",
      location: "USA",
      price: 280,
      rating: 4.6,
      large: true,
      popular: true,
    },
    {
      id: 9,
      name: "Buenos Aires",
      location: "Argentina",
      price: 120,
      rating: 4.1,
      large: false,
      popular: false,
    },
    {
      id: 10,
      name: "Cape Town",
      location: "South Africa",
      price: 200,
      rating: 4.5,
      large: true,
      popular: true,
    },
    {
      id: 11,
      name: "Sydney",
      location: "Australia",
      price: 270,
      rating: 4.7,
      large: false,
      popular: false,
    },
    {
      id: 12,
      name: "Dubai",
      location: "UAE",
      price: 320,
      rating: 4.9,
      large: false,
      popular: true,
    },
    {
      id: 13,
      name: "Rome",
      location: "Italy",
      price: 210,
      rating: 4.7,
      large: true,
      popular: true,
    },
    {
      id: 14,
      name: "Athens",
      location: "Greece",
      price: 180,
      rating: 4.6,
      large: false,
      popular: true,
    },
    {
      id: 15,
      name: "Istanbul",
      location: "Turkey",
      price: 220,
      rating: 4.8,
      large: true,
      popular: true,
    },
    {
      id: 16,
      name: "Bangkok",
      location: "Thailand",
      price: 190,
      rating: 4.5,
      large: true,
      popular: true,
    },
    {
      id: 17,
      name: "Seoul",
      location: "South Korea",
      price: 260,
      rating: 4.7,
      large: false,
      popular: true,
    },
    {
      id: 18,
      name: "Los Angeles",
      location: "USA",
      price: 300,
      rating: 4.8,
      large: true,
      popular: true,
    },
    {
      id: 19,
      name: "Rio de Janeiro",
      location: "Brazil",
      price: 150,
      rating: 4.3,
      large: false,
      popular: true,
    },
    {
      id: 20,
      name: "Mexico City",
      location: "Mexico",
      price: 140,
      rating: 4.4,
      large: true,
      popular: true,
    },
    {
      id: 21,
      name: "Toronto",
      location: "Canada",
      price: 240,
      rating: 4.6,
      large: false,
      popular: true,
    },
  ];

  // Pega os parâmetros da query
  const query = getQuery(event);
  const searchLocation = query.location?.toString().toLowerCase();

  // Se não houver parâmetros de busca, retorna todos os hotéis
  if (!searchLocation) {
    return hotels;
  }

  // Filtra os hotéis baseado na localização
  return hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchLocation) ||
      hotel.location.toLowerCase().includes(searchLocation)
  );
});
