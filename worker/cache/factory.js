const Cache = require(".");
const FakeCache = require("./fake/fake");
const RedisCache = require("./redis/redis");

function Create(config) {
    const implementation = config.implementation.toLowerCase();

    let cache = undefined;
    if (implementation == 'fake') {
        console.log('building fake cache');
        cache = new FakeCache(config);
    }
    else if (implementation == 'redis') {
        cache = new RedisCache(config);
    }

    if (cache === undefined) {
        throw new Error('could not build a Cache');
    }
    if (!(cache instanceof Cache)) {
        throw new Error('built source is not of type Cache');
    }

    return cache;
}

module.exports = {
    Create
};