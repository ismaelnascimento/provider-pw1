var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
var services = require("../../data/services");
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
  const { username, password, locationCity, locationState, locationNeighborhood, locationStreet, serviceName, serviceCategory, serviceLink } = req.body;
  const roleId = parseInt(req.query.r);

  try {
    if (roleId == 0 && !username || !password) {
      res.render("signup", {
        pageName: "Registro - Provider",
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        roleId: req.query.r,
        error: "Preencha todos os campos.",
      });

    } else if (roleId == 1 && !username || !password || !locationCity || !locationState || !locationNeighborhood || !locationStreet || !serviceName || !serviceCategory || !serviceLink) {
      res.render("signup", {
        pageName: "Registro - Provider",
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        roleId: req.query.r,
        error: "Preencha todos os campos.",
      });
    }
    /*
    {
      "username": "ismaelnascimento",
      "roleId": 0,
      password: login
      "location": {
        "street": "Rua 1",
        "neighborhood": "Bairro 1",
        "city": "Ceará",
        "state": "Pacajus",
        "lat": -3.744062,
        "lng": -38.535774
      },
      "service": null
    }
    */
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;

    if (roleId == 0) {
      newUser = await UsersDAO.insertUser(dbUsers, { username, email, hashedPassword });
    } else {
      // colocar o resto das informações
      newUser = await UsersDAO.insertUser(dbUsers, { username, email, hashedPassword });
    }

    req.session.user = newUser;
    res.redirect('/');
    console.log("Cadastro feito com succeso!")
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
// // Register User
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
// id: serviceId,
//                 name: serviceName,
//                 category: serviceCategory,
//                 link: serviceLink,
//                 location: {
//                     city: locationCity,
//                     state: locationState,
//                     neighborhood: locationNeighborhood,
//                     street: locationStreet
//                 },
//                 contact: serviceLink,
//                 stars: 0,
//                 favorite: false
//   try {
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const newUser = await User.create({ username, email, password });
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
