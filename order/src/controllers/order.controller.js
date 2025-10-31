const { publishToQueue } = require("../broker/broker");
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

            await publishToQueue('ORDER_SELLER_DASHBOARD.ORDER_CREATED', order);

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

async function getMyOrders(req, res) {
    try {
        const user = req.user;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        try {
            const orders = await orderModel.find({ user: user.id })
            
            const totalOrders = await orderModel.countDocuments({ user: user.id });

            res.status(200).json({
                orders,
                meta: {
                    total: totalOrders,
                    page,
                    limit
                }
            });
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error fetching user's orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getOrderById(req, res) {
    try {
        const user = req.user;
        
        const orderId = req.params.id;

        try {
            const order = await orderModel.findById(orderId);
            
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            if (order.user.toString() !== user.id) {
                return res.status(403).json({ 
                    message: "Forbidden: You don't have access to this order" 
                });
            }

            res.status(200).json({ 
                message: "Order fetched successfully", 
                order
             });
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function cancelOrderById(req, res) {
    try {
        const user = req.user;
        
        const orderId = req.params.id;

        try {
            const order = await orderModel.findById(orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            if (order.user.toString() !== user.id) {
                return res.status(403).json({ message: "Forbidden: You don't have access to this order" });
            }

            // Only pending orders can be cancelled
            if (order.status !== "PENDING ") {
                return res.status(409).json({ message: "Order is not cancellable" });
            }

            order.status = "CANCELLED";

            await order.save();

            res.status(200).json({ 
                message: "Order cancelled successfully",
                order
            });
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error cancelling order by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updateOrderAddress(req, res) {
    try {
        const user = req.user;
        
        const orderId = req.params.id;

        try {
            const order = await orderModel.findById(orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            
            if (order.user.toString() !== user.id) {
                return res.status(403).json({ message: "Forbidden: You don't have access to this order" });
            }

            // Only pending orders can be updated
            if (order.status !== "PENDING") {
                return res.status(409).json({ message: "Order address cannot be updated" });
            }

            order.shippingAddress = {
                street: req.body.shippingAddress.street,
                city: req.body.shippingAddress.city,
                state: req.body.shippingAddress.state,
                zip: req.body.shippingAddress.zip,
                country: req.body.shippingAddress.country
            };

            await order.save();

            res.status(200).json({ 
                message: "Order address updated successfully", 
                order 
            });
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error updating order address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrderById,
    updateOrderAddress
}