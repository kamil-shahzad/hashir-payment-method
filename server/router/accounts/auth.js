const express = require('express');
const router = express.Router()
const User = require('../../models/User');
const RegisterForm = require('../../models/RegisterForm'); 
const AccessToken = require('../../models/AccesToken');
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
    let user = await RegisterForm.findOne({ reg_no: reg_no });

    if (!user) {
      return res.status(400).send("The Company With This Reg No Doesn't Exist");
    }

    if (user.comp_name !== comp_name) {
      return res.status(400).send("Invalid company name.");
    }

    const secretKey = process.env.JWT_SECRET;
    const expiresIn = 60;  // Token expiration time in seconds (1 minute)

    const token = jwt.sign({ reg_no: user.reg_no, comp_name: user.comp_name }, secretKey, { expiresIn });

    // Check if the user record already exists in the User collection
    let userRecord = await User.findOne({ reg_no: reg_no });

    if (!userRecord) {
      // If user record doesn't exist, save a new record
      userRecord = new User({
        companyName: comp_name,
        reg_no: reg_no,
        token: token,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
        merchantId: user.merchantId, // Include merchant ID from RegisterForm
        securedKey: user.securedKey // Include secured key from RegisterForm
      });

      await userRecord.save();
    } else {
      // If user record exists, update the token and expiration time
      userRecord.token = token;
      userRecord.tokenExpiresAt = new Date(Date.now() + expiresIn * 1000);
      await userRecord.save();
    }

    return res.status(200).json({
      message: "Login successful!",
      name: user.comp_name,
      token,
      expiresIn,
      merchantId: user.merchantId, // Include merchant ID in the response
      securedKey: user.securedKey // Include secured key in the response
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

// router.post('/registerform', upload.single('logo'), async (req, res) => {
//   let imageUrl;

//   try {
//     const { comp_name, email, mobile, landline, website, address, reg_no, PaymentMethods } = req.body;
//     const paymentMethodsArray = PaymentMethods.split('|').map(method => method.trim()); // Trim spaces

//     // Check if req.file is defined before accessing its properties
//     if (req.file) {
//       imageUrl = req.file.filename;
//     }

//     const existingCompany = await RegisterForm.findOne({ email });

//     if (existingCompany) {
//       if (imageUrl) {
//         fs.unlinkSync('uploads/' + imageUrl); // Delete the uploaded image
//       }

//       return res.status(400).json({ error: 'Company already registered' });
//     }

//     const user = new RegisterForm({
//       comp_name,
//       email,
//       mobile,
//       landline,
//       website,
//       address,
//       logoUrl: imageUrl,
//       reg_no,
//       PaymentMethods: paymentMethodsArray
//     });

//     await user.save();

//     res.json({ message: 'Registration successful', user });
//   } catch (error) {
//     console.error('Registration failed:', error);

//     // If an error occurs and there's an uploaded image, delete it
//     if (imageUrl) {
//       fs.unlinkSync('uploads/' + imageUrl);
//     }

//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

let merchantCounter = 1000; // Starting 4-digit merchant ID

function generateUniqueMerchantId() {
  const uniqueMerchantId = merchantCounter;
  merchantCounter++;
  return uniqueMerchantId;
}

function generateShortUniqueKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  const keyLength = 6; // Adjust the length as needed

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }
  return key;
}

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
        fs.unlinkSync('uploads/' + imageUrl); 
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
      PaymentMethods: paymentMethodsArray,
      merchantId: generateUniqueMerchantId(), // Generate a unique 4-digit merchant ID
      securedKey: generateShortUniqueKey() // Generate a short unique secured key
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

const generateAccessToken = () => {
  const generateRandomToken = () => {
    return Math.random().toString(36).substr(2, 40);
  };

  const expirationTimeInSeconds = 60; // Token expiration time in seconds (1 minute)
  const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1000);

  const formattedExpiration = expirationDate.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Karachi' // Set the correct timezone for Pakistan
  });

  const token = generateRandomToken(); // Generate a random token

  return {
    token,
    expiration: formattedExpiration,
    expirationTimestamp: expirationDate // Store the expiration timestamp
  };
};

router.post('/generateAccessToken', async (req, res) => {
  const { merchant_id, secured_key } = req.body;

  if (!merchant_id || !secured_key) {
    return res.status(400).json({ error: "Merchant ID and secured key are required." });
  }

  try {
    const company = await RegisterForm.findOne({ merchantId: merchant_id, securedKey: secured_key });

    if (!company) {
      return res.status(404).json({ error: "Merchant ID and secured key not found." });
    }

    // Generate the access token
    const accessTokenInfo = generateAccessToken();

    // Check if an AccessToken record exists for this company
    let accessTokenRecord = await AccessToken.findOne({ reg_no: company.reg_no });

    if (!accessTokenRecord) {
      // Create a new AccessToken record if it doesn't exist
      accessTokenRecord = new AccessToken({
        companyName: company.comp_name,
        reg_no: company.reg_no,
        accessToken: accessTokenInfo.token,
        timestamp: accessTokenInfo.expirationTimestamp // Store the expiration timestamp in the database
      });

      // Save the access token record
      await accessTokenRecord.save();
    } else {
      // Update the existing AccessToken record
      accessTokenRecord.accessToken = accessTokenInfo.token;
      accessTokenRecord.timestamp = accessTokenInfo.expirationTimestamp;
      await accessTokenRecord.save();
    }

    return res.status(200).json({
      accessToken: accessTokenInfo.token,
      expiration: accessTokenInfo.expiration,
      companyName: company.comp_name,
      registrationNumber: company.reg_no
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});







module.exports = router