var express = require("express");
var router = express.Router();

/* GET login user listing. */
router.get("/:userId/:roleId", function (req, res, next) {
  res.send(
    `User: ${req.params.userId}, Role: ${
      req.params.roleId === 0 ? "Cliente" : "Provedor de serviço"
    }`
  );
});

module.exports = router;
