function fibonacci(index) {
    if (index <= 1)
        return 1;

    return fibonacci(index - 1) + fibonacci(index - 2);
}

module.exports = fibonacci;