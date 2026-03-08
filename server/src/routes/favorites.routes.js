const express = require("express");
const favoriteRoutes = express.Router();
const favoriteController = require("../controllers/favorite.controller");
const { protect } = require("../middleware/auth.middleware");


favoriteRoutes.post("/", protect, favoriteController.addFavorite)
favoriteRoutes.get("/" , protect , favoriteController.getFavorites)
favoriteRoutes.delete("/:tmdbId" ,protect ,favoriteController.removeFavorite)


module.exports = favoriteRoutes