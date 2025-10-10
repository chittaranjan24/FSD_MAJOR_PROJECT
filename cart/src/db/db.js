const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected {Cart}");              
    } catch (error) {
        console.log("Database connection failed", error)
    }    
}

module.exports = connectDB