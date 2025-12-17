const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dmmis';
  try {
    await mongoose.connect(mongoUri, {
      // Mongoose 6+ uses these defaults; keep options minimal
      dbName: process.env.MONGO_DBNAME || undefined,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
