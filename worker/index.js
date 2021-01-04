const config = require('config');
const sourceFactory = require('./source/factory');
const cacheFactory = require('./cache/factory');
const CachedCalculator = require('./cachedCalculator');

const source = sourceFactory.Create(config.source);
const cache = cacheFactory.Create(config.cache);

const calculator = require('./fibonacci');

const cachedCalculator = new CachedCalculator(calculator, cache);

source.init();
cache.init();

source.subscribe(config.source.topic, async (channel, message) => {
    const arg = parseInt(message);

    if (isNaN(arg)) {
        console.log(`not a number: ${arg}`);
        return;
    }

    const result = await cachedCalculator.calculate(arg);
});

console.log('worker running');