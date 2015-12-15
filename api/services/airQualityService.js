'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../config');

function AirQualityService() {
    var pub = {},
        extractAirQuality;

    extractAirQuality = function(error, response, bodyRaw, callback) {
        if (!error && response) {
            var body = JSON.parse(bodyRaw);

            if (body) {
                // TODO: Add wrapper around AirNow API

                // Grab first result and return.
                callback(null, body[0])
            }
            else {
                callback('Missing JSON body in AirNow response.')
            }
        }
        else {
            callback('Error querying AirNow API: ' + error.message);
        }
    };

    pub.getAirQualityByLatLon = function(distance, lat, lon, callback) {
        if(lat >= -90 && lat <= 90 &&
            lon >= -180 && lon <= 180)
        {
            var format = 'application/json';

            var apiUrl = config.epaApi.baseUrl + '/aq/observation/latLong/current/?API_KEY='
                + config.epaApi.apiKey +
                '&latitude=' + lat + '&longitude=' + lon +
                '&distance=' + distance + '&format=' + format;
            request(apiUrl, function(error, response, bodyRaw) {
                extractAirQuality(error, response, bodyRaw, callback);
            });
        }
        else
            callback(null, 'Latitude or Longitude values are out of bounds.');
    };

    pub.getAirQualityByZipCode = function(distance, zipCode, callback) {
        var format = 'application/json';


        var apiUrl = config.epaApi.baseUrl + '/aq/observation/zipCode/current/?API_KEY='
            + config.epaApi.apiKey +
            '&zipCode=' + zipCode + '&distance=' + distance + '&format=' + format;
        request(apiUrl, function(error, response, bodyRaw) {
            extractAirQuality(error, response, bodyRaw, callback);
        });
    };


    return pub;
}

module.exports = AirQualityService;
