const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Add this line
  token: { type: String, required: true },
  tokenExpiresAt: { type: Date, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
