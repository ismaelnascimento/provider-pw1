var express = require("express");
var router = express.Router();

/* GET signup listing. */
router.get("/", function (req, res, next) {
  res.render("signup", {
    pageName: "Registro - Provider",
    roleId: req.query.r
  });
});

module.exports = router;
