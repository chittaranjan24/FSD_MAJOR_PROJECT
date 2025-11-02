const cookieParser = require('cookie-parser');
const express = require('express');
const sellerRoutes = require('./routes/seller.route');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to Seller Dashboard Service!');
});

app.use('/api/seller/dashboard', sellerRoutes);


module.exports = app;