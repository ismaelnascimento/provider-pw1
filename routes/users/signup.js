var express = require("express");
var router = express.Router();

/* GET signup listing. */
router.get("/", function (req, res, next) {
  const userName = prompt("Enter your user name:");
  const roleId = prompt(
    "Enter your role ID (0 for Cliente, 1 for Provedor de serviço):"
  );
  res.redirect(`/signup/${userName}/${roleId}`);
});

module.exports = router;
