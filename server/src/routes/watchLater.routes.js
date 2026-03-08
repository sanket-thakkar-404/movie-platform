const express = require("express");
const watchLaterRoutes = express.Router()
const watchLaterController = require("../controllers/watchLater.controller")
const { protect } = require("../middleware/auth.middleware")


watchLaterRoutes.post("/", protect, watchLaterController.addToWatchLater)
watchLaterRoutes.get("/", protect, watchLaterController.getWatchLater)
watchLaterRoutes.delete("/:tmdbId", protect, watchLaterController.deleteWatchLater)




module.exports = watchLaterRoutes