class Cache {

    constructor(config = {}) {
        if (new.target == Cache)
            throw new Error('Please extend Cache');
    }

    init() {
        throw new Error('Method not implemented');
    }

    async hasKey(key = undefined) {
        throw new Error('Method not implemented');
    }

    async get(key = undefined) {
        throw new Error('Method not implemented');
    }

    async set(key = undefined, value = undefined) {
        throw new Error('Method not implemented');
    }

    async remove(key = undefined) {
        throw new Error('Method not implemented');
    }

    async getAll() {
        throw new Error('Method not implemented');
    }
}

module.exports = Cache;