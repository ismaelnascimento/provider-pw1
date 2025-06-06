var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
var services = require("../../data/services");
const { users } = require("../../data/users");

/* GET signup listing. */
router.get("/", function (req, res, next) {
  res.render("signup", {
    pageName: "Registro - Provider",
    services: services,
    users: users,
    categories: categories.filter((category) => {
      return category.name !== "Todos";
    }),
    roleId: req.query.r,
  });
});

module.exports = router;
