const Cache = require('..');

class FakeCache extends Cache {
    constructor(config) {
        super(config);
    }

    init() {
        return Promise.resolve();
    }

    async hasKey(key) { }
    async get(key) { }
    async set(key, value) { }
    async remove(key) { }
    async getAll() { }
}

module.exports = FakeCache;