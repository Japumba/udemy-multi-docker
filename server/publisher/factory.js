const Publisher = require(".");
const FakePublisher = require("./fake");
const RedisPublisher = require("./redis");

function Create(config) {
    const implementation = config.implementation.toLowerCase();

    let pub = undefined;
    if (implementation == 'fake') {
        console.log('building fake Publisher');
        pub = new FakePublisher(config);
    }
    else if (implementation == 'redis') {
        pub = new RedisPublisher(config);
    }

    if (pub === undefined) {
        throw new Error('could not build a Publisher');
    }
    if (!(pub instanceof Publisher)) {
        throw new Error('built source is not of type Publisher');
    }

    return pub;
}

module.exports = {
    Create
};