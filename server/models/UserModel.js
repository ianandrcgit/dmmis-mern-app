// server/models/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Needed for hashing the password

const userSchema = new mongoose.Schema({
    // User Role is CRITICAL for authorization (who can do what)
    role: {
        type: String,
        required: true,
        enum: ['SystemManager', 'StateLevelOfficer', 'DistrictLevelOfficer', 'TalukaLevelOfficer', 'VillageLevelOfficer'],
    },
    phoneOrEmail: { 
        type: String,
        required: true,
        unique: true,
    },
    // New field added in M4 for SystemManager created accounts or for plain login later
    password: { 
        type: String,
        select: false, // Prevents password hash from being sent in API responses by default
    },
    otp: { 
        code: String,
        expiresAt: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// --- Mongoose Middleware: Hash Password Before Saving (FINAL FIX) ---
// Note: 'next' is removed from the signature and the body. Mongoose handles flow via the Promise resolution.
userSchema.pre('save', async function() {
    // Only hash the password if it has been modified AND it exists
    if (!this.isModified('password') || !this.password) {
        return; // Simply return, which resolves the Promise and proceeds to save
    }
    
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // The function completes here, Mongoose proceeds to save the document.
});

// --- Mongoose Method: Compare Password for Login ---
userSchema.methods.matchPassword = async function(enteredPassword) {
    // Uses the stored password hash (which must be explicitly selected via .select('+password'))
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);