'use strict';

var pg = require('pg');
var request = require('request');
var config = require('../config');

var conString = "postgres://" + config.postgresDb.user + ":" + config.postgresDb.pass +
    "@" + config.postgresDb.hostName + "/" + config.postgresDb.database;

function GeocoderService() {
    var pub = {};

    pub.getLocationByZipCode = function(zipCode, callback) {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return callback('Could not connect to database: ' + err);
            }
            client.query("SELECT * from zip_geocode where zip = $1", [zipCode], function(err, result) {
                // Wrap entire query callback in try/finally to ensure conneciton cleanup
                try {
                    if (err) {
                        return callback('Error running query: ' + err);
                    }
                    if (result && result.rows.length > 0) {
                        var cleaned = result.rows[0];
                        cleaned.latitude = parseFloat(cleaned.latitude);
                        cleaned.longitude = parseFloat(cleaned.longitude);
                        cleaned.zip = parseInt(cleaned.zip);
                        callback(null, cleaned);
                    }
                    else {
                        // if we have no matches return null
                        callback(null, null);
                    }
                }
                finally {
                    // We only want to try cleanup, if already closed, we don't care
                    try {
                        client.end();
                    }
                    catch (ex){
                        consoloe.log('Unable to close DB connection. Already closed?');
                    }
                }
            });
        });
    };

    return pub;
}

module.exports = GeocoderService;
