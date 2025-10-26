require('dotenv').config();
const app = require("./src/app");
const http = require('http');
const { initSocketSrver } = require('./src/sockets/socket.server');

const httpServer = http.createServer(app);

initSocketSrver(httpServer)

httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);    
})