const { default: mongoose } = require("mongoose");
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

async function getProducts(req, res) {
    try {
        const { q, minprice, maxprice, skip = 0, limit = 20 } = req.query;

        const filter = {}

        if(q){
            filter.$text = { $search: q }
        }

        if(minprice){
            filter['price.amount'] = { ...filter['price.amount'], $gte: Number(minprice) }
        }

        if(maxprice){
            filter['price.amount'] = { ...filter['price.amount'], $lte: Number(maxprice) }
        }
        
        const products = await productModel.find(filter).skip(Number(skip)).limit(Number(limit)).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Products fetched successfully",
            productData: products
        });
    } catch (error) {
        console.log('Error fetch get product:', error);
        return res.status(500).json({message: "Internal Server Error"});
    }    
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            productData: product
        });
    } catch (error) {
        console.log('Error fetch get product by id:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await productModel.findOne({
            _id: id,
            seller: req.user.id
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found or you are not authorized to update this product" });
        }

        const allowedUpdates = ['title', 'description', 'price'];
        
        for (const key of Object.keys(req.body)) {
            if (allowedUpdates.includes(key)) {
                if (key === 'price' && typeof req.body.price === 'object') {
                    if (req.body.price.amount !== undefined) {
                        product.price.amount = Number(req.body.price.amount);
                    }
                    if (req.body.price.currency !== undefined) {
                        product.price.currency = req.body.price.currency;
                    }
                } else {
                    product[key] = req.body[key];
                }
            }
        }

        await product.save();

        return res.status(200).json({
            message: "Product updated successfully",
            productData: product
        });
    } catch (error) {
        console.log('Error in updating product:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct
};