var express = require("express");
const categories = require("../data/categories");
const ServicesDAO = require("../DAO/servicesDAO");
const { dbServices } = require("../database");
var router = express.Router();

/* GET categories listing. */

router.get("/:categoryName", async function (req, res, next) {
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

  const filteredServices = userLocation?.coordinates ? await ServicesDAO.getServicesByLocalAndCategory(dbServices, {
    latitude: userLocation?.coordinates[1],
    longitude: userLocation?.coordinates[0],
    maxDistance: 8000
  }, decodeURIComponent(req.params.categoryName)) : await ServicesDAO.getServicesByLocalAndCategory(dbServices, null, decodeURIComponent(req.params.categoryName));

  res.render("index", {
    isServicesFavorites: false,
    search: "",
    user: getUser,
    services: await ServicesDAO.servicesWithFavorites(filteredServices, getUser),
    popularServices: [],
    categories: categories,
    userLocationStr,
  });
});

module.exports = router;
