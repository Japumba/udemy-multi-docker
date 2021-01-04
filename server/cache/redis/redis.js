const Cache = require('../../cache');
const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisCache extends Cache {
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

    async hasKey(key) {
        return await this.client.hexistsAsync(this.config.hash, key.toString());
    }

    async get(key) {
        return await this.client.hgetAsync(this.config.hash, key.toString());
    }

    async set(key, value) {
        return await this.client.hsetAsync(this.config.hash, key.toString(), value.toString());
    }

    async getAll() {
        return await this.client.hgetallAsync(this.config.hash);
    }
}

module.exports = RedisCache;