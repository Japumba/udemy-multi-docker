class Source {
    constructor(config) {
        if (new.target == Source)
            throw new Error('please implement a source');
    }

    init() {
        throw new Error('Method not implemented');
    }

    async subscribe(event, callback) {
        throw new Error('Method not implemented');
    }
}

module.exports = Source;