var express = require("express");
var categories = require("../data/categories");
var services = require("../data/services");

var router = express.Router();

/* GET services listing. */

router.get("/", function (req, res, next) {
  res.render("index", { services: services, categories: categories });
});

module.exports = router