// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.route('/')
    // System Manager creates new officer accounts (Requires SystemManager role)
    .post(protect, authorize('SystemManager'), userController.createUser) 
    // System Manager can view all users (Requires SystemManager role)
    .get(protect, authorize('SystemManager'), userController.getUsers);

module.exports = router;