const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tmdbId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
    },
    releaseDate: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true,
    },
}, { timestamps: true, }
);

// Prevent user from favoriting the same movie twice
favoriteSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

const favoriteModel = mongoose.model('Favorite', favoriteSchema)

module.exports = favoriteModel;
