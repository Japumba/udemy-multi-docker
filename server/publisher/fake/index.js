const Publisher = require('..');

class FakePublisher extends Publisher {
    constructor(config) {
        super(config);
    }

    init() { }

    publish(topic, message) { }
}

module.exports = FakePublisher;