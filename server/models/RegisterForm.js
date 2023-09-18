const mongoose = require('mongoose');

const registerFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  landline: { type: String },
  website: { type: String },
  address: { type: String },
  logoUrl: { type: String },
});

const RegisterForm = mongoose.model('RegisterForm', registerFormSchema);

module.exports = RegisterForm;
