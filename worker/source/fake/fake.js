const Source = require('../../source');

class FakeSource extends Source {
    constructor(config) { super(config); }

    init() { }

    async subscribe(event, callback) { }
}

module.exports = FakeSource;