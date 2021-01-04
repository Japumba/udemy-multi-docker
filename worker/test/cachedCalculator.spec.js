const expect = require('chai').expect;
const CachedCalculator = require('../cachedCalculator');
const FakeCache = require('../cache/fake/fake');
const MockCache = require('./mockCache.spec');

describe('CachedCalculator', function () {
    describe('constructor', function () {
        it('throws an error if no calculator is provided', function () {
            const cache = new FakeCache();
            expect(() => new CachedCalculator(undefined, cache)).to.throw();
        });
        it('throws an error if calculator is not a function', function () {
            const cache = new FakeCache();
            expect(() => new CachedCalculator({}, cache)).to.throw();
        });

        it('throws an error if no cache is provided', function () {
            const calculator = () => { };
            expect(() => new CachedCalculator(calculator)).to.throw();
        });
        it('throws an error if cache is not of type Cache', function () {
            const calculator = () => { };
            const cache = {};
            expect(() => new CachedCalculator(calculator, cache)).to.throw();
        });
    });

    describe('calculate', function () {
        it('returns cached value if available', function () {
            const cache = new MockCache({
                haskeyFunction: () => true,
                getFunction: () => 5
            });

            const calculator = () => 4;

            const cachedCalculator = new CachedCalculator(calculator, cache);

            const result = cachedCalculator.calculate(2);

            expect(result).to.be.equal(5);
        });

        it('calls calculator if cache doesnt have key', function () {
            const cache = new MockCache();

            const calculator = () => 3;

            const cachedCalculator = new CachedCalculator(calculator, cache);

            const result = cachedCalculator.calculate(5);

            expect(result).to.be.equal(3);
        });
    });
});