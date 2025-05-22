var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  var users = [
    {
      userName: "ismaelnascimento",
      roleId: 0,
    },
  ];

  res.send("respond with a resource");
});

module.exports = router;
