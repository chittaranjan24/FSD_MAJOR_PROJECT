const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected { Payment }');        
    } catch (error) {
        console.log('Database connection failled!')
    }    
} 

module.exports = connectDb