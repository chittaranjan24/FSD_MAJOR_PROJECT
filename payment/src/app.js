const cookieParser = require('cookie-parser');
const express = require('express');
const paymentRouter = require('../src/routes/payment.route')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/payments', paymentRouter)

module.exports = app;