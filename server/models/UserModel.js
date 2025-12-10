// server/models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // User Role is CRITICAL for authorization (who can do what)
    role: {
        type: String,
        required: true,
        enum: ['SystemManager', 'StateLevelOfficer', 'DistrictLevelOfficer', 'TalukaLevelOfficer', 'VillageLevelOfficer'],
    },
    // The identifier, OTP will be sent to this
    phoneOrEmail: { 
        type: String,
        required: true,
        unique: true,
    },
    // This is the OTP storage field
    otp: { 
        code: String,
        expiresAt: Date,
    },
    // For SystemManager role, we might store a hashed password, but 
    // for MVP we use OTP for all as per spec for simplicity.
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', userSchema);