const userModel = require('../models/User.model');
const generateToken = require("../utils/generateToken")

// @desc    Register user
// @route   POST /auth/signup
// @access  Public
const signupController = async (req, res) => {
    const { name, email, password ,role} = req.body;

    try {
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await userModel.create({
            name,
            email,
            password,
            role,
        });

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,     // JS access nahi kar sakta
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error("signup route error", err.message)
    }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login
// @access  Public
const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {

            const token = generateToken(user._id)

            res.cookie("token", token, {
                httpOnly: true,     // JS access nahi kar sakta
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("login Error", error.message)
    }
};

// @desc    Get current logged in user
// @route   GET /auth/me
// @access  Private
const getMe = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    });
};

const logoutController = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    res.status(200).json({
        message: "Logged out successfully"
    });

}


module.exports = { loginController, logoutController, signupController, getMe }