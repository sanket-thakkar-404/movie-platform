const watchLaterModel = require('../models/WatchLater.model');

// @desc    Get user watch later
// @route   GET /api/watch-later
// @access  Private
const getWatchLater = async (req, res) => {
  try {
    const watchLater = await watchLaterModel.find({ user: req.user.id });
    res.status(200).json(
      watchLater
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to watch later or update lastWatched
// @route   POST /api/user/watch-later
// @access  Private
const addToWatchLater = async (req, res) => {
  const { tmdbId, title, poster_path, mediaType } = req.body;

  try {
     const  entry = await watchLaterModel.create({
        user: req.user.id,
        tmdbId,
        title,
        poster_path,
        mediaType,
      });
    res.status(200).json({
      watchLater: entry
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Add to watch later or update lastWatched
// @route   Delete /api/user/watch-later
// @access  Private

const deleteWatchLater = async (req, res) => {
  try {
    const watchLater = await watchLaterModel.findOneAndDelete({
      user: req.user.id,
      tmdbId: req.params.tmdbId,
    });

    if (!watchLater) {
      return res.status(404).json({ message: 'watch later not found' });
    }

    res.status(200).json({ message: 'Removed from Watch' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("error in removing WatchLater" , error.message)
  }
};


module.exports = { addToWatchLater, getWatchLater, deleteWatchLater }