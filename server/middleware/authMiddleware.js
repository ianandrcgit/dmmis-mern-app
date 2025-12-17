const jwt = require('jsonwebtoken');

// 1. Protect Middleware: Checks if the user is logged in
const protect = async (req, res, next) => {
    let token;
    // Debug: show incoming Authorization header in dev
    if (process.env.NODE_ENV !== 'production') {
        console.log('Auth header:', req.headers.authorization);
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (process.env.NODE_ENV !== 'production') {
                console.log('JWT decoded:', decoded);
            }
            req.user = decoded; // Attach user data (id, role) to request
            next();
        } catch (error) {
            // Log verification error for debugging in dev
            if (process.env.NODE_ENV !== 'production') console.error('JWT verify error:', error && error.message ? error.message : error);
            return res.status(401).json({ success: false, message: "Token invalid or expired" });
        }
    }
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
};

// 2. Authorize Middleware: Checks if user has the right role
// THIS IS THE PART GIVING THE ERROR
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Role ${req.user.role} is not authorized to access this route` 
            });
        }
        next();
    };
};

// 3. EXPORT BOTH (Crucial Step)
module.exports = { protect, authorize };