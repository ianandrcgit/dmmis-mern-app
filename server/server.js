const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); //
const connectDB = require('./config/db'); // Ensure this file exists in /config/

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- MIDDLEWARE (Crucial: Keep these ABOVE routes) ---
// These lines fix the "Cannot destructure property 'phoneOrEmail' of 'req.body'" crash
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Enable Cross-Origin Resource Sharing for your Frontend
app.use(cors());

// --- ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));

// Basic Root Route
app.get('/', (req, res) => {
    res.send('DMMIS Backend is Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

