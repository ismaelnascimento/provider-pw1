var express = require("express");
var categories = require("../data/categories");
var services = require("../data/services");
// const { user } = require("../data/users");
const ServicesDAO = require("../DAO/servicesDAO");
const { dbServices } = require("../database");

var router = express.Router();

/* GET services listing. */
router.get("/", async function (req, res, next) {
  const getUser = req?.session?.user;
  console.log("User session:", getUser);
  const userLocation = getUser?.location || {
    type: "Point",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    coordinates: [0, 0],
  };

  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  let filteredServices = [];

  if (userLocation.coordinates[0] && userLocation.coordinates[1]) {
    try {
      filteredServices = await ServicesDAO.getServicesByLocal(dbServices, {
        latitude: userLocation.coordinates[1],
        longitude: userLocation.coordinates[0],
        maxDistance: 10000
      });
    } catch (error) {
      console.error("Erro ao buscar serviços por localização:", error);
    }
  }

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

  const popularServicesDao = await ServicesDAO.getServicesPopular(dbServices)

  const popularServices = popularServicesDao.filter((service) => {
    return (
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