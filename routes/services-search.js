var express = require("express");
var services = require("../data/services");
const categories = require("../data/categories");
const { user, getUserByUsername } = require("../data/users");
var router = express.Router();

/* GET search listing. */

router.get("/:search", function (req, res, next) {
  const getUser = req.session.user || user;

  const userLocation = getUser?.location || {
    state: "",
    city: "",
    neighborhood: "",
    street: "",
  };

  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  const filteredServices = services.filter((service) => {
    const search = req.params.search.toLowerCase();
    const serviceLocation = service.location;
    const serviceLocationStr = `${serviceLocation.state}, ${serviceLocation.city}, ${serviceLocation.neighborhood}, ${serviceLocation.street}`;

    return (
      service.category.name.toLowerCase().includes(search) ||
      service.name.toLowerCase().includes(search) ||
      serviceLocationStr.toLowerCase().includes(search)
    );
  });

  res.render("index", {
    search: req.params.search,
    isServicesFavorites: false,
    services: filteredServices,
    popularServices: [],
    categories: categories,
    user: getUser,
    userLocationStr,
  });
});

module.exports = router;
