const productModel = require("../models/product.model");
const { uploadImage } = require("../services/imagekit.service");

async function createProduct(req, res) {
    try {
        const {title, description, priceAmount, priceCurrency} = req.body;

        const seller = req.user.id; // Assuming user info is added to req by auth middleware

        const price = {
            amount: Number(priceAmount),
            currency: priceCurrency || 'INR',
        };

        // Handle image uploads
        const images = await Promise.all(
            (req.files || []).map(file => uploadImage({buffer: file.buffer}))
        );

        // Create and save the product
        const product = await productModel.create({
            title,
            description,
            price,
            seller,
            images
        });

        return res.status(201).json({
            message: 'Product created successfully',
            productData: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });        
    }    
}

module.exports = {
    createProduct,
};