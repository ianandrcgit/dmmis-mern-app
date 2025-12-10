// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Protects routes - checks for token validity
exports.protect = async (req, res, next) => {
    let token;

    // 1. Check if token exists in the header (Standard JWT practice)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token using the JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Attach the user object to the request (excluding sensitive fields)
            // We use .select('+password') temporarily here only to ensure we can use matchPassword method later if needed, but not necessary now.
            req.user = await User.findById(decoded.id).select('-otp -password'); 

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found.' });
            }

            next(); // Move to the next middleware/controller

        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed or expired.' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
    }
};

// Authorizes roles - checks if the user's role is in the allowed array
exports.authorize = (roles = []) => {
    // If a single role is passed, convert it to an array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // If the user's role is not included in the allowed roles array
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `User role (${req.user.role}) is not authorized to access this route.` 
            });
        }
        next();
    };
};