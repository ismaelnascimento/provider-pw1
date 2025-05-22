import { categories } from "./categories";

var express = require("express");
var router = express.Router();

/* GET categories listing. */

export var services = [
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
  res.render("index", { services: services });
});

module.exports = router;
