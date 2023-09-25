// models/AccessToken.js
const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema({
  companyName: String,
  reg_no: String,
  accessToken: String, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessToken', accessTokenSchema);
