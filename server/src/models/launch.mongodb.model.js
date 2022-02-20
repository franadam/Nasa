const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  upcoming: {
    type: Boolean,
  },
  success: {
    type: Boolean,
    default: true,
  },
  customers: {
    type: [String],
    default: [('NASA', 'ZTM')],
  },
});

const Launch = mongoose.model('Launch', launchSchema);

module.exports = Launch;
