const Storage = require('.');
const FakeStorage = require('./fake');
const PostgresStorage = require('./postgres');

function Create(config) {
    const implementation = config.implementation.toLowerCase();

    let storage = undefined;
    if (implementation == 'fake') {
        console.log('building fake Storage');
        storage = new FakeStorage(config);
    }
    else if (implementation == 'postgres') {
        storage = new PostgresStorage(config);
    }

    if (storage === undefined) {
        throw new Error('could not build a Storage');
    }
    if (!(storage instanceof Storage)) {
        throw new Error('built source is not of type Storage');
    }

    return storage;
}

module.exports = {
    Create
};