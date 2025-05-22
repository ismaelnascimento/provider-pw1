var express = require("express");
var router = express.Router();

/* GET categories listing. */

export const categories = [
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

router.get("/", function (req, res, next) {
  res.render("categories", { categories: categories });
});

module.exports = router;
