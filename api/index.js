'use strict';

// new relic monitoring
require('newrelic');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = require('./server');

var terminate = function (code) {
    console.log(code + ' received. Shutting down.');
    server.stop(function () {
        process.exit(0);
    });
};

// SIGTERM and SIGINT handling to accept system signal and gracefully stop server. NOTE: required for docker non-daemonized interruption
process.on('SIGTERM', function() {terminate('SIGTERM')});
process.on('SIGINT', function() {terminate('SIGINT')});

