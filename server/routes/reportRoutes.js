const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.post('/submit', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json({ success: true, message: "Report generated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add this to your existing report routes
router.get('/all', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }); // Newest reports first
    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;