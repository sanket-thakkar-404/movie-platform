const favoriteModel = require("../models/Favorite.model")


// @desc    Add movie to favorites
// @route   POST /api/favorites
// @access  Private
const addFavorite = async (req, res) => {
  const { tmdbId, title, poster_path, mediaType } = req.body;

  try {
    const favorite = await favoriteModel.create({
      user: req.user.id,
      tmdbId,
      title,
      poster_path,
      mediaType,
    });
    res.status(201).json({
      favorite: favorite,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const favorites = await favoriteModel.find({ user: req.user.id });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Remove movie from favorites
// @route   DELETE /api/favorites/:tmdbId
// @access  Private
const removeFavorite = async (req, res) => {
  try {
    const favorite = await favoriteModel.findOneAndDelete({
      user: req.user.id,
      tmdbId: req.params.tmdbId,
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addFavorite, getFavorites, removeFavorite }