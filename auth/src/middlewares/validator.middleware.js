const {body, validationResult} = require('express-validator');

const responseWithValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateUserRegister = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .isLength({min: 3})
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),
  body('fullName.firstName')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name is required'),
  body('fullName.lastName')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage('Last name is required'),
  body('role')
    .optional()
    .isIn(['user', 'seller'])
    .withMessage('Role must be either user or seller'),
  responseWithValidationErrors
];

const validateUserLogin = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address'),
  body('username')
    .optional()
    .isString()
    .withMessage('Username must be a string'),
  body('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    if (!req.body.email && !req.body.username) {
      return res.status(400).json({ message: 'Either email or username is required' });
    }
    next();
  },
  responseWithValidationErrors
];

const validateUserAddress = [
  body('address.*.street')
    .isString()
    .withMessage('Street must be a string')
    .notEmpty()
    .withMessage('Street is required'),
  body('address.*.city')
    .isString()
    .withMessage('City must be a string')
    .notEmpty()
    .withMessage('City is required'),
  body('address.*.state')
    .isString()
    .withMessage('State must be a string')
    .notEmpty()
    .withMessage('State is required'),
  body('address.*.zip')
    .isString()
    .withMessage('Zip must be a string')
    .notEmpty()
    .withMessage('Zip is required'),
  body('address.*.country')
    .isString()
    .withMessage('Country must be a string')
    .notEmpty()
    .withMessage('Country is required'),
  body('address.*.isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean'),
  responseWithValidationErrors
];

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateUserAddress
};