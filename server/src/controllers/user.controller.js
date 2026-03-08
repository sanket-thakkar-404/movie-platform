const Favorite = require('../models/Favorite.model');
const WatchHistory = require('../models/WatchLater.model');

// @desc    Get user favorites
// @route   GET /api/user/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add movie to favorites
// @route   POST /api/user/favorites
// @access  Private
exports.addFavorite = async (req, res) => {
    const { tmdbId, title, posterPath, mediaType } = req.body;

    try {
        const favorite = await Favorite.create({
            user: req.user.id,
            tmdbId,
            title,
            posterPath,
            mediaType,
        });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Remove movie from favorites
// @route   DELETE /api/user/favorites/:tmdbId
// @access  Private
exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
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

// @desc    Get user watch history
// @route   GET /api/user/watch-history
// @access  Private
exports.getWatchHistory = async (req, res) => {
    try {
        const history = await WatchHistory.find({ user: req.user.id }).sort('-lastWatched');
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add to watch history or update lastWatched
// @route   POST /api/user/watch-history
// @access  Private
exports.addToWatchHistory = async (req, res) => {
    const { tmdbId, title, posterPath, mediaType } = req.body;

    try {
        let entry = await WatchHistory.findOne({ user: req.user.id, tmdbId });

        if (entry) {
            entry.lastWatched = Date.now();
            await entry.save();
        } else {
            entry = await WatchHistory.create({
                user: req.user.id,
                tmdbId,
                title,
                posterPath,
                mediaType,
            });
        }

        res.status(200).json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// @desc    Add to watch history or update lastWatched
// @route   Delete /api/user/watch-history
// @access  Private

const deleteWatchLater = async (req, res) => {
    try {
        const watchLater = await WatchHistory.findOneAndDelete({
            user: req.user.id,
            tmdbId: req.params.tmdbId,
        });

        if (!watchLater) {
            return res.status(404).json({ message: 'watch history not found' });
        }

        res.status(200).json({ message: 'Removed from Watch' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
