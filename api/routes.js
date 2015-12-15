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
        path: '/api/air-quality/{distance}/{lat}/{lon}',
        config: AirQuality.getQualityByLatLon
    },
    {
        method: 'GET',
        path: '/api/air-quality/{distance}/{zipCode}',
        config: AirQuality.getQualityByZipCode
    }
];
