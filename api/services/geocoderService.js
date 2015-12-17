'use strict';

var pg = require('pg');
var request = require('request');
var config = require('../config');

var conString = "postgres://" + config.postgresDb.user + ":" + config.postgresDb.pass +
    "@" + config.postgresDb.hostName + "/" + config.postgresDb.database;
var client = new pg.Client(conString);

function GeocoderService() {
    var pub = {};

    pub.getLocationByZipCode = function(zipCode, callback) {
        client.connect(function(err) {
            if(err) {
                return callback('Could not connect to database: ' + err);
            }
            client.query("SELECT * from zip_geocode where zip = $1", [zipCode], function(err, result) {
                if(err) {
                    return callback('Error running query: ' + err);
                }
                if (result && result.rows.length > 0) {
                    console.log(result.rows);
                    callback(null, result.rows);
                }
                else {
                    // if we have no matches return null
                    callback(null, null);
                }

                client.end();
            });
        });
    };

    return pub;
}

module.exports = GeocoderService;
