const Storage = require('..');
const { Pool } = require('pg');
const queries = require('./queries');
const moment = require('moment');

class PostgresStorage extends Storage {
    constructor(config) {
        super(config);

        if (!config.credentials.username) {
            throw new Error('must provide config.credentials.username for Postgres Storage');
        }
        if (!config.credentials.password) {
            throw new Error('must provide config.credentials.password for Postgres Storage');
        }

        if (!config.host) {
            throw new Error('must provide config.host for Postgres Storage');
        }
        if (!config.port) {
            throw new Error('must provide config.port for Postgres Storage');
        }
        if (!config.database) {
            throw new Error('must provide config.database for Postgres Storage');
        }

        this.config = config;
    }

    init() {
        this.client = new Pool({
            user: this.config.credentials.username,
            password: this.config.credentials.password,
            host: this.config.host,
            port: this.config.port,
            database: this.config.database,
        });

        this.client.on('error', () => console.log('Lost pg connection'));
    }

    async getAllValues() {
        const values = await this.client.query(queries.getAllValues);

        return values.rows;
    }

    async insert(value) {
        const now = moment();

        return this.client.query(queries.insert, [value, now.toISOString()]);
    }
}

module.exports = PostgresStorage;