var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
const services = require("../../data/services");
const { users } = require("../../data/users");
const UsersDAO = require("../../DAO/usersDAO");
const { dbUsers, bcrypt } = require("../../database");

router.get("/", function (req, res, next) {
  res.render("login", {
    pageName: "Login - Provider",
    users: users,
    services: services,
    categories: categories.filter((category) => {
      return category.name !== "Todos";
    }),
    roleId: req.query.r,
  });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const roleId = parseInt(req.query.r);

  console.log("oi", username, password, roleId)
  try {
    const user = await UsersDAO.getUser(dbUsers, { username, roleId });
    console.log(user)
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
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //  // Store user data in session
    //  req.session.user = user;
    //  res.redirect('/dashboard'); // Redirect to the dashboard page after successful login
    //  } else {
    //  res.status(401).send('Invalid email or password');
    //  }
    //  });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ message: 'Login successful', token });
    // res.json({ message: 'Login successful' });
    console.log("sucesso")
  } catch (err) {
    console.log("error")
    console.log(err)
    // res.status(500).json({ message: 'Server error' });
  }

  res.render("login", {
    pageName: "Login - Provider",
    users: users,
    services: services,
    categories: categories.filter((category) => {
      return category.name !== "Todos";
    }),
    roleId: req.query.r,
  });
})

module.exports = router;
