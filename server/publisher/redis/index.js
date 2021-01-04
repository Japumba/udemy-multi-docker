const Publisher = require('..');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisPublisher extends Publisher {
    constructor(config) {
        super(config);

        this.config = config;
    }

    init() {
        this.client = redis.createClient({
            host: this.config.host,
            port: this.config.port
        });

        this.client.on('error', (error) => {
            console.log('redis error');
        });
    }

    async publish(topic, message) {
        await this.client.publishAsync(topic, message);
    }
}

module.exports = RedisPublisher;