// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define our two core authentication endpoints
// 1. Start the login process by sending OTP
router.post('/login-otp', authController.sendOtp); 

// 2. Complete the login process by verifying the received OTP
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;