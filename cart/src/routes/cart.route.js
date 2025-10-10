const express = require("express");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");
const validation = require("../middlewares/validation.middleware");

const router = express.Router();

// GET /api/cart
router.get('/',
    createAuthMiddleware([ 'user' ]),
    cartController.getCart
);

// POST /api/cart/items
router.post("/items",
    createAuthMiddleware([ "user" ]),
    validation.validateAddCartItem,
    cartController.addItemToCart
);

// PATCH /api/cart/items/:productId
router.patch("/items/:productId",
    createAuthMiddleware([ "user" ]),
    validation.validateUpdateCartItem,
    cartController.updateCartItem
);


module.exports = router;