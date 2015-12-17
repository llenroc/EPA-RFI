'use strict';

var service = require('../services/geocoderService')();
var Joi = require('joi');

module.exports = {
    getLocationByZipCode: {
        handler: function(request, reply) {
            console.log('getLocationByZipCode called');
            service.getLocationByZipCode(request.params.zipCode, function(err, result) {
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
                zipCode: Joi.string().regex(/^[0-9]{5}$/)
            })
        }
    }
};
