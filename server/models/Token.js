const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;