require('dotenv').config();
const app = require("./src/app");
const connectDb = require('./src/db/db');
const {connect} = require("./src/broker/broker");

connect();

connectDb()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})