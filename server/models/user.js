const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lastLogin: { type: Date },
  loginCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: false }
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);
