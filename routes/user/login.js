var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
const services = require("../../data/services");
const { users } = require("../../data/users");

/* GET login listing. */
router.get("/", function (req, res, next) {
  res.render("login", {
    pageName: "Login - Provider",
    users: users,
    services: services,
    categories: categories.filter((category) => {
      return category.name !== "Todos";
    }),
    roleId: req.query.r,
  });
});

module.exports = router;
