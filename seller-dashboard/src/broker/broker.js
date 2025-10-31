const amqplib = require('amqplib');

let channel, connection;

async function connect() {
    if (connection) return connection;

    try {
        connection = await amqplib.connect(process.env.RABBIT_URL || 'amqp://localhost');
        console.log('Connected to RabbitMQ');
        channel = await connection.createChannel();
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

async function publishToQueue(queueName, data = {}) {
    try {
        if (!channel || !connection) await connect();

        await channel.assertQueue(queueName, { 
            durable: true 
        });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        console.log(`Published to ${queueName}:`, data);

    } catch (error) {
        console.error('Error publishing to queue:', error);
    }
}

async function subscribeToQueue(queueName, callback) {
    try {
        if (!channel || !connection) await connect();
        
        await channel.assertQueue(queueName, { 
            durable: true 
        });

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                await callback(data);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error subscribing to queue:', error);
    }
}


module.exports = {
    connect,
    channel,
    connection,
    publishToQueue,
    subscribeToQueue
}