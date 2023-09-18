const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type: String,
        required:true,
        minlength: 5,
        maxlength: 1024,
    },
})

const User = mongoose.model('USER', userSchema)
module.exports = User