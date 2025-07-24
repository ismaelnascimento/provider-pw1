var express = require("express");
var router = express.Router();
const UsersDAO = require("../../DAO/usersDAO");
const { dbUsers, bcrypt } = require("../../database");

router.get("/", function (req, res, next) {
  res.render("login", {
    pageName: "Login - Provider",
    roleId: req.query.r,
    error: null,
  });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const roleId = parseInt(req.query.r);

  try {
    if (!username || !password) {
      res.render("login", {
        pageName: "Login - Provider",
        roleId: req.query.r,
        error: "Preencha todos os campos.",
      });
    }

    const user = await UsersDAO.getUser(dbUsers, { username, roleId });

    if (!user) {
      res.render("login", {
        pageName: "Login - Provider",
        roleId: req.query.r,
        error: "Nome de usuário incorreto. Tente novamente.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.render("login", {
        pageName: "Login - Provider",
        roleId: req.query.r,
        error: "Senha incorreta. Tente novamente.",
      });
    }

    req.session.user = user;
    res.redirect('/');
    console.log("Login feito com succeso!")
  } catch (err) {
    console.log("Ocorreu um erro ao fazer login:")
    console.log(err)

    res.render("login", {
      pageName: "Login - Provider",
      roleId: req.query.r,
      error: `Ocorreu um erro de servidor: ${err}`,
    });
  }

  res.render("login", {
    pageName: "Login - Provider",
    roleId: req.query.r,
    error: null,
  });
})
module.exports = router;
