var express = require("express");
var services = require("../data/services");
var router = express.Router();

/* GET categories listing. */

router.get("/:categoryName", function (req, res, next) {
  const filteredServices = services.filter((service) => {
    return service.category.name
      .toLowerCase()
      .includes(req.params.categoryName.toLowerCase());
  });

  res.render("index", { services: filteredServices });
});

module.exports = router;
