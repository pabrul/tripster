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
      large: true,
      popular: true,
    },
    {
      id: 2,
      name: "London",
      location: "London",
      price: 200,
      rating: 4.8,
      large: false,
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
