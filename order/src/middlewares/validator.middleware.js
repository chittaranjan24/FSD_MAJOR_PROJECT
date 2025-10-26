const {body, validationResult} = require('express-validator');

const responseWithValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createOrderValidation = [
  body('shippingAddress.street')
    .isString()
    .withMessage('Street must be a string')
    .notEmpty()
    .withMessage('Street is required'),
  body('shippingAddress.city')
    .isString()
    .withMessage('City must be a string')
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .isString()
    .withMessage('State must be a string')
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.zip')
    .isString()
    .withMessage('Zip must be a string')
    .notEmpty()
    .withMessage('Zip is required'),
  body('shippingAddress.country')
    .isString()
    .withMessage('Country must be a string')
    .notEmpty()
    .withMessage('Country is required'),
    
  responseWithValidationErrors
];

const updateOrderAddressValidation = [
  body('shippingAddress.street')
    .optional()
    .isString()
    .withMessage('Street must be a string')
    .notEmpty()
    .withMessage('Street cannot be empty'),
  body('shippingAddress.city')
    .optional()
    .isString()
    .withMessage('City must be a string')
    .notEmpty()
    .withMessage('City cannot be empty'),
  body('shippingAddress.state')
    .optional()
    .isString()
    .withMessage('State must be a string')
    .notEmpty()
    .withMessage('State cannot be empty'),
  body('shippingAddress.zip')
    .optional()
    .isString()
    .withMessage('Zip must be a string')
    .notEmpty()
    .withMessage('Zip cannot be empty'),
  body('shippingAddress.country')
    .optional()
    .isString()
    .withMessage('Country must be a string')
    .notEmpty()
    .withMessage('Country cannot be empty'),

  responseWithValidationErrors
];

module.exports = {
  createOrderValidation,
  updateOrderAddressValidation
};