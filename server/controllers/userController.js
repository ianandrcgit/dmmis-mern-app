// server/controllers/userController.js
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

// @desc    Create a new user account (Officer)
// @route   POST /api/users
// @access  Private (SystemManager only)
exports.createUser = asyncHandler(async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Request body is missing. Ensure you send JSON and set `Content-Type: application/json`.' });
    }
    const { phoneOrEmail, role, password } = req.body;

    if (!phoneOrEmail || !role || !password) {
        return res.status(400).json({ success: false, message: 'Please provide phone/email, role, and password.' });
    }

    if (role === 'SystemManager') {
        return res.status(403).json({ success: false, message: 'Cannot create another SystemManager account via this route.' });
    }

    const userExists = await User.findOne({ phoneOrEmail });
    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // Hashing is automatically handled by the pre-save hook in UserModel.js
    const user = await User.create({
        phoneOrEmail,
        role,
        password, 
        isVerified: true, 
    });

    if (user) {
        // Prepare response, explicitly removing fields that should not be returned
        const userResponse = user.toObject();
        delete userResponse.password; 
        delete userResponse.otp;

        res.status(201).json({
            success: true,
            message: `${role} account created successfully.`,
            data: userResponse
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid user data.' });
    }
});


// @desc    Get all users (for administrative display)
// @route   GET /api/users
// @access  Private (SystemManager only)
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-otp -password'); 

    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});