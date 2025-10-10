const express = require('express');
const orderController = require('../controllers/order.controller');
const createAuthMiddleware = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validator.middleware');

const router = express.Router();

//POST /api/orders/
router.post('/', 
    createAuthMiddleware(['user']),
    validator.createOrderValidation,
    orderController.createOrder
);

module.exports = router;