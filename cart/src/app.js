const express = require('express');
const cookieParser = require('cookie-parser');
const cartRouter = require('../src/routes/cart.route')

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/cart', cartRouter)

module.exports = app