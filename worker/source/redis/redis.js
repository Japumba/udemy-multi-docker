const Source = require('..');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisSource extends Source {
    constructor(config) {
        super(config);
        if (!config.host) {
            throw new Error('cache host must be provided for redis implementation');
        }
        if (!config.port) {
            throw new Error('cache port must be provided for redis implementation');
        }
        this.config = config;
    }

    init() {
        this.client = redis.createClient({
            host: this.config.host,
            port: this.config.port
        });
    }

    async subscribe(topic, callback) {
        this.client.on("message", callback);
        this.client.subscribe(topic);
        console.log(`subscribed to topic ${topic}`);
    }
}

module.exports = RedisSource;