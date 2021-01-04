class Publisher {
    constructor(config) {
        if (new.target == Publisher)
            throw new Error('Pleas extend Publisher and instantiate child classes.');
    }

    init() {
        throw new Error('method not implemented');
    }

    async publish(topic, message) {
        throw new Error('method not implemented');
    }
}

module.exports = Publisher;