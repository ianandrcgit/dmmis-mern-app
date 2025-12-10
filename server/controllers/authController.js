// server/controllers/authController.js
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken'); // For creating secure tokens
// We need a cryptographic random number generator for OTP
const crypto = require('crypto'); 

// Safety Note: JWT Secret should NEVER be hardcoded. 
// We will put this in a new environment variable.

// --- Helper Functions ---
const generateOTP = () => {
    // Generates a 6-digit number string
    return crypto.randomInt(100000, 999999).toString();
};

const sendToken = (user, statusCode, res) => {
    // Creates and sends the JWT token upon successful verification
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(statusCode).json({
        success: true,
        token,
        role: user.role,
        message: 'Login successful.',
    });
};

// --- Controllers ---

// 1. Sends the OTP to the user's phone/email (simulated via console)
exports.sendOtp = async (req, res, next) => {
    try {
        const { phoneOrEmail, role } = req.body;

        if (!phoneOrEmail || !role) {
            return res.status(400).json({ success: false, message: 'Phone/Email and Role are required.' });
        }
        
        // Find or create the user (ONLY FOR SYSTEM MANAGER SETUP)
        let user = await User.findOne({ phoneOrEmail });

        if (!user) {
             // For initial MVP, ONLY allow SystemManager to be registered this way. 
             // Other users will be created by the System Manager.
            if (role !== 'SystemManager') {
                 return res.status(401).json({ success: false, message: 'Unauthorized role registration.' });
            }
             user = await User.create({ phoneOrEmail, role, isVerified: true });
        } 
        
        // Generate and save OTP
        const otpCode = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

        user.otp = { code: otpCode, expiresAt: otpExpiresAt };
        await user.save();
        
        // **DEVELOPMENT SIMULATION**: Log the OTP instead of sending via SMS/Email
        console.log(`\n--- OTP DEBUG ---`);
        console.log(`User: ${phoneOrEmail} | Role: ${role}`);
        console.log(`Generated OTP (Valid for 10 min): ${otpCode}`);
        console.log(`-----------------\n`);

        res.status(200).json({
            success: true,
            message: 'OTP sent (check server console).',
        });

    } catch (error) {
        // Mongoose validation error or other database error
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Verifies the OTP and issues a JWT token
exports.verifyOtp = async (req, res, next) => {
    try {
        const { phoneOrEmail, otp } = req.body;

        if (!phoneOrEmail || !otp) {
            return res.status(400).json({ success: false, message: 'Phone/Email and OTP are required.' });
        }

        const user = await User.findOne({ phoneOrEmail });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check if OTP matches and is not expired
        if (user.otp.code !== otp || user.otp.expiresAt < Date.now()) {
            return res.status(401).json({ success: false, message: 'Invalid or expired OTP.' });
        }
        
        // OTP Verified, clear the OTP field and send JWT
        user.otp = undefined; // Clear OTP after use
        user.isVerified = true;
        await user.save();

        sendToken(user, 200, res);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};