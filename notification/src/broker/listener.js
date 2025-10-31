const {sendEmail} = require("../email");
const { subscribeToQueue } = require("./broker");


module.exports = function(){
    subscribeToQueue("AUTH_NOTIFICATION.USER_CREATED", async (data) => {
        
        const emailHTMLTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #2E86C1; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to Our Service!</h1>
            </div>
            <div style="padding: 30px;">
                <h2 style="color: #333;">Hi ${data.fullName.firstName},</h2>
                <p>We're thrilled to have you on board. Thank you for registering and joining our community.</p>
                <p>You're all set to explore everything we have to offer. If you have any questions, feel free to reach out to our support team.</p>
                <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background-color: #2E86C1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Get Started</a>
                </div>
                <p>Best regards,<br/>The Team</p>
            </div>
            <div style="background-color: #f7f7f7; color: #888; padding: 15px; text-align: center; font-size: 12px;">
                <p>You received this email because you signed up on our platform.</p>
            </div>
            </div>
        `;

        await sendEmail(data.email, "Welcome to Our Service", "Thank you for registering with us!", emailHTMLTemplate);
    });

    subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_INITIATED", async (data) => {
        const emailHTMLTemplate = `
        <h1>Payment Initiated</h1>
        <p>Dear ${data.username},</p>
        <p>Your payment of ${data.currency} ${data.amount} for the order ID: ${data.orderId} has been initiated.</p>
        <p>We will notify you once the payment is completed.</p>
        <p>Best regards,<br/>The Team</p>
        `;
        await sendEmail(data.email, "Payment Initiated", "Your payment is being processed", emailHTMLTemplate);
    });

    subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", async (data) => {
        
        const emailHTMLTemplate = `
            <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
            <h2 style="color: #2E86C1;">Your Payment was Successful!</h2>
            <p>Hi ${data.username},</p>
            <p>We're writing to confirm that your payment has been processed successfully.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Payment ID:</strong> ${data.paymentId}</p>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Amount:</strong> ${data.currency} ${data.amount}</p>
            </div>
            <p>Thank you for your purchase. We appreciate your business!</p>
            <p>Cheers,<br/>The Team</p>
            </div>
        `;

        await sendEmail(data.email, "Payment Confirmation", "Your payment was successful!", emailHTMLTemplate);
    }); 

    subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", async (data) => {
        
        const emailHTMLTemplate = `
            <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
            <h2 style="color: #E74C3C;">Payment Failed</h2>
            <p>Hi ${data.username},</p>
            <p>We're sorry to inform you that your payment has failed.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Payment ID:</strong> ${data.paymentId}</p>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            </div>
            <p>If you believe this is an error, please contact our support team.</p>
            <p>Best regards,<br/>The Team</p>
            </div>
        `;

        await sendEmail(data.email, "Payment Failed", "Your payment has failed", emailHTMLTemplate);
    }); 

    subscribeToQueue("PRODUCT_NOTIFICATION.PRODUCT_CREATED", async (data) => {
        const emailHTMLTemplate = `
        <h1>New Product Available!</h1>
        <p>Dear ${data.username},</p>
        <p>Check it out and enjoy exclusive launch offers!</p>
        <p>Best regards,<br/>The Team</p>
        `;
        await sendEmail(data.email, "New Product Launched", "Check out our latest product", emailHTMLTemplate);
    })
}