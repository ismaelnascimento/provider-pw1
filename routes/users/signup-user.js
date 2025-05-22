var express = require("express");
var router = express.Router();

/* GET signup user listing. */
router.get("/:userName/:roleId", function (req, res, next) {
  res.send(
    `User: ${req.params.userName}, Role: ${
      req.params.roleId === 0 ? "Cliente" : "Provedor de serviço"
    }`
  );
});

module.exports = router;
