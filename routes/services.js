var express = require("express");
var categories = require("../data/categories");
var services = require("../data/services");
const { user, getUserByUsername } = require("../data/users");

var router = express.Router();

/* GET services listing. */
router.get("/", function (req, res, next) {
  const {
    u: username,
    r: roleId,
    lc: locationCity,
    ls: locationState,
    ln: locationNeighborhood,
    lst: locationStreet,
    si: serviceId,
    sn: serviceName,
    sc: serviceCategory,
    sl: serviceLink,
  } = req.query;

  const getServiceSearch =
    !serviceId && roleId == 1
      ? getUserByUsername(username).service
      : serviceId && roleId == 1
      ? {
          id: serviceId,
          name: serviceName || "Serviço sem nome",
          category: categories.find((cat) => cat.name === serviceCategory) || {
            name: "Todos",
          },
          link: serviceLink || "",
          location: {
            city: locationCity || "",
            state: locationState || "",
            neighborhood: locationNeighborhood || "",
            street: locationStreet || "",
          },
          contact: req.query.sl || "",
          stars: 0,
          favorite: false,
        }
      : null;

  const getUser = username
    ? {
        username: username,
        roleId: roleId,
        // 0 -> client
        // 1 -> service provider
        location: getUserByUsername(username)?.location || {
          state: locationState || "",
          city: locationCity || "",
          neighborhood: locationNeighborhood || "",
          street: locationStreet || "",
        },
        service: getServiceSearch,
      }
    : user;

  const userLocation = getUser?.location ?? {
    state: locationState || "",
    city: locationCity || "",
    neighborhood: locationNeighborhood || "",
    street: locationStreet || "",
  };

  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  if (serviceId) {
    const newService = getServiceSearch;

    if (!services.some((service) => service.id === serviceId)) {
      services.push(newService);
    }
  }

  const filteredServices = services.filter((service) => {
    const serviceLocation = service.location;

    return (
      userLocation.city
        .toLowerCase()
        .includes(serviceLocation.city.toLowerCase()) ||
      userLocation.state
        .toLowerCase()
        .includes(serviceLocation.state.toLowerCase()) ||
      userLocation.neighborhood
        .toLowerCase()
        .includes(serviceLocation.neighborhood.toLowerCase()) ||
      userLocation.street
        .toLocaleLowerCase()
        .includes(serviceLocation.street.toLowerCase())
    );
  });

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
