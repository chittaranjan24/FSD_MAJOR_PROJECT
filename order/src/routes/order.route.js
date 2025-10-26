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

// GET /api/orders/me/
router.get('/me', 
    createAuthMiddleware(['user']),
    orderController.getMyOrders
);

//POST /api/orders/:id/cancel
router.post('/:id/cancel', 
    createAuthMiddleware(['user']),
    orderController.cancelOrderById
);

// GET /api/orders/:id
router.get('/:id', 
    createAuthMiddleware(['user', 'admin']),
    orderController.getOrderById
);

// PATCH /api/orders/:id/address
router.patch('/:id/address', 
    createAuthMiddleware(['user']),
    validator.updateOrderAddressValidation,
    orderController.updateOrderAddress
);

module.exports = router;