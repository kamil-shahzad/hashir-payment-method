const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(express.json())


const cors = require('cors');


const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use(cors());

app.post('/api/access-token', async (req, res) => {
  try {
    const merchantId = '18647';
    const securedKey = 'hCF9uHVboGFFH6p4qPQcsa9';

    const apiUrl = `https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken?MERCHANT_ID=${merchantId}&SECURED_KEY=${securedKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request to external API failed with status ${response.status}`);
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the API.' });
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/post-transaction', async (req, res) => {
  try {
    const {
      MERCHANT_ID,
      MERCHANT_NAME,
      TOKEN,
      PROCCODE,
      TXNAMT,
      CUSTOMER_MOBILE_NO,
      CUSTOMER_EMAIL_ADDRESS,
      SIGNATURE,
      VERSION,
      TXNDESC,
      SUCCESS_URL,
      FAILURE_URL,
      BASKET_ID,
      ORDER_DATE,
      CHECKOUT_URL,
      STORE_ID,
      MERCHANT_USERAGENT,
      CURRENCY_CODE,
      TRAN_TYPE,
      ITEMS,
    } = req.body;

    const apiUrl = 'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const formData = new URLSearchParams();
    formData.append('MERCHANT_ID', MERCHANT_ID);
    formData.append('MERCHANT_NAME', MERCHANT_NAME);
    formData.append('TOKEN', TOKEN);
    formData.append('PROCCODE', PROCCODE);
    formData.append('TXNAMT', TXNAMT);
    formData.append('CUSTOMER_MOBILE_NO', CUSTOMER_MOBILE_NO);
    formData.append('CUSTOMER_EMAIL_ADDRESS', CUSTOMER_EMAIL_ADDRESS);
    formData.append('SIGNATURE', SIGNATURE);
    formData.append('VERSION', VERSION);
    formData.append('TXNDESC', TXNDESC);
    formData.append('SUCCESS_URL', SUCCESS_URL);
    formData.append('FAILURE_URL', FAILURE_URL);
    formData.append('BASKET_ID', BASKET_ID);
    formData.append('ORDER_DATE', ORDER_DATE);
    formData.append('CHECKOUT_URL', CHECKOUT_URL);
    formData.append('STORE_ID', STORE_ID);
    formData.append('MERCHANT_USERAGENT', MERCHANT_USERAGENT);
    formData.append('CURRENCY_CODE', CURRENCY_CODE);
    formData.append('TRAN_TYPE', TRAN_TYPE);

    if (ITEMS && Array.isArray(ITEMS)) {
      ITEMS.forEach((item, index) => {
        formData.append(`ITEMS[${index}][SKU]`, item.SKU);
        formData.append(`ITEMS[${index}][NAME]`, item.NAME);
        formData.append(`ITEMS[${index}][PRICE]`, item.PRICE);
        formData.append(`ITEMS[${index}][QTY]`, item.QTY);
      });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Request to external API failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.startsWith('application/json')) {
      const responseData = await response.json();
      res.json(responseData);
    } else {
      const responseText = await response.text();
      res.send(responseText);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while posting the transaction to the API.' });
  }
});







module.exports = app