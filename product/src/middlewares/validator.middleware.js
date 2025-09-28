const {body, validationResult} = require('express-validator');

const responseWithValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createProductValidator = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({max: 500})
    .withMessage('Description can be at most 500 characters long'),
  body('priceAmount')
    .notEmpty()
    .withMessage('Price is required')
    .bail()
    .isFloat({gt: 0})
    .withMessage('Price must be a number greater than 0'),
  body('priceCurrency')
    .optional()
    .isIn(['USD', 'INR'])
    .withMessage('Currency must be either USD or INR'),
  responseWithValidationErrors
];

const updateProductValidator = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({max: 500})
    .withMessage('Description can be at most 500 characters long'),
  body('priceAmount')
    .optional()
    .isFloat({gt: 0})
    .withMessage('Price must be a number greater than 0'),
  body('priceCurrency')
    .optional()
    .isIn(['USD', 'INR'])
    .withMessage('Currency must be either USD or INR'),
  responseWithValidationErrors
];

module.exports = {
  createProductValidator,
  updateProductValidator
};