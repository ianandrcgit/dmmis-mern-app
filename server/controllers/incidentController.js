// server/controllers/incidentController.js
const Incident = require('../models/IncidentModel'); // This requires IncidentModel.js
const asyncHandler = require('express-async-handler'); // Helper to catch errors in async routes

// @desc    Create a new incident report
// @route   POST /api/incidents
// @access  Private (VillageLevelOfficer only)
exports.createIncident = asyncHandler(async (req, res) => {
    // 1. Attach the reporter ID from the authenticated user (req.user is set by protect middleware)
    req.body.reporter = req.user.id; 
    
    // 2. Incident creation (Mongoose validates against IncidentModel.js)
    const incident = await Incident.create(req.body);

    res.status(201).json({
        success: true,
        data: incident
    });
});

// @desc    Get all incidents (filtered by user role/hierarchy later)
// @route   GET /api/incidents
// @access  Private (All authenticated officers)
exports.getIncidents = asyncHandler(async (req, res) => {
    // For MVP, just get all incidents and populate reporter details
    // The .populate ensures we see the VLO's email/role instead of just their ID
    const incidents = await Incident.find().populate('reporter', 'phoneOrEmail role');

    res.status(200).json({
        success: true,
        count: incidents.length,
        data: incidents
    });
});


// @desc    Get single incident details
// @route   GET /api/incidents/:id
// @access  Private (All authenticated officers)
exports.getIncident = asyncHandler(async (req, res) => {
    const incident = await Incident.findById(req.params.id).populate('reporter', 'phoneOrEmail role');

    if (!incident) {
        return res.status(404).json({ success: false, message: `Incident not found with id of ${req.params.id}` });
    }

    res.status(200).json({
        success: true,
        data: incident
    });
});