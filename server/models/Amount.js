const mongoose = require('mongoose');

const amountSchema = new mongoose.Schema({
  token: { type: String, required: true }, // Token associated with the payment
  amount: { type: Number, required: true }, // Amount of the payment
  companyName: { type: String, required: true }, // Company name associated with the payment
  date: { type: Date, default: Date.now }, // Date of the payment, defaults to the current date
  paymentId : { type: String, required: true }, // Company name associated with the payment

});

const Amount = mongoose.model('Amount', amountSchema);
module.exports = Amount;
