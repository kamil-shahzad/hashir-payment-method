const express = require('express');
const router = express.Router()
const User = require('../../models/User');
const RegisterForm = require('../../models/RegisterForm'); 
const _ = require("lodash");
const bcrypt = require("bcrypt");
const validator = require("./validator");

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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please Enter Email & Password" })
  }

  const { error } = validator.login(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Email doesn't exist");

    if (user.password === password) {
      const { name, email } = user;
      return res.status(200).json({ message: "Login successful!", name, email });
    } else {
      return res.status(400).send("Invalid password.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});




const upload = multer({ dest: 'uploads/' }); 

const fs = require('fs');


router.post('/registerform', upload.single('logo'), async (req, res) => {
  let logoUrl;  // Define logoUrl here

  try {
    const { name, email, mobile, landline, website, address } = req.body;
    logoUrl = req.file ? req.file.path : null;  // Assign a value to logoUrl

    // Check if the company with the given email already exists
    const existingCompany = await RegisterForm.findOne({ email });

    if (existingCompany) {
      // If the company already exists and there's an uploaded image, delete it
      if (logoUrl) {
        fs.unlinkSync(logoUrl);
      }

      return res.status(400).json({ error: 'Company already registered' });
    }

    // Create a new company if it doesn't exist
    const user = new RegisterForm({
      name,
      email,
      mobile,
      landline,
      website,
      address,
      logoUrl,
    });

    await user.save();

    res.json({ message: 'Registration successful', user });
  } catch (error) {
    console.error('Registration failed:', error);

    // If an error occurs and there's an uploaded image, delete it
    if (logoUrl) {
      fs.unlinkSync(logoUrl);
    }

    res.status(500).json({ error: 'Registration failed' });
  }
});








module.exports = router