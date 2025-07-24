var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
var services = require("../../data/services");
var crypto = require("crypto")
const { users } = require("../../data/users");
const UsersDAO = require("../../DAO/usersDAO");
const { dbUsers, bcrypt } = require("../../database");

/* GET signup listing. */
router.get("/", function (req, res, next) {
  res.render("signup", {
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
    if (roleId == 0 && !username || !password || !locationLatitude || !locationLongitude) {
      res.render("signup", {
        pageName: "Registro - Provider",
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        roleId: req.query.r,
        error: "Preencha todos os campos.",
      });
    } else if (roleId == 1 && !username || !password || !locationCity || !locationState || !locationNeighborhood || !locationStreet || !serviceName || !serviceCategory || !serviceLink || !locationLatitude || !locationLongitude) {
      res.render("signup", {
        pageName: "Registro - Provider",
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        roleId: req.query.r,
        error: "Preencha todos os campos.",
      });
    }
    const userExists = await UsersDAO.getUser(dbUsers, { username, roleId });

    if (userExists) {
      res.render("signup", {
        pageName: "Registro - Provider",
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        roleId: req.query.r,
        error: "Este usuário já existe.",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // let newUser;

    // const location = { type: "Point", coordinates: [locationLongitude, locationLatitude], city: locationCity, neighborhood: locationNeighborhood, state: locationState, street: locationStreet }
    // const generateId = crypto.randomUUID();
    // const user = { id: generateId, username, roleId, password: hashedPassword, service: null, location };

    // if (roleId == 0) {
    //   newUser = await UsersDAO.insertUser(dbUsers, user);
    // } else {
    //   const generateServiceId = crypto.randomUUID();

    //   const service = {
    //     id: generateServiceId,
    //     name: serviceName,
    //     category: serviceCategory,
    //     link: serviceLink,
    //     location,
    //     contact: serviceLink,
    //     stars: 0,
    //     // favorite:
    //     // {
    //     //   "_id": ObjectId("fav001"),
    //     //   "userId": ObjectId("userA"),
    //     //   "serviceId": ObjectId("service123"),
    //     //   "createdAt": ISODate("2025-07-24T19:30:00Z")
    //     // }
    //   }
    //   newUser = await UsersDAO.insertUser(dbUsers, { ...user, service });
    // }

    // req.session.user = newUser;
    // res.redirect('/');
    // console.log(`Cadastro de ${serviceName} feito com succeso!`)
  } catch (err) {
    console.log("Ocorreu um erro ao fazer cadastro:")
    console.log(err)

    res.render("signup", {
      pageName: "Registro - Provider",
      categories: categories.filter((category) => {
        return category.name !== "Todos";
      }),
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
