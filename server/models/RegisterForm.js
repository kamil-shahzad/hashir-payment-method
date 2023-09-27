const mongoose = require('mongoose');
const registerFormSchema = new mongoose.Schema({
  //About company
  comp_name: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  logoUrl: { type: String ,required: true },
  webUrl: { type: String ,required: true },
  ceo_name: { type: String ,required: true },
  ceo_email: { type: String ,required: true },
  ceo_mob: { type: String ,required: true },
  poc_name: { type: String ,required: true },
  poc_mob: { type: String ,required: true },
  poc_desig: { type: String ,required: true },
  //TransactionDetails
  daily_avg: {
    type: Number,
    default: 0,
  },
  max_amount: {
    type: Number,
    default: 0,
  },
  dailymax_amount: {
    type: Number,
    default: 0,
  },
  selectedPaymentMethods: [{
    type: String, 
  }],
  ipAddress: {
    type: [String], 
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pgid: {
    type: String,
    required: true,
    unique: true
  },
  pgsecretkey: {
    type: String,
    required: true
  }

});

const RegisterForm = mongoose.model('RegisterForm', registerFormSchema);

module.exports = RegisterForm;