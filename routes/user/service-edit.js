var express = require("express");
var router = express.Router();
var categories = require("../../data/categories");
const ServicesDAO = require("../../DAO/servicesDAO");
const UsersDAO = require("../../DAO/usersDAO");
const { dbServices, dbUsers } = require("../../database");

/* GET service edit page */
router.get("/", function (req, res, next) {
  const user = req.session.user;

  if (!user || user.roleId !== 1) {
    return res.redirect('/');
  }

  res.render("service-edit", {
    pageName: "Editar Serviço - Provider",
    user: user,
    categories: categories.filter((category) => {
      return category.name !== "Todos";
    }),
    error: null,
  });
});

/* POST update service */
router.post("/", async function (req, res, next) {
  const user = req.session.user;
  const {
    serviceName,
    serviceCategory,
    serviceLink,
    locationCity,
    locationState,
    locationNeighborhood,
    locationStreet,
    locationLatitude,
    locationLongitude
  } = req.body;

  if (!user || user.roleId !== 1) {
    return res.redirect('/');
  }

  try {
    if (!serviceName || !serviceCategory || !serviceLink ||
      !locationCity || !locationState || !locationNeighborhood ||
      !locationStreet || !locationLatitude || !locationLongitude) {
      return res.render("service-edit", {
        pageName: "Editar Serviço - Provider",
        user: user,
        categories: categories.filter((category) => {
          return category.name !== "Todos";
        }),
        error: "Preencha todos os campos.",
      });
    }

    const location = {
      type: "Point",
      coordinates: [parseFloat(locationLongitude), parseFloat(locationLatitude)],
      city: locationCity,
      neighborhood: locationNeighborhood,
      state: locationState,
      street: locationStreet
    };

    await ServicesDAO.updateServiceById(
      dbServices,
      { id: user.service.id },
      {
        $set: {
          name: serviceName,
          category: serviceCategory,
          contact: serviceLink,
          location: location
        }
      }
    );
    
    await UsersDAO.updateUserById(
      dbUsers,
      { id: user.id },
      {
        $set: {
          location: location, service: {
            _id: user.service._id,
            id: user.service.id,
            name: serviceName,
            category: serviceCategory,
            contact: serviceLink,
            location: location,
          }
        }
      }
    );

    user.service.name = serviceName;
    user.service.category = serviceCategory;
    user.service.contact = serviceLink;
    user.service.location = location;
    user.location = location;
    req.session.user = user;

    res.redirect('/');
  } catch (err) {
    console.error("Erro ao atualizar serviço:", err);

    return res.render("service-edit", {
      pageName: "Editar Serviço - Provider",
      user: user,
      categories: categories.filter((category) => {
        return category.name !== "Todos";
      }),
      error: `Ocorreu um erro: ${err.message}`,
    });
  }
});

module.exports = router;
