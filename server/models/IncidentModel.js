// server/models/IncidentModel.js
const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a brief title for the incident.'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters.'],
    },
    description: {
        type: String,
        required: [true, 'Please add a detailed description.'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: [true, 'Please provide the coordinates [longitude, latitude].'],
            index: '2dsphere',
        },
    },
    photoUrls: [String],
    status: {
        type: String,
        enum: ['New', 'Acknowledged', 'In Review', 'Rejected', 'Resolved'],
        default: 'New',
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null,
    },
    loss: {
        humanLife: { type: Number, default: 0 },
        animalLife: { type: Number, default: 0 },
        houseDamage: { type: Number, default: 0 },
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('Incident', incidentSchema);