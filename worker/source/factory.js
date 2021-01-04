const Source = require(".");
const FakeSource = require("./fake/fake");
const RedisSource = require('./redis/redis');

function Create(config) {
    const implementation = config.implementation.toLowerCase();

    let source = undefined;
    if (implementation == 'fake') {
        console.log('building fake source');
        source = new FakeSource(config);
    }
    else if (implementation == 'redis') {
        source = new RedisSource(config);
    }

    if (source === undefined) {
        throw new Error('could not build a Source');
    }
    if (!(source instanceof Source)) {
        throw new Error('built source is not of type Source');
    }

    return source;
}

module.exports = {
    Create
};