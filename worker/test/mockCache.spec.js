const Cache = require('../cache');

class MockCache extends Cache {
    constructor({
        haskeyFunction,
        getFunction
    } = {}) {
        super();

        this.hasKeyFunction = haskeyFunction;
        this.getFunction = getFunction;
    }

    hasKey(key) {
        if (this.hasKeyFunction) {
            return this.hasKeyFunction(key);
        }

        return false;
    }

    get(key) {
        if (this.getFunction) {
            return this.getFunction(key);
        }

        return undefined;
    }
}

module.exports = MockCache;