const express = require('express');
const { connect } = require('./broker/broker');
const setupListeners = require('./broker/listener');

const app = express();

connect().then(() => {
    setupListeners();    
});

app.get('/', (req, res) => {
    res.send('Notification Service is running');
});




module.exports = app;