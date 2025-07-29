var express = require("express");
var router = express.Router();
const UsersDAO = require("../../DAO/usersDAO");
const { dbUsers } = require("../../database");

/* GET location edit page */
router.get("/", function (req, res, next) {
  const user = req.session.user;
  
  if (!user) {
    return res.redirect('/login');
  }
  
  res.render("location-edit", {
    pageName: "Editar Localização - Provider",
    user: user,
    error: null,
  });
});

/* POST update location */
router.post("/", async function (req, res, next) {
  const user = req.session.user;
  const { locationCity, locationState, locationNeighborhood, locationStreet, locationLatitude, locationLongitude } = req.body;
  
  if (!user) {
    return res.redirect('/login');
  }

  try {
    if (!locationLatitude || !locationLongitude) {
      return res.render("location-edit", {
        pageName: "Editar Localização - Provider",
        user: user,
        error: "Selecione uma localização no mapa.",
      });
    }

    const location = { 
      type: "Point", 
      coordinates: [parseFloat(locationLongitude), parseFloat(locationLatitude)], 
      city: locationCity || user.location.city, 
      neighborhood: locationNeighborhood || user.location.neighborhood, 
      state: locationState || user.location.state, 
      street: locationStreet || user.location.street 
    };

    await UsersDAO.updateUserById(
      dbUsers, 
      { id: user.id }, 
      { $set: { location: location } }
    );

    user.location = location;
    req.session.user = user;

    res.redirect('/');
  } catch (err) {
    console.error("Erro ao atualizar localização:", err);
    
    return res.render("location-edit", {
      pageName: "Editar Localização - Provider",
      user: user,
      error: `Ocorreu um erro: ${err.message}`,
    });
  }
});

module.exports = router;
