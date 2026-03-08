const mongoose = require('mongoose');

const watchLaterSchema = new mongoose.Schema({
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
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true,
    },
    releaseDate: {
        type: String,
    },
    lastWatched: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true, }
);

// Update lastWatched if user watches again
watchLaterSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

const watchLaterModel = mongoose.model('WatchLater', watchLaterSchema);

module.exports = watchLaterModel
