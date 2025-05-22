var express = require("express");
var router = express.Router();

/* GET signup user listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
