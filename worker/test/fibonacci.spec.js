const expect = require('chai').expect;
const fibonacci = require('../fibonacci');

describe('Fibonacci', function () {
    it('should return 1 on negative index', function () {
        expect(fibonacci(-1)).to.be.equal(1);
    })

    it('should return 1 on index 0', function () {
        expect(fibonacci(0)).to.be.equal(1);
    });

    it('should return 1 on index 1', function () {
        expect(fibonacci(1)).to.be.equal(1);
    });

    it('should return 2 for index 2', function () {
        expect(fibonacci(2)).to.be.equal(2);
    });

    it('should return 8 for index 5', function () {
        expect(fibonacci(5)).to.be.equal(8);
    });
});