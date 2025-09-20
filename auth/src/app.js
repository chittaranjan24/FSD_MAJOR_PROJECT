const express = require('express')
const CookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.route')

const app = express()

app.use(express.json())
app.use(CookieParser())

app.use('/api/auth', authRouter)

module.exports = app

