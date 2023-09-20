const express = require('express');
const router = express.Router()
const User = require('../../models/User');
const RegisterForm = require('../../models/RegisterForm'); 
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
  const { reg_no, comp_name } = req.body;

  if (!reg_no || !comp_name) {
    return res.status(422).json({ error: "Registration number and company name are required" });
  }

  try {
    const user = await RegisterForm.findOne({ reg_no: reg_no });

    if (!user) {
      return res.status(400).send("The Company With This Reg No Doesn't Exist");
    }

    if (user.comp_name === comp_name) {
      const secretKey = process.env.JWT_SECRET;
      const expiresIn = 60;  // Token expiration time in seconds (1 minute)

      const token = jwt.sign({ reg_no: user.reg_no, comp_name: user.comp_name }, secretKey, { expiresIn });

      // Save token, company name, registration number, and token expiration in the User collection
      const userRecord = new User({
        companyName: comp_name,
        reg_no: reg_no,
        token: token,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000)
      });

      await userRecord.save();

      return res.status(200).json({ message: "Login successful!", name: user.comp_name, token, expiresIn });
    } else {
      return res.status(400).send("Invalid company name.");
    }
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
    const { comp_name, email, mobile, landline, website, address, reg_no, PaymentMethods } = req.body;
    const paymentMethodsArray = PaymentMethods.split('|').map(method => method.trim()); // Trim spaces

    // Check if req.file is defined before accessing its properties
    if (req.file) {
      imageUrl = req.file.filename;
    }

    const existingCompany = await RegisterForm.findOne({ email });

    if (existingCompany) {
      if (imageUrl) {
        fs.unlinkSync('uploads/' + imageUrl); // Delete the uploaded image
      }

      return res.status(400).json({ error: 'Company already registered' });
    }

    const user = new RegisterForm({
      comp_name,
      email,
      mobile,
      landline,
      website,
      address,
      logoUrl: imageUrl,
      reg_no,
      PaymentMethods: paymentMethodsArray
    });

    await user.save();

    res.json({ message: 'Registration successful', user });
  } catch (error) {
    console.error('Registration failed:', error);

    // If an error occurs and there's an uploaded image, delete it
    if (imageUrl) {
      fs.unlinkSync('uploads/' + imageUrl);
    }

    res.status(500).json({ error: 'Registration failed' });
  }
});







module.exports = router