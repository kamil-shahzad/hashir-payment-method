const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
    comp_name:{
        type: String,
        required: true
    },
    reg_no:{
        type: String,
        required: true,
        unique: true,

    },
})

const User = mongoose.model('USER', userSchema)
module.exports = User