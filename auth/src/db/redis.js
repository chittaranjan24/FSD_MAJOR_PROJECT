const { Redis } = require('ioredis');

const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
};

const redis = new Redis(redisConfig);

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redis.on('close', () => {
    console.log('Redis connection closed.');
});

// Graceful shutdown
const shutdown = () => {
    redis.quit().then(() => {
        console.log('Redis connection disconnected gracefully.');
        process.exit(0);
    }).catch((err) => {
        console.error('Error during Redis disconnection:', err);
        process.exit(1);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);


module.exports = redis;