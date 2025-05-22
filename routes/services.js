var express = require("express");
var router = express.Router();

/* GET services listing. */
var categories = [
  {
    name: "Cabeleleiro",
  },
  {
    name: "Predeiro",
  },
  {
    name: "Faxineiro",
  },
  {
    name: "Reparo",
  },
];

var services = [
  {
    name: "Senhor lima",
    category: categories[0],
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    stars: 4.5,
  },
];

router.get("/", function (req, res, next) {
  res.render("index", { services: services, categories: categories });
});

module.exports = {
  router,
  services,
  categories,
};
