const express = require('express');
const router = express.Router()
const User = require('../../models/User');
const RegisterForm = require('../../models/RegisterForm'); 
const PaymentMethod = require('../../models/Payment');
const Amount = require('../../models/Amount'); 
const PaymentTransaction = require('../../models/PaymentTransaction');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const validator = require("./validator");
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' }); 
const multer = require('multer');



router.get('/', (req, res) => {
  res.send('Backend running from the router')
})

router.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error('Error retrieving users', error);
      res.status(500).json({ error: 'Error retrieving users' });
    });
});

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return res.status(422).json({ error: "Please fill out the thinngs" })
  }
  try {
    const userexist = await User.findOne({ email: email });
    res.status(422).json({ Message: "User has been registered" })
    if (userexist) {
      return res.status(422).json({ error: "User already exists" })
    }
    const user = new User({ name, email, password, role })
    await user.save()
    res.status(201).json({ message: "User registered Successfully" })
  }
  catch (err) {
    console.log(err)
  }
})



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ error: "Username and password are required" });
  }

  try {
    const company = await RegisterForm.findOne({ userName: username, password });

    if (!company) {
      return res.status(400).send("Invalid username or password.");
    }

    const secretKey = process.env.JWT_SECRET;
    const expiresIn = 60;  

    const token = jwt.sign({ username }, secretKey, { expiresIn });

    const allowedIP = company.ipAddress; 
    console.log(allowedIP);
    const requestIP = req.ip;
    console.log("req",requestIP);

    if (!allowedIP.includes(requestIP)) {
      return res.status(403).send("Access denied from this IP address.");
    }

    // Find the user record in the User collection
    let userRecord = await User.findOne({ username });

    if (!userRecord) {
      userRecord = new User({
        companyName: company.comp_name,
        reg_no: company._id,  
        username: company.userName,
        token,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
      });
    } else {
      userRecord.token = token;
      userRecord.tokenExpiresAt = new Date(Date.now() + expiresIn * 1000);
    }

    await userRecord.save();

    return res.status(200).json({
      message: "Login successful!",
      name: company.comp_name,
      token,
      expiresIn,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

const fs = require('fs');

router.post('/registerform', upload.single('logo'), async (req, res) => {
  let imageUrl;

  try {
    const {
      comp_name,
      province,
      city,
      address,
      logoUrl,
      webUrl,
      ceo_name,
      ceo_email,
      ceo_mob,
      poc_name,
      poc_mob,
      poc_desig,
      daily_avg,
      max_amount,
      dailymax_amount,
      selectedPaymentMethods,
      ipAddress,
      userName,
      password
    } = req.body;

    if (req.file) {
      imageUrl = req.file.filename;
    }

    const existingCompany = await RegisterForm.findOne({ comp_name });

    if (existingCompany) {
      if (imageUrl) {
        fs.unlinkSync('uploads/' + imageUrl); 
      }

      return res.status(400).json({ error: 'Company already registered' });
    }

    const pgid = `${comp_name}_pgid_${Date.now()}`;
    const pgsecretkey = `${comp_name}_pgsecretkey_${Date.now()}`;

    const user = new RegisterForm({
      comp_name,
      province,
      city,
      address,
      webUrl,
      logoUrl: imageUrl || '',
      ceo_name,
      ceo_email,
      ceo_mob,
      poc_name,
      poc_mob,
      poc_desig,
      daily_avg: daily_avg || 0,
      max_amount: max_amount || 0,
      dailymax_amount: dailymax_amount || 0,
      selectedPaymentMethods,
      ipAddress,
      userName,
      password,
      pgid,         
      pgsecretkey   
    });

    await user.save();

    res.json({ message: 'Registration successful', user });
  } catch (error) {
    console.error('Registration failed:', error);

    if (imageUrl) {
      fs.unlinkSync('uploads/' + imageUrl);
    }

    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/payment-platform', async (req, res) => {
  const { token, amount ,paymentId} = req.query;  
  if (!token ) {
    res.json({ code: 101, message: 'Token are required' });
    return;
  }
  if (!amount ) {
    res.json({ code: 101, message: 'Amount are required' });
    return;
  }
  if (!paymentId ) {
    res.json({ code: 101, message: 'Paymentid are required' });
    return;
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      res.json({ code: 102, message: 'Invalid Token' });
      return;
    }

    const { companyName } = user;

    const registerForm = await RegisterForm.findOne({ comp_name: companyName });

    if (!registerForm) {
      res.json({ code: 103, message: 'Nothing found against this company name' });
      return;

    }

    const newAmountRecord = new Amount({
      token,
      amount,
      companyName,
      paymentId,
      date: new Date()  
    });

    await newAmountRecord.save();

    const { selectedPaymentMethods } = registerForm;

    const paymentMethods = await PaymentMethod.find(
      { paymentMethodName: { $in: selectedPaymentMethods } },
      'paymentMethodName logoUrl p_id merchantId secretKey'
    );

    res.json({
      code: 200,
      message: 'Amount Saved',
      companyName,
      paymentMethods,
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: 'Error processing request' });
  }
});


router.get('/get-details', async (req, res) => {
  const { token, paymentMethodIds } = req.query;

  // console.log(paymentMethodIds);

  if (!token) {
    return res.json({ code: 101, message: 'Token is required' });
  }
  if (!paymentMethodIds || paymentMethodIds.length === 0) {
    return res.json({ code: 101, message: 'payment method IDs are required' });
  }
  

  const paymentMethodIdArray = Array.isArray(paymentMethodIds) ? paymentMethodIds : [paymentMethodIds];

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: 'User not found for this token' });
    }

    const { companyName } = user;

    const companyDetails = await RegisterForm.findOne({ comp_name: companyName });

    if (!companyDetails) {
      return res.status(404).json({ message: 'Company details not found for this token' });
    }

    const paymentMethodDetails = await PaymentMethod.find({ p_id: { $in: paymentMethodIdArray } });

    if (!paymentMethodDetails || paymentMethodDetails.length === 0) {
      return res.status(404).json({ message: 'Payment method details not found for the provided IDs' });
    }

    res.json({
      companyName,
      logo: companyDetails.logoUrl,
      paymentMethodDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing request' });
  }
});


router.get('/get-payment-platform', async (req, res) => {
  const { token} = req.query;  
  if (!token ) {
    res.json({ code: 101, message: 'Token are required' });
    return;
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      res.json({ code: 102, message: 'Invalid Token' });
      return;
    }

    const { companyName } = user;

    const registerForm = await RegisterForm.findOne({ comp_name: companyName });

    if (!registerForm) {
      res.json({ code: 103, message: 'Nothing found against this company name' });
      return;
    }

    const { selectedPaymentMethods } = registerForm;

    const paymentMethods = await PaymentMethod.find(
      { paymentMethodName: { $in: selectedPaymentMethods } },
      'paymentMethodName logoUrl p_id merchantId secretKey'
    );

    res.json({
      code: 200,
      message: 'Payment methods retrieved successfully',
      companyName,
      paymentMethods,
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: 'Error processing request' });
  }
});


router.post('/process-payment', async (req, res) => {
  const { token, cvv, cardDetail, cardExpiry, amount } = req.query;

  if (!token ) {
    res.json({ code: 101, message: 'Token are required' });
    return;
  }
  if (!cvv ) {
    res.json({ code: 101, message: 'CVV  are required' });
    return;
  }
  if (!cardDetail) {
    res.json({ code: 101, message: 'Card details are required' });
    return;
  }
  if (!cardExpiry) {
    res.json({ code: 101, message: 'Card expiry are required' });
    return;
  }
  if (!amount) {
    res.json({ code: 101, message: 'Amount are required' });
    return;
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      res.json({ code: 102, message: 'Invalid Token' });
      return;
    }

    const { companyName } = user;

    // Create a new payment transaction record
    const paymentTransaction = new PaymentTransaction({
      companyName,
      cvv,
      cardDetail,
      cardExpiry,
      amount
    });

    // Save the payment transaction record
    await paymentTransaction.save();

    res.json({
      code: 200,
      message: 'Payment information saved successfully',
      companyName,
      paymentTransaction
    });
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: 'Error processing request' });
  }
});

module.exports = router