const mongoose = require('mongoose')

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
    amount:{
        type: Number,
        required:true,
      
    },
    timestamp: {
        type: Date,
        default: Date.now,
      },
})

const Transaction = mongoose.model('TRANSACTION', userSchema)
module.exports = Transaction