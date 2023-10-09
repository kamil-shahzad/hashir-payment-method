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



