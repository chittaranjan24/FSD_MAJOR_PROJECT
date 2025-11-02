const express = require('express');
const cookieParser = require('cookie-parser');
const cartRouter = require('../src/routes/cart.route')

const app = express();

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Welcome to Cart Service!')
});

app.use('/api/cart', cartRouter)

module.exports = app