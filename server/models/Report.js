const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: { type: String, required: true }, // animal, human, house, crop
  count: { type: Number, required: true },
  beneficiaryName: { type: String, required: true },
  taluka: { type: String, required: true },
  village: { type: String, required: true },
  dateOfIncident: { type: Date, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);