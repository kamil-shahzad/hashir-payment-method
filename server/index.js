const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

app.use(express.json())

require('dotenv').config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('Error in establishing database:', err);
  });

// dotenv.config({path:'./config.env'})
// const DB = process.env.DATABASE

// mongoose.connect(DB).then(()=>{
// 	console.log("DB connected")
// }).catch((err)=>{console.log('Error in establishing database')})

//middlewares
// app.use(req, res, next)
app.get('/test', (req, res) => {
  res.send('API is running'); // Send a message indicating API is running for the root URL
});

app.use(express.json())

//linking the routes
app.use(require('./router/accounts/auth'))
app.use(require('./router/payments/payment'))


app.listen(8080, () => {
	console.log('Server started on 8080 from the app.js')
})