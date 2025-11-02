const express = require('express');
const orderRoutes = require('./routes/order.route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to Order Service!');
});

app.use('/api/orders', orderRoutes);

module.exports = app;