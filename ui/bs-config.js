'use strict';
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
var proxy = require('http-proxy-middleware');
var proxyOpts = {
    target: 'http://tutum-79f231a3.cloudapp.net',
    changeOrigin: true
};

module.exports = {
    'files': [
        'src/**/*.html',
        'src/images/*',
        'src/scripts/*.js',
        'src/styles/*.min.css'
    ],
    'watchOptions': {
        'ignoreInitial': true
    },
    'server': {
        'baseDir': 'src',
    },
    'port': 9000,
    'middleware': [
        proxy('/api', proxyOpts)
    ],
    //'open': 'local',
    //'browser': 'chrome',
    'reloadOnRestart': false,
    'notify': false,
};
