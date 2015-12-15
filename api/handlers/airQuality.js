'use strict';

var service = require('../services/airQualityService')();
var Joi = require('joi');

module.exports = {
    getQualityByLatLon: {
        handler: function(request, reply) {
            service.getAirQualityByLatLon(request.params.distance, request.params.lat, request.params.lon, function(err, result) {
                if (!err)
                    if (result.length > 0)
                        reply(result).code(200);
                    // If no data is available for location, return 204 - No Content
                    else
                        reply().code(204);
                else
                    reply(err.message).code(500);
            });
        }
        //,validate: {
        //    payload: Joi.object().keys({
        //        fdaId: Joi.string().guid(),
        //        userComments: Joi.string()
        //    })
        //}
    },
    getQualityByZipCode: {
        handler: function (request, reply) {
            service.getAirQualityByZipCode(request.params.distance, request.params.zipCode, function (err, result) {
                if (!err)
                    if (result.length > 0)
                        reply(result).code(200);
                    // If no data is available for location, return 204 - No Content
                    else
                        reply().code(204);
                else
                    reply(err.message).code(500);
            });
        }
    }
};
