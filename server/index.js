const config = require('config');
const cacheFactory = require('./cache/factory');
const storageFactory = require('./storage/factory');
const publisherFactory = require('./publisher/factory');

const cache = cacheFactory.Create(config.cache);
const pub = publisherFactory.Create(config.publisher);
const storage = storageFactory.Create(config.storage);

cache.init();
pub.init();
storage.init();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/value/all', async (req, res) => {
    try {
        const values = await storage.getAllValues();

        return res.send(values);
    } catch (error) {
        console.log(error);
        return res.header(500).send('ERROR getting all values');
    }
});

app.get('/value/current', async (req, res) => {

    try {
        const values = await cache.getAll();

        return res.send(values);
    } catch (error) {
        console.log(error);
        return res.status(500).send('ERROR getting current values');
    }
});

app.post('/value', async (req, res) => {
    const index = parseInt(req.body.index);

    if(isNaN(index)) {
        console.log(`invalid argument: ${req.body.index}`);
        return res.status(422).send(`index must be an integer.`);
    }

    if (index > config.server.fibonacci.maxIndex) {
        console.log(`index ${index} out of bounds`);
        return res.status(422).send(`index must not be greater than ${config.server.fibonacci.maxIndex}`);
    }

    try {
        await pub.publish(config.publisher.topic, index);
        await storage.insert(index);

        return res.send({ working: true });
    } catch (error) {
        console.log(error);
        return res.status(500).send('ERROR setting new value');
    }

});

app.listen(config.server.port);

console.log(`server listening to port ${config.server.port}`);