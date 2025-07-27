var express = require("express");
var categories = require("../data/categories");
var services = require("../data/services");
const { user, getUserByUsername } = require("../data/users");
const ServicesDAO = require("../DAO/servicesDAO");
const { dbServices } = require("../database");

var router = express.Router();

/* GET services listing. */
router.get("/", async function (req, res, next) {
  const getUser = req?.session?.user || user;
  console.log(getUser)
  const userLocation = getUser?.location || {
    state: "",
    city: "",
    neighborhood: "",
    street: "",
  };

  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  let filteredServices = [];
  
  // Verifica se temos coordenadas para usar geolocalização
  if (userLocation.latitude && userLocation.longitude) {
    try {
      // Usa o método de geolocalização para encontrar serviços próximos
      filteredServices = await ServicesDAO.getServicesByLocal(dbServices, {
        latitude: userLocation.coordinates[1],
        longitude: userLocation.coordinates[0],
        maxDistance: 10000 // 10km de distância máxima
      });
    } catch (error) {
      console.error("Erro ao buscar serviços por localização:", error);
    }
  }
  
  // Fallback para o método de filtro por texto caso a geolocalização falhe ou não esteja disponível
  if (!filteredServices || filteredServices.length === 0) {
    filteredServices = services.filter((service) => {
      const serviceLocation = service.location || {};

      return (
        (userLocation.city && serviceLocation.city &&
          userLocation.city.toLowerCase().includes(serviceLocation.city.toLowerCase())) ||
        (userLocation.state && serviceLocation.state &&
          userLocation.state.toLowerCase().includes(serviceLocation.state.toLowerCase())) ||
        (userLocation.neighborhood && serviceLocation.neighborhood &&
          userLocation.neighborhood.toLowerCase().includes(serviceLocation.neighborhood.toLowerCase())) ||
        (userLocation.street && serviceLocation.street &&
          userLocation.street.toLowerCase().includes(serviceLocation.street.toLowerCase()))
      );
    });
  }

  // Obtém serviços populares que não estão na lista filtrada
  const popularServices = services.filter((service) => {
    return (
      service.stars >= 4 &&
      !filteredServices.some(
        (filteredService) => filteredService.id === service.id
      )
    );
  });

  res.render("index", {
    search: "",
    isServicesFavorites: false,
    services: filteredServices,
    popularServices: popularServices,
    categories: categories,
    user: getUser,
    userLocationStr,
  });
});

module.exports = router;