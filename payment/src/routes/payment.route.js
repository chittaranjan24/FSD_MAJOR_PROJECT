const express = require('express');
const paymentController = require('../controllers/payment.controller');
const createAuthMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// POST /api/payments/create/:orderId
router.post('/create/:orderId', createAuthMiddleware([ 'user' ]), paymentController.createPayment)

// POST /api/payments/verify
router.post('/verify', createAuthMiddleware([ 'user' ]), paymentController.verifyPayment)

module.exports = router;