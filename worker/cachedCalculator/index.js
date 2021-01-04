const Cache = require("../cache");

class CachedCalculator {
    constructor(calculator, cache) {
        if (!calculator) {
            throw new Error('no calculator provided');
        }

        if ((typeof calculator != 'function')) {
            throw new Error('calculator is not a function');
        }

        if (!cache) {
            throw new Error('no cache is provided');
        }

        if (!(cache instanceof Cache)) {
            throw new Error('provided cache is not of type Cache');
        }

        this.calculator = calculator;
        this.cache = cache;
    }

    async calculate(arg) {
        const rawValue = await this.cache.get(arg);

        const value = parseInt(rawValue);

        if (!isNaN(value)) {
            return value;
        }

        const result = this.calculator(arg);

        await this.cache.set(arg, result);

        return result;
    }
}

module.exports = CachedCalculator;