'use strict';

var Hello = require('./handlers/hello');
var AirQuality = require('./handlers/airQuality');

module.exports = [
    {
        method: 'GET',
        path: '/api/hello',
        handler: Hello
    },
    {
        method: 'GET',
        path: '/api/air-quality/lat-lon/{distance}/{latitude}/{longitude}',
        config: AirQuality.getQualityByLatLon
    },
    {
        method: 'GET',
        path: '/api/air-quality/zip-code/{distance}/{zipCode}',
        config: AirQuality.getQualityByZipCode
    }
];
