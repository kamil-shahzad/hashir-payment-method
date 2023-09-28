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

      // Save token, company name, registration number, and token expiration in the User collection
      const userRecord = new User({
        companyName: comp_name,
        reg_no: reg_no,
        token: token,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
        merchantId: user.merchantId, // Include merchant ID from RegisterForm
        securedKey: user.securedKey // Include secured key from RegisterForm
      });

      await userRecord.save();
    } else {
      return res.status(400).send("Invalid company name.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});



//before error codes payment-platform

// router.post('/payment-platform', async (req, res) => {
//   const { secretKey, paymentMethod, merchantId, securedKey, comp_name, reg_no } = req.body;
//   if (!secretKey || !paymentMethod || !merchantId || !securedKey || !comp_name) {
//     res.json({ message: 'Incomplete process' });
//     return;
//   }
//   try {
//     // Find the user with the specified comp_name in the database
//     const user = await User.findOne({ reg_no : reg_no });

//     if (!user) {
//       res.json({ message: 'Invalid Registeration Number'});
//     } else {
//       // Retrieve the registrationNumber from the user
//       const secret = user.token;

//       if (secretKey !== secret) {
//         res.json({ message: 'Invalid token', status: false });
//         return;
//       }
//         // Validate if token has expired (older than one minute)
//         const currentTimestamp = new Date().getTime();
//         const tokenTimestamp = new Date(secret).getTime();
  
//         if (tokenTimestamp < currentTimestamp - 60000) {
//           res.json({ message: 'Token expired' });
//           return;
//         }
//       if (
//         secretKey === secret &&
//         paymentMethod === 'jazzcash' &&
//         merchantId === '2' &&
//         securedKey === '2'
//       ) {
//         res.json({ 
//           message: 'Complete process',
//           status: true,
//           parameters: {
//             secret,
//             paymentMethod,
//             merchantId,
//             securedKey,
//             comp_name,
//             reg_no,
//           }
//         });
//       } else {
//         res.json({ message: 'Invalid parameters', status: false });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.json({ message: 'Error processing request' });
//   }
// });


//payment-platform with error code

router.post('/payment-platform', async (req, res) => {
  const { secretKey, paymentMethod, merchantId, securedKey, comp_name, reg_no } = req.body;

  if (!secretKey || !paymentMethod || !merchantId || !securedKey || !comp_name) {
    res.json({ code: 101, message: 'Incomplete process' });
    return;
  }

  try {
    const user = await User.findOne({ reg_no : reg_no });

    if (!user) {
      res.json({ code: 102, message: 'Invalid Registration Number'});
    } else {
      const secret = user.token;
      
     
      // Validate if provided secretKey matches the stored token
      if (secretKey !== secret) {
        res.json({ code: 909, message: 'Invalid token' });
        return;
      }

      // Validate if token has expired (older than one minute)
      const tokenTimestamp = user.tokenExpiresAt.getTime(); // Timestamp of token creation
      const currentTimestamp = new Date().getTime(); // Current time in milliseconds
     
      // Validate if provided secretKey matches the stored token
      if (secretKey !== secret) {
        res.json({ code: 909, message: 'Invalid token' });
        return;
      }
  
      // Validate if token has expired (older than one minute)
      if (currentTimestamp > tokenTimestamp + 60000) {
        res.json({ code: 103, message: 'Token expired' });
        return;
      }

      if (paymentMethod !== 'jazzcash') {
        res.json({ code: 409, message: 'Payment method not verified' });
        return;
      }
  
      // Additional checks for merchantId and securedKey
      if (merchantId !== '2' || securedKey !== '2') {
        res.json({ code: 410, message: 'Invalid merchant ID or secured key' });
        return;
      }

      if (
        paymentMethod === 'jazzcash' &&
        merchantId === '2' &&
        securedKey === '2'
      ) {
        res.json({ 
          code: 200,
          message: 'Complete process',
          status: true,
          parameters: {
            secretKey,
            paymentMethod,
            merchantId,
            securedKey,
            comp_name,
            reg_no,
          }
        });
      } else {
        res.json({ code: 104, message: 'Invalid parameters' });
      }
    }
  } catch (error) {
    console.error(error);
    res.json({ code: 500, message: 'Error processing request' });
  }
});


//before payment platform...

// router.post('/payment-platform', async (req, res) => {
//   const secretKey = req.header;
//   const { paymentMethod, merchantId, securedKey, comp_name, reg_no } = req.body;
//   if (!secretKey || !paymentMethod || !merchantId || !securedKey || !comp_name) {
//     res.json({ message: 'Incomplete process' });
//     return;
//   }
//   try {
//     // Find the user with the specified comp_name in the database
//     const user = await User.findOne({ reg_no : reg_no });

//     if (!user) {
//       res.json({ message: 'Invalid Registeration Number'});
//     } else {
//       // Retrieve the registrationNumber from the user
//       const secret = user.token;
//         // Validate if token has expired (older than one minute)
//         const currentTimestamp = new Date().getTime();
//         const tokenTimestamp = new Date(secret).getTime();
  
//         if (tokenTimestamp < currentTimestamp - 60000) {
//           res.json({ message: 'Token expired' });
//           return;
//         }
  
     
//       if (
//         secretKey === secret &&
//         paymentMethod === 'jazzcash' &&
//         merchantId === '2' &&
//         securedKey === '2'
//       ) {
//         res.json({ 
//           message: 'Complete process',
//           status: "1",
//           parameters: {
//             secretKey,
//             paymentMethod,
//             merchantId,
//             securedKey,
//             comp_name,
//             reg_no,
//           }
//         });
//       } else {
//         res.json({ message: 'Invalid parameters' });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.json({ message: 'Error processing request' });
//   }
// });

const upload = multer({ dest: 'uploads/' }); 

const fs = require('fs');


router.post('/registerform', upload.single('logo'), async (req, res) => {
  let imageUrl;

  try {
    const { comp_name, email, mobile, landline, website, address, reg_no, merchantId, securedKey, PaymentMethods } = req.body;

    const paymentMethodsMapped = {
      0: 'easypaisa',
      1: 'jazzcash',
      2 : 'Hbl',
    };

    const mappedPaymentMethods = PaymentMethods.map(methodIndex => paymentMethodsMapped[methodIndex]);

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
      merchantId,
      securedKey,
      PaymentMethods: mappedPaymentMethods  // Store updated payment methods
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