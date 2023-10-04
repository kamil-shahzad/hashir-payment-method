const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  p_id: { type: String, required: true }, // Payment method ID
  paymentMethodName: { type: String, required: true }, // Payment method name
  merchantId: { type: String, required: true }, // Merchant ID
  secretKey: { type: String, required: true }, // Secret key
  logoUrl: { type: String, required: false } // Logo URL (optional)
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
module.exports = PaymentMethod;




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
