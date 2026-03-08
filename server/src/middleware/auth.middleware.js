const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Protect routes
const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized to access this route" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        // 🔴 BAN CHECK
        if (user.isBanned) {
            return res.status(403).json({
                message: "Your account has been banned by admin"
            });
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};


module.exports = { protect, authorize }
