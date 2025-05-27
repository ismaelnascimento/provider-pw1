var express = require("express");
var services = require("../data/services");
const categories = require("../data/categories");
const { user } = require("../data/users");
var router = express.Router();

/* GET categories listing. */

router.get("/", function (req, res, next) {
  const userLocation = user.location;
  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  const filteredServices = services.filter((service) => {
    return service.favorite === true;
  });

  res.render("index", {
    isServicesFavorites: true,
    services: filteredServices,
    popularServices: [],
    categories: categories,
    userLocationStr,
  });
});

module.exports = router;
