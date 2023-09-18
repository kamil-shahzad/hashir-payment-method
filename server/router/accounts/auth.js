const express = require('express');
const router = express.Router()
const User = require('../../models/User');
const Transaction = require('../../models/Transaction');
const Payment = require('../../models/Payment');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const validator = require("./validator");



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



router.post('/transactions', async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!name || !email || !amount) {
      return res.status(422).json({ error: "Please Enter Name,Email" })
    }


    const transaction = new Transaction({
      name: name,
      email: email,
      amount: amount,
    });

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/payments', async (req, res) => {
  try {
    const { Basket_id, Merchant_id, name, Acesstoken,Amount } = req.body;

    if (!Basket_id, !Merchant_id, !name, !Acesstoken ,!Amount) {
      return res.status(422).json({ error: "please Enter Basket id , Merchant_id , Name , Token & Amount" })
    }


    const payment = new Payment({
      Basket_id: Basket_id,
      Merchant_id: Merchant_id,
      name: name,
      Acesstoken: Acesstoken,
      Amount : Amount
    })

    const savedPayment = await payment.save();


    res.status(201).json(savedPayment);
  } catch (error) {
    console.error('Error saving Payments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


module.exports = router