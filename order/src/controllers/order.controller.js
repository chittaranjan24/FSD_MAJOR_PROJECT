const orderModel = require("../models/order.model");
const axios = require('axios');

async function createOrder(req, res) {
    try {
        const user = req.user;
        
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[ 1 ];

        try {
            const cartResponse = await axios.get(`http://localhost:3002/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const products = await Promise.all(
                cartResponse.data.cart.items.map(async (item) => {
                    return (await axios.get(`http://localhost:3001/api/products/${item.productId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })).data.productData
                })
            );

            let priceAmount = 0;

            const orderItems = cartResponse.data.cart.items.map((item, index) => {
                const product = products.find(p => p._id.toString() === item.productId.toString());

                if (product.stock < item.quantity) {
                    throw new Error(`Product ${product.title} is out of stock or does not have enough quantity`);
                }

                const itemTotal = product.price.amount * item.quantity;

                priceAmount += itemTotal;

                return {
                    product: item.productId,
                    quantity: item.quantity,
                    price: {
                        amount: itemTotal,
                        currency: product.price.currency
                    }
                };
            });
                        
            const order = await orderModel.create({
                user: user.id,
                items: orderItems,
                status: "PENDING",
                totalPrice: {
                    amount: priceAmount,
                    currency: 'INR' // Assuming all products are in INR for simplicity
                },
                shippingAddress: req.body.shippingAddress
            });

            res.status(201).json({ 
                message: "Order created successfully", 
                order 
            });

            
        } catch (error) {
            console.error("Error verifying token or fetching cart:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createOrder
}