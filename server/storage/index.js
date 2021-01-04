class Storage {
    constructor(config) {
        if (new.target == Storage)
            throw new Error('please extend Storage and instantiate child classes');
    }

    init() {
        throw new Error('method not implemented');
    }

    async getAllValues() {
        throw new Error('method not implemented');
    }

    async insert(value) {
        throw new Error('method not implemented');
    }
}

module.exports = Storage;