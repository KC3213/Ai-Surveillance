// server/models/Camera.js
const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  cameraName: { type: String, required: true },
  videoUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Camera', cameraSchema);
