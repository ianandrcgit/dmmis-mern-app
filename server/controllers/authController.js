// server/controllers/authController.js
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Function to generate the JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });
};

// @desc    Send OTP for login (or register if new user)
// @route   POST /api/auth/login-otp
// @access  Public
exports.sendOtp = asyncHandler(async (req, res) => {
    const { phoneOrEmail, role } = req.body;

    if (!phoneOrEmail || !role) {
        res.status(400);
        throw new Error('Phone/Email and Role are required.');
    }

    let user = await User.findOne({ phoneOrEmail });

    if (!user) {
        // User does not exist, create a new one (must be SystemManager only)
        if (role !== 'SystemManager') {
            res.status(403);
            throw new Error('New users can only be registered by the System Manager.');
        }

        user = await User.create({
            phoneOrEmail,
            role,
            isVerified: false, // Must verify OTP first
        });
    }

    // Ensure the role matches the requested login role
    if (user.role !== role) {
        res.status(403);
        throw new Error(`Login failed: User is registered as ${user.role}, not ${role}.`);
    }

    // Generate a simple 6-digit OTP (in real app, this would use a service like Twilio)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    user.otp = { code: otpCode, expiresAt: otpExpiresAt };
    await user.save();

    // Print OTP to console for testing
    console.log(`[OTP DEBUG] OTP for ${user.phoneOrEmail} (${user.role}): ${otpCode}`);

    // In non-production environments, return the OTP in the response to ease testing.
    const showOtp = true; // Always return OTP in response for local testing

    res.status(200).json({
        success: true,
        message: 'OTP sent to console for testing.',
        otp: showOtp ? otpCode : undefined
    });
});

// @desc    Verify OTP and log in
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = asyncHandler(async (req, res) => {
    const { phoneOrEmail, otp } = req.body;

    if (!phoneOrEmail || !otp) {
        res.status(400);
        throw new Error('Phone/Email and OTP are required.');
    }

    const user = await User.findOne({ phoneOrEmail }).select('+otp'); // Select otp field

    if (!user || user.otp.code !== otp || user.otp.expiresAt < Date.now()) {
        res.status(401);
        throw new Error('Invalid or expired OTP.');
    }

    // Clear OTP fields after successful verification
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
        success: true,
        token,
        role: user.role,
        message: 'Login successful.'
    });
});