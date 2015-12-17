'use strict';

var service = require('../services/airQualityService')();
var Joi = require('joi');

module.exports = {
    getQualityByLatLon: {
        handler: function(request, reply) {
            console.log('getQualityByLatLon called');
            service.getAirQualityByLatLon(request.params.distance, request.params.latitude, request.params.longitude, function(err, result) {
                if (!err)
                    if (result !== null)
                        reply(result).code(200);
                    // If no data is available for location, return 204 - No Content
                    else
                        reply().code(204);
                else
                    reply(err).code(500);
            });
        },
        validate: {
            params: Joi.object().keys({
                distance: Joi.number().min(1).max(500),
                latitude: Joi.number().min(-90).max(90),
                longitude: Joi.number().min(-180).max(180)
            })
        }
    },
    getQualityByZipCode: {
        handler: function (request, reply) {
            console.log('getQualityByZipCode called');
            service.getAirQualityByZipCode(request.params.distance, request.params.zipCode, function (err, result) {
                if (!err)
                    if (result !== null)
                        reply(result).code(200);
                    // If no data is available for location, return 204 - No Content
                    else
                        reply().code(204);
                else
                    reply(err).code(500);
            });
        },
        validate: {
            params: Joi.object().keys({
                distance: Joi.number().min(1).max(500),
                zipCode: Joi.string().regex(/^[0-9]{5}$/)
            })
        }
    }
};
