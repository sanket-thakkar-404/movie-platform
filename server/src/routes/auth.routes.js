const express = require('express');
const authController = require("../controllers/auth.controller")
const authValidator = require("../validator/auth.validator")
const Validate = require("../middleware/auth.validate")
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', authValidator.signupValidator, Validate, authController.signupController);
router.post('/login', authValidator.loginValidator, Validate, authController.loginController);
router.post('/logout', authController.logoutController);
router.get('/me', protect, authController.getMe);



module.exports = router;
