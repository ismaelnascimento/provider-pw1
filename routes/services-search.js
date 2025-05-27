var express = require("express");
var services = require("../data/services");
var router = express.Router();

/* GET search listing. */

router.get("/:search", function (req, res, next) {
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

  res.render("index", { services: filteredServices });
});

module.exports = router;
