const mongoose = require('mongoose');


const paymentTransactionSchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
    cardDetail: {
      type: String,
      required: true
    },
    cardExpiry: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);


  module.exports = PaymentTransaction;
