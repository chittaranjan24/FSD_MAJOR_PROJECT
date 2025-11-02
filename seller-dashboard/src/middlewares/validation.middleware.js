const {body, validationResult, param} = require('express-validator');
const mongoose = require('mongoose');

function validateCartResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const validateAddCartItem = [
    body('productId')
        .isString()
        .withMessage('Product ID must be a string')
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid Product ID format'),
    body('quantity')
        .isInt({ gt: 0 })
        .withMessage('Quantity must be an integer greater than 0'),
    validateCartResult
];

const validateUpdateCartItem = [
    param('productId')
        .isString()
        .withMessage('Product ID must be a string')
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid Product ID format'),
    body('quantity')
        .isInt({ gt: 0 })
        .withMessage('Quantity must be a positive integer'),
    validateCartResult,
];

module.exports = {
    validateAddCartItem,
    validateUpdateCartItem
};