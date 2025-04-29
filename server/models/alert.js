const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true 
  },
  recipient: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['sent', 'failed'], 
    default: 'sent' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema); 