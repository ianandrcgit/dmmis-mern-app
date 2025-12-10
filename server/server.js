// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// --- Route Imports ---
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes'); 
const userRoutes = require('./routes/userRoutes'); 

// Load environment variables from .env file
dotenv.config(); 

const app = express();
// Middleware to parse JSON bodies (Crucial for Postman body data)
app.use(express.json()); 

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        // Exit process with failure
        process.exit(1); 
    }
};

// --- Route Definitions ---
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/incidents', incidentRoutes); 

// Test route
app.get('/', (req, res) => {
    res.send('DMMIS Server Running!');
});

// Start the server only after connecting to the database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}); 