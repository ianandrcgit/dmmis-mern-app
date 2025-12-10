// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ADD THIS:
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config(); 

const app = express();
// ADD THIS LINE (Middleware to parse JSON bodies)
app.use(express.json()); // Allows us to read JSON data sent in the request body

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

// ADD THIS SECTION (Use Auth Routes)
// Define the base path for authentication endpoints
app.use('/api/auth', authRoutes); 

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