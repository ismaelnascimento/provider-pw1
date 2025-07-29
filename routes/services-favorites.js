var express = require("express");
const categories = require("../data/categories");
const ServicesDAO = require("../DAO/servicesDAO");
const { dbServices, dbFavorites } = require("../database");
var router = express.Router();

/* GET favorites listing. */

router.get("/", async function (req, res, next) {
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

  const filteredServices = await ServicesDAO.getServicesFavorites(dbFavorites, getUser?.id);

  res.render("index", {
    search: "",
    isServicesFavorites: true,
    services: await ServicesDAO.servicesWithFavorites(filteredServices, getUser),
    popularServices: [],
    categories: categories,
    user: getUser,
    userLocationStr,
  });
});

module.exports = router;
