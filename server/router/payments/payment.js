const express = require('express');
const router = express.Router();
const PaymentMethod = require('../../models/Payment');




router.get('/payment-methods', async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const multer = require('multer');
const path = require('path');

let pIdCounter = 1; // Move pIdCounter outside the route handler

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/payment');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.post('/paymentstore', upload.single('logo'), async (req, res) => {
  const { paymentMethodName, merchantId, secretKey } = req.body;

  const p_id = `P${pIdCounter}`;
  pIdCounter++;

  if (!paymentMethodName || !merchantId || !secretKey) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const existingMethod = await PaymentMethod.findOne({ paymentMethodName });
    if (existingMethod) {
      return res.status(400).json({ error: 'Payment method with this name already exists' });
    }

    let logoUrl = '';

    if (req.file) {
      logoUrl = req.file.filename;
    }

    const paymentMethod = new PaymentMethod({
      p_id,
      paymentMethodName,
      merchantId,
      secretKey,
      logoUrl
    });

    await paymentMethod.save();
    res.status(201).json({ message: 'Payment method saved successfully' });
  } catch (error) {
    console.error('Error saving payment method:', error);
    res.status(500).json({ error: 'An error occurred while saving the payment method' });
  }
});




module.exports = router;
