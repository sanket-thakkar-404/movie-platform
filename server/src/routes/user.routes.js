const express = require('express');
const {
    getFavorites,
    addFavorite,
    removeFavorite,
    getWatchHistory,
    addToWatchHistory,
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect); // All routes below are protected

router.route('/favorites').get(getFavorites).post(addFavorite);
router.route('/favorites/:tmdbId').delete(removeFavorite);

router.route('/watch-history').get(getWatchHistory).post(addToWatchHistory);

module.exports = router;
