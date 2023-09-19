const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
      },
      reg_no: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      },
      tokenExpiresAt: {
        type: Date,
        required: true
      }
})

const User = mongoose.model('USER', userSchema)
module.exports = User