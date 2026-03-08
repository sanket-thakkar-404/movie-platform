const movieModel = require('../models/Movie.model');
const userModel = require('../models/User.model');

// @desc    Get all internal movies
// @route   GET /api/admin/movies
// @access  Private/Admin
const getAdminMoviesController = async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a movie (Admin)
// @route   POST /api/admin/movies
// @access  Private/Admin
const createMovieController = async (req, res) => {
    try {
        const movie = await movieModel.create({
            ...req.body,
            addedBy: req.user.id,
        });
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a movie (Admin)
// @route   PUT /api/admin/movies/:id
// @access  Private/Admin
const updateMovieController = async (req, res) => {
    try {
        let movie = await movieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a movie (Admin)
// @route   DELETE /api/admin/movies/:id
// @access  Private/Admin
const deleteMovieController = async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        await movie.deleteOne();

        res.status(200).json({ message: 'Movie removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsersController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.status(200).json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle ban/unban user (Admin)
// @route   PATCH /api/admin/users/:id/ban
// @access  Private/Admin
const toggleBanUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // admin cannot ban himself
        if (req.user.id === req.params.id) {
            return res.status(400).json({
                message: "Admin cannot ban himself"
            });
        }

        // toggle ban status
        user.isBanUser = !user.isBanUser;

        await user.save();

        res.status(200).json({
            message: user.isBanUser ? "User banned successfully" : "User unbanned successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("error in ban Account" , error)
    }
};

module.exports = { getAdminMoviesController, createMovieController, updateMovieController,deleteMovieController,getUsersController,deleteUserController,toggleBanUserController }
