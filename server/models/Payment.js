const { number } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Basket_id:{
        type: Number,
        required: true,
        unique: true, 
    },
    Merchant_id:{
        type: Number,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true
    },
    Acesstoken:{
        type: String,
        required: true
    },
    Amount : {
        type : Number,
         required : true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
      },
})

const Payment = mongoose.model('PAYMENT', userSchema)
module.exports = Payment