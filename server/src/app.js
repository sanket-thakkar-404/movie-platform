const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")
const rateLimit = require("express-rate-limit");
const path = require("path")

dotenv.config();

const app = express();

// Middleware
app.use(express.static("./public"))
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// all routes
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const adminRoutes = require('./routes/admin.routes')
const favoritesRoutes = require('./routes/favorites.routes');
const watchLaterRoutes = require('./routes/watchLater.routes');


// Rate limiter (auth only)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Too many login attempts, please wait 15 minutes.' },
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/watch-later', watchLaterRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

// Error Handling Middleware (Placeholder)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = app;
