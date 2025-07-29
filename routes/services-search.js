var express = require("express");
const categories = require("../data/categories");
const ServicesDAO = require("../DAO/servicesDAO");
const { dbServices } = require("../database");
var router = express.Router();

/* GET search listing. */

router.get("/:search", async function (req, res, next) {
  const getUser = req?.session?.user;

  const userLocation = getUser?.location || {
    type: "Point",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    coordinates: [0, 0],
  };

  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  const filteredServices = await ServicesDAO.getServicesBySearch(dbServices, req.params.search)
  console.log("Filtered services:", filteredServices);

  res.render("index", {
    search: req.params.search,
    isServicesFavorites: false,
    services: await ServicesDAO.servicesWithFavorites(filteredServices, getUser),
    popularServices: [],
    categories: categories,
    user: getUser,
    userLocationStr,
  });
});

module.exports = router;
