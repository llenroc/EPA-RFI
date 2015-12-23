'use strict';

var request = require('request');
var config = require('../config');

function AirQualityService() {
    var pub = {},
        extractAirQuality;

    extractAirQuality = function(error, response, bodyRaw, callback) {
        if (!error && response) {
            var body = JSON.parse(bodyRaw);

            if (body) {
                if (body.length > 0) {
                    // Front end currently only processes one result.
                    var element = body[0];
                    var airQualityResponse = {
                        quality: { value: element.Category.Number, description: element.Category.Name, index: element.AQI, type: element.ParameterName },
                        details:
                        {
                            updated: element.DateObserved + (element.HourObserved < 10 ? '0' + element.HourObserved: element.HourObserved) + ':00 ' + element.LocalTimeZone,
                            location: element.ReportingArea + ', ' + element.StateCode
                        },
                        activities: {
                            recommended: [ 'walking', 'running', 'hiding' ],
                            hazardous: [ 'mowing', 'trimming', 'gardening' ]
                        }
                    };

                    return callback(null, airQualityResponse);
                }
                else {
                    // If we have no results return null.
                    callback(null, null);
                }
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
        var format = 'application/json';

        var apiUrl = config.epaApi.baseUrl + '/aq/observation/latLong/current/?API_KEY='
            + config.epaApi.apiKey +
            '&latitude=' + lat + '&longitude=' + lon +
            '&distance=' + distance + '&format=' + format;
        request(apiUrl, function(error, response, bodyRaw) {
            extractAirQuality(error, response, bodyRaw, callback);
        });
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
