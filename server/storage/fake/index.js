const Storage = require('..');

class FakeStorage extends Storage {
    constructor(config) {
        super(config);
    }

    init() { }

    async getAllValues() {
        return Promise.resolve([]);
    }

    async insert(value) {
    }
}

module.exports = FakeStorage;