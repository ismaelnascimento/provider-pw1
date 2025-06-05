var express = require("express");
var router = express.Router();

/* GET login listing. */
router.get("/", function (req, res, next) {
  res.render("signup", {
    pageName: "Login - Provider",
    roleId: req.query.r
  });
});

module.exports = router;
