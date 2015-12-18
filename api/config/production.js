'use strict';

module.exports = {
    postgresDb: {
        hostName: 'db',
        database: 'postgres',
        user: 'postgres',
        pass: process.env.POSTGRES_PASSWORD,
        port: 5432
    }
};