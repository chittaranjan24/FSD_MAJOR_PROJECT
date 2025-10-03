const express = require('express');
const multer = require('multer');
const productController = require('../controllers/product.controller');
const createAuthMiddleware = require('../middlewares/auth.middleware');
const productVelidator = require('../middlewares/validator.middleware');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/products/
router.post('/', 
    createAuthMiddleware(['admin', 'seller']), 
    upload.array('images', 5),
    productVelidator.createProductValidator,
    productController.createProduct
);

// GET /api/products/
router.get('/', productController.getProducts);

//PATCH /api/products/:id
router.patch('/:id', 
    createAuthMiddleware(['seller']),
    upload.array('images', 5),
    productVelidator.updateProductValidator,
    productController.updateProduct
);

// DELETE /api/products/:id
router.delete('/:id', 
    createAuthMiddleware(['seller']),
    productController.deleteProduct
);

// GET /api/products/seller
router.get('/seller', createAuthMiddleware(['seller']), productController.getProductsBySeller);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

module.exports = router;