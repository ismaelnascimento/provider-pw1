var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao destruir a sessão:", err);
            return res.status(500).send("Erro ao fazer logout.");
        }
        res.redirect("/");
    });
});

module.exports = router;
