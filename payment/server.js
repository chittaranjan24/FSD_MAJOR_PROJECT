require('dotenv').config();
const app = require("./src/app");
const connectDb = require('./src/db/db');

connectDb()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})