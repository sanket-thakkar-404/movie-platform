const express = require('express');

// Import all admin controller functions
const adminController = require('../controllers/admin.controller');

// Import authentication and role authorization middleware
const { protect, authorize } = require('../middleware/auth.middleware');

// Create router instance for admin routes
const adminRoutes = express.Router();


// =========================
// Global Admin Middleware
// =========================

// Protect routes → user must be logged in
adminRoutes.use(protect);

// Authorize routes → only users with "admin" role can access
adminRoutes.use(authorize('admin'));


// =========================
// Movie Management Routes
// =========================

// @desc    Get all movies (Admin view)
// @route   GET /api/admin/movies
// @access  Private/Admin
adminRoutes.get('/movies', adminController.getAdminMoviesController);


// @desc    Create/Add a new movie
// @route   POST /api/admin/movies
// @access  Private/Admin
adminRoutes.post('/movies', adminController.createMovieController);


// @desc    Update movie details
// @route   PUT /api/admin/movies/:id
// @access  Private/Admin
adminRoutes.put('/movies/:id', adminController.updateMovieController);


// @desc    Delete a movie
// @route   DELETE /api/admin/movies/:id
// @access  Private/Admin
adminRoutes.delete('/movies/:id', adminController.deleteMovieController);



// =========================
// User Management Routes
// =========================

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
adminRoutes.get('/users', adminController.getUsersController);


// @desc    Toggle ban/unban user
// @route   PATCH /api/admin/users/:id/ban
// @access  Private/Admin
adminRoutes.patch('/users/:id/ban', adminController.toggleBanUserController);


// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
adminRoutes.delete('/users/:id', adminController.deleteUserController);


// Export admin routes
module.exports = adminRoutes;