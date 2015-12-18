'use strict';

var _ = require('lodash');

// config for all environments
var all = {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.VCAP_APP_PORT, 10) || parseInt(process.env.PORT, 10) || 3000,
    epaApi: {
        baseUrl: 'http://www.airnowapi.org',
        apiKey: '489ED029-1E6E-4558-9FF5-AD40DDEE4099'
    },
    postgresDb: {
        hostName: '192.168.99.100',
        database: 'postgres',
        user: 'postgres',
        pass: '',
        port: 5432
    }
};

// get environment-specific config
// try to load envrionment-specific config
var environmentConfig = {};
try {
    environmentConfig = require('./' + process.env.NODE_ENV + '.js');
}
catch (e) {
    if(!e instanceof Error || e.code !== "MODULE_NOT_FOUND")
        throw e;
}
module.exports = _.merge(
    all,
    environmentConfig
);
