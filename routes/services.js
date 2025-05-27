var express = require("express");
var categories = require("../data/categories");
var services = require("../data/services");
const { user } = require("../data/users");

var router = express.Router();

/* GET services listing. */

router.get("/", function (req, res, next) {
  const userLocation = user.location;
  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  const filteredServices = services.filter((service) => {
    const serviceLocation = service.location;
    const serviceLocationStr = `${serviceLocation.state}, ${serviceLocation.city}, ${serviceLocation.neighborhood}, ${serviceLocation.street}`;

    return serviceLocationStr
      .toLowerCase()
      .includes(userLocationStr.toLowerCase());
  });
  const popularServices = services.filter((service) => {
    return service.stars >= 4;
  });

  res.render("index", {
    search: "",
    isServicesFavorites: false,
    services: filteredServices,
    popularServices: popularServices,
    categories: categories,
    userLocationStr,
  });
});

module.exports = router;
