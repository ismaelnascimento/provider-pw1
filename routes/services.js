var express = require("express");
var categories = require("../data/categories");
const ServicesDAO = require("../DAO/servicesDAO");
const RatingsDAO = require("../DAO/ratingsDAO");
const { dbServices, dbFavorites, dbRatings } = require("../database");
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
  }

  res.redirect("/");
});

router.delete("/service/:serviceId/favorite", async function (req, res, next) {
  const { serviceId } = req.params;

  const getUser = req?.session?.user;

  if (getUser) {
    await ServicesDAO.deleteFavoriteById(dbFavorites, getUser.id, serviceId);
  }

  res.redirect("/");
});

// Nova rota para obter a avaliação de um serviço pelo usuário
router.get("/service/:serviceId/rating", async function (req, res, next) {
  const { serviceId } = req.params;
  const user = req?.session?.user;

  if (!user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  try {
    const rating = await RatingsDAO.getRatingByUserAndService(
      dbRatings, 
      user.id, 
      serviceId
    );
    
    return res.json({ rating: rating ? rating.rating : 0 });
  } catch (err) {
    console.error("Erro ao obter avaliação:", err);
    return res.status(500).json({ error: "Erro ao obter avaliação" });
  }
});

// Nova rota para avaliar um serviço
router.post("/service/:serviceId/rating", async function (req, res, next) {
  const { serviceId } = req.params;
  const { rating } = req.body;
  const user = req?.session?.user;

  if (!user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  try {
    const ratingValue = parseInt(rating);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      return res.status(400).json({ error: "Avaliação inválida" });
    }

    const existingRating = await RatingsDAO.getRatingByUserAndService(
      dbRatings, 
      user.id, 
      serviceId
    );

    if (existingRating) {
      // Atualizar avaliação existente
      await RatingsDAO.updateRating(
        dbRatings,
        user.id,
        serviceId,
        ratingValue
      );
    } else {
      // Criar nova avaliação
      const generateId = crypto.randomUUID();
      await RatingsDAO.insertRating(dbRatings, {
        id: generateId,
        userId: user.id,
        serviceId: new ObjectId(serviceId),
        rating: ratingValue,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Atualizar a média de estrelas do serviço
    const averageRating = await RatingsDAO.calculateAverageRating(dbRatings, serviceId);
    await ServicesDAO.updateServiceById(
      dbServices,
      { _id: new ObjectId(serviceId) },
      { $set: { stars: averageRating } }
    );

    return res.json({ success: true, rating: ratingValue });
  } catch (err) {
    console.error("Erro ao avaliar serviço:", err);
    return res.status(500).json({ error: "Erro ao avaliar serviço" });
  }
});

async function updateServiceStars(serviceId) {
  try {
    // Atualizar para usar o sistema de avaliação
    const averageRating = await RatingsDAO.calculateAverageRating(dbRatings, serviceId);
    
    // Considerar também os favoritos para o cálculo final
    const favoritesCount = await dbFavorites.countDocuments({ serviceId: new ObjectId(serviceId) });
    const totalUsers = await dbFavorites.distinct('userId').length || 1;
    const favoriteRating = Math.min(5, Math.max(1, (favoritesCount / totalUsers) * 5));
    
    // Média ponderada: 70% avaliações diretas, 30% favoritos
    let finalRating = averageRating;
    if (averageRating > 0) {
      finalRating = (averageRating * 0.7) + (favoriteRating * 0.3);
    } else {
      finalRating = favoriteRating;
    }
    
    const stars = Math.round(finalRating * 10) / 10;
    
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