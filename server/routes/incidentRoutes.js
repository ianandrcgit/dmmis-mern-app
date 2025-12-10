// server/routes/incidentRoutes.js
const express = require('express');
const router = express.Router();
// Import the middleware we wrote in M3
const { protect, authorize } = require('../middleware/authMiddleware'); 
const incidentController = require('../controllers/incidentController');

router.route('/')
    // 1. POST: VLOs create new incidents 
    // Protected by token, restricted to VillageLevelOfficer role
    .post(protect, authorize('VillageLevelOfficer'), incidentController.createIncident)
    
    // 2. GET: All officers view lists (we will refine filtering later)
    .get(protect, incidentController.getIncidents);

router.route('/:id')
    // 3. GET: View incident details by ID (Protected)
    .get(protect, incidentController.getIncident); 

module.exports = router;