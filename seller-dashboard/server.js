require('dotenv').config();
const app = require("./src/app");
const connectDB = require('./src/db/db');
const { connect } = require('./src/broker/broker')
const listener = require('./src/broker/listener');

connect().then(() => {
    listener();
});

connectDB();

app.listen(process.env.PORT || 3008, () => {
  console.log(`Server is running on port ${process.env.PORT || 3008}`);
});