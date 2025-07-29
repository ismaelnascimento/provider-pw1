var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
var services = require("../../data/services");
var crypto = require("crypto")
const { users } = require("../../data/users");
const UsersDAO = require("../../DAO/usersDAO");
const { dbUsers, bcrypt, dbServices } = require("../../database");
const { create } = require("domain");
const ServicesDAO = require("../../DAO/servicesDAO");

/* GET signup listing. */
router.get("/", function (req, res, next) {
  return res.render("signup", {
    pageName: "Registro - Provider",
    categories: categories.filter((category) => {
      return category.name !== "Todos";
    }),
    roleId: req.query.r,
    error: null,
  });
});

router.post("/", async (req, res) => {
  const { username, password, locationCity, locationState, locationNeighborhood, locationStreet, serviceName, serviceCategory, serviceLink, locationLatitude, locationLongitude } = req.body;
  const roleId = parseInt(req.query.r);

  try {
    if (roleId == 0) {
      if (!username || !password || !locationLatitude || !locationLongitude) {
        console.log("não preencheu um campo")
        console.log(!username, !password, !locationLatitude, !locationLongitude)
        res.render("signup", {
          pageName: "Registro - Provider",
          categories: categories.filter((category) => {
            return category.name !== "Todos";
          }),
          roleId: req.query.r,
          error: "Preencha todos os campos.",
        });
      }
    } else if (roleId == 1) {

      if (!username || !password || !locationCity || !locationState || !locationNeighborhood || !locationStreet || !serviceName || !serviceCategory || !serviceLink || !locationLatitude || !locationLongitude) {
        console.log("não preencheu um campo")
        console.log(!username, !password, !locationCity, !locationState, !locationNeighborhood, !locationStreet, !serviceName, !serviceCategory, !serviceLink, !locationLatitude, !locationLongitude)
        return res.render("signup", {
          pageName: "Registro - Provider",
          categories: categories.filter((category) => {
            return category.name !== "Todos";
          }),
          roleId: req.query.r,
          error: "Preencha todos os campos.",
        });
      }
    }

    const userExists = await UsersDAO.getUser(dbUsers, { username, roleId });

    if (userExists) {
      return res.render("signup", {
        pageName: "Registro - Provider",
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        roleId: req.query.r,
        error: "Este usuário já existe.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;

    const location = { type: "Point", coordinates: [parseFloat(locationLongitude), parseFloat(locationLatitude)], city: locationCity, neighborhood: locationNeighborhood, state: locationState, street: locationStreet }
    const generateId = crypto.randomUUID();
    const user = { id: generateId, username, roleId, password: hashedPassword, service: null, location, createdAt: new Date() };

    if (roleId == 0) {
      newUser = await UsersDAO.insertUser(dbUsers, user);
    } else {
      const generateServiceId = crypto.randomUUID();

      const service = {
        id: generateServiceId,
        name: serviceName,
        category: serviceCategory,
        location,
        contact: serviceLink,
        stars: 0,
      }
      newUser = await UsersDAO.insertUser(dbUsers, { ...user, service });
      console.log("Usuário inserido com sucesso!")
      await ServicesDAO.insertService(dbServices, { ...service, user: user });
      console.log("Serviço inserido com sucesso!")
    }

    req.session.user = newUser;
    res.redirect('/');
  } catch (err) {
    console.log("Ocorreu um erro ao fazer cadastro:")
    console.log(err)

    return res.render("signup", {
      pageName: "Registro - Provider",
      categories: categories.filter((category) => {
        return category.name !== "Todos";
      }),
      roleId: req.query.r,
      error: `Ocorreu um erro de servidor: ${err}`,
    });
  }
})

module.exports = router;
