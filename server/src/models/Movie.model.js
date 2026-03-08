const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        genre: {
            type: [String],
            required: true,
        },
        releaseDate: {
            type: Date,
        },
        posterUrl: {
            type: String,
            required: [true, 'Please add a poster URL'],
        },
        release_date : {
            type : String,
            required : [true , 'please add a release date']
        },
        videoUrl: {
            type: String,
            required: [true, 'Please add a video URL'],
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel
