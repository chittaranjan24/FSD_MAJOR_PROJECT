const express = require('express')
const validator = require('../middlewares/validator.middleware')
const authController = require('../controllers/auth.controller')
const authMiddlewares = require('../middlewares/auth.middleware')

const router = express.Router()

// POST /api/auth/register
router.post('/register', validator.validateUserRegister, authController.registerUser)

// POST /api/auth/login
router.post('/login', validator.validateUserLogin, authController.loginUser)

//GET /api/auth/me
router.get('/me', authMiddlewares.authMiddleware, authController.getCurrentUser)

//GET /api/auth/logout
router.get('/logout', authController.logoutUser)

//GET /users/me/address
router.get('/users/me/address', authMiddlewares.authMiddleware, authController.getUserAddress)

//POST /users/me/address
router.post('/users/me/address', 
    authMiddlewares.authMiddleware, 
    validator.validateUserAddress, 
    authController.addUserAddress
);

//DELETE /users/me/address/:addressId
router.delete('/users/me/address/:addressId', 
    authMiddlewares.authMiddleware, 
    authController.deleteUserAddress
);

module.exports = router