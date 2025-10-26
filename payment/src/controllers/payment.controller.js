const axios = require("axios");
const paymentModel = require("../models/payment.model");
const razorpay = require("../services/razorpay.service");

async function createPayment(req, res) {

    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    try {
        const orderId = req.params.orderId;

        const orderResponse = await axios.get(`http://localhost:3003/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!orderResponse.data) {
            return res.status(404).json({ message: "Order not found" });
        }

        const price = orderResponse.data.order.totalPrice;

        const order = await razorpay.orders.create(price);
        
        const payment = await paymentModel.create({
            order: orderId,
            razorpayOrderId: order.id,
            user: req.user.id,
            price: {
                amount: order.amount,
                currency: order.currency
            }
        });

        return res.status(201).json({ 
            message: "Payment created successfully",
            payment
        });
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }    
}

async function verifyPayment(req, res) {
    try {
        const { paymentId, razorpayOrderId, signature } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;

        try {
            const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js');
            
            const isValid = validatePaymentVerification({
                order_id: razorpayOrderId,
                payment_id: paymentId,
            }, signature, secret);

            if(!isValid){
                return res.status(400).json({ message: "Invalid signature" });
            }

            const payment = await paymentModel.findOne({razorpayOrderId, status: 'PENDING'})

            if(!payment){
                return res.status(400).json({ message: "Payment not found" });
            }

            payment.paymentId = paymentId;
            payment.signature = signature;
            payment.status = 'COMPLETED';

            await payment.save();

            res.status(200).json({ 
                message: "Payment verified successfully!",
                payment
            });
        } catch (error) {
            console.error("Error in payment verification:", error);
            return res.status(400).json({ message: "Invalid payment" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createPayment,
    verifyPayment
}