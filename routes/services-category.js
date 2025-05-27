var express = require("express");
var services = require("../data/services");
const categories = require("../data/categories");
const { user } = require("../data/users");
var router = express.Router();

/* GET categories listing. */

router.get("/:categoryName", function (req, res, next) {
  const userLocation = user.location;
  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  const filteredServices = services.filter((service) => {
    return service.category.name
      .toLowerCase()
      .includes(req.params.categoryName.toLowerCase());
  });

  const popularServices = services.filter((service) => {
    return service.stars >= 4;
  });

  res.render("index", {
    isServicesFavorites: false,

    services: filteredServices,
    popularServices: popularServices,
    categories: categories,
    userLocationStr,
  });
});

module.exports = router;
