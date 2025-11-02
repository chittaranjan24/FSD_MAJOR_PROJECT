const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const paymentModel = require("../models/payment.model");

async function getMetrics(req, res) {
    try {
        const sellerId = req.user._id;

        // Use MongoDB's aggregation framework for efficient data processing
        const aggregationPipeline = [
            // Stage 1: Match orders that contain products from the seller and have a valid status
            {
            $match: {
                'items.seller': sellerId,
                'status': { $in: ["CONFIRMED", "SHIPPED", "DELIVERED"] }
            }
            },
            // Stage 2: Deconstruct the items array to process each item as a separate document
            { $unwind: '$items' },
            // Stage 3: Filter out items that do not belong to the current seller
            { $match: { 'items.seller': sellerId } },
            // Stage 4: Group results to calculate metrics
            {
            $group: {
                _id: '$items.product', // Group by product ID
                totalQuantitySold: { $sum: '$items.quantity' },
                totalRevenue: { $sum: { $multiply: ['$items.price.amount', '$items.quantity'] } }
            }
            },
            // Stage 5: Sort products by the quantity sold in descending order
            { $sort: { totalQuantitySold: -1 } },
            // Stage 6: Group all results into a single document to calculate overall totals
            {
            $group: {
                _id: null,
                totalSales: { $sum: '$totalQuantitySold' },
                totalRevenue: { $sum: '$totalRevenue' },
                // Keep the top 5 products
                topProducts: { $push: { id: '$_id', sold: '$totalQuantitySold' } }
            }
            },
            // Stage 7: Populate product details for the top products
            {
            $lookup: {
                from: 'products', // The collection name for products
                localField: 'topProducts.id',
                foreignField: '_id',
                as: 'productDetails'
            }
            },
            // Stage 8: Reshape the output
            {
            $project: {
                _id: 0,
                sales: '$totalSales',
                revenue: '$totalRevenue',
                topProducts: {
                $map: {
                    input: { $slice: ['$topProducts', 5] }, // Limit to top 5
                    as: 'top',
                    in: {
                    $let: {
                        vars: {
                        // Find the matching product detail
                        detail: {
                            $arrayElemAt: [
                            { $filter: { input: '$productDetails', cond: { $eq: ['$$this._id', '$$top.id'] } } },
                            0
                            ]
                        }
                        },
                        in: {
                        id: '$$top.id',
                        sold: '$$top.sold',
                        title: '$$detail.title'
                        }
                    }
                    }
                }
                }
            }
            }
        ];

        const results = await orderModel.aggregate(aggregationPipeline);

        // If there are no sales, aggregation returns an empty array
        const metrics = results[0] || {
            sales: 0,
            revenue: 0,
            topProducts: []
        };

        return res.status(200).json(metrics);
    } catch (error) {
        console.error("Error fetching seller metrics:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getOrders(req, res) {
    try {
        const seller = req.user;

        // Get all products for this seller
        const products = await productModel.find({ seller: seller._id });
        const productIds = products.map(p => p._id);

        // Get all orders containing seller's products
        const orders = await orderModel.find({
            'items.product': { $in: productIds }
        }).populate('user', 'name email').sort({ createdAt: -1 });

        // Filter order items to only include those from this seller
        const filteredOrders = orders.map(order => {
            const filteredItems = order.items.filter(item => productIds.includes(item.product));
            return {
                ...order.toObject(),
                items: filteredItems
            };
        }).filter(order => order.items.length > 0);
        return res.json(filteredOrders);
    } catch (error) {
        console.error("Error fetching orders:", error)
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getProducts(req, res) {

    try {
        const seller = req.user;

        const products = await productModel.find({ seller: seller._id }).sort({ createdAt: -1 });

        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error)
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}

module.exports = {
    getMetrics,
    getOrders,
    getProducts
};
