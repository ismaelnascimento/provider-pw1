var express = require("express");
var categories = require("../data/categories");
const ServicesDAO = require("../DAO/servicesDAO");
const { dbServices, dbFavorites } = require("../database");
const { ObjectId } = require("mongodb");
var crypto = require("crypto");

var router = express.Router();

/* GET services listing. */
router.get("/", async function (req, res, next) {
  const getUser = req?.session?.user;
  
  const userLocation = getUser?.location || {
    type: "Point",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    coordinates: [0, 0],
  };

  const userLocationStr = `${userLocation.state}, ${userLocation.city}, ${userLocation.neighborhood}, ${userLocation.street}`;

  let filteredServices = [];

  if (userLocation.coordinates[0] && userLocation.coordinates[1]) {
    try {
      filteredServices = await ServicesDAO.getServicesByLocal(dbServices, {
        latitude: userLocation.coordinates[1],
        longitude: userLocation.coordinates[0],
        maxDistance: 8000
      });
    } catch (error) {
      console.error("Erro ao buscar serviços por localização:", error);
    }
  }

  const popularServicesDao = await ServicesDAO.getServicesPopular(dbServices)

  const popularServices = popularServicesDao.filter((service) => {
    return (
      !filteredServices.some(
        (filteredService) => filteredService.id === service.id
      )
    );
  });

  res.render("index", {
    search: "",
    isServicesFavorites: false,
    services: await ServicesDAO.servicesWithFavorites(filteredServices, getUser),
    popularServices: await ServicesDAO.servicesWithFavorites(popularServices, getUser),
    categories: categories,
    user: getUser,
    userLocationStr,
  });
});

router.post("/service/:serviceId/favorite", async function (req, res, next) {
  const { serviceId } = req.params;

  const getUser = req?.session?.user;

  if (getUser) {
    const generateId = crypto.randomUUID();
    await ServicesDAO.insertFavoriteByService(dbFavorites, {
      id: generateId,
      userId: getUser.id,
      serviceId: new ObjectId(serviceId),
      createdAt: new Date()
    });
    
    await updateServiceStars(serviceId);
  }

  res.redirect("/");
});

router.delete("/service/:serviceId/favorite", async function (req, res, next) {
  const { serviceId } = req.params;

  const getUser = req?.session?.user;

  if (getUser) {
    await ServicesDAO.deleteFavoriteById(dbFavorites, getUser.id, serviceId);
    
    await updateServiceStars(serviceId);
  }

  res.redirect("/");
});

async function updateServiceStars(serviceId) {
  try {
    const favoritesCount = await dbFavorites.countDocuments({ serviceId: new ObjectId(serviceId) });
    
    const totalUsers = await dbFavorites.distinct('userId').length || 1;
    const starRating = Math.min(5, Math.max(1, (favoritesCount / totalUsers) * 5));
    
    const stars = Math.round(starRating * 10) / 10;
    
    await ServicesDAO.updateServiceById(
      dbServices,
      { _id: new ObjectId(serviceId) },
      { $set: { stars: stars } }
    );
    
    console.log(`Updated service ${serviceId} stars to ${stars}`);
  } catch (err) {
    console.error("Error updating service stars:", err);
  }
}

module.exports = router;