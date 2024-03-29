const blueBird = require('bluebird');
const redis = require('redis');

blueBird.promisifyAll(redis);

const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || 'password',
});

module.exports = client;