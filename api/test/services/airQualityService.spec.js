'use strict';

var server = require('../../server');
var config = require('../../config');

var path = require('path');
var fs = require('fs');
var nock = require('nock');
var should = require('should');

describe('AirQualityService', function() {
    var options;

    beforeEach(function(done) {
        options = {
            method: 'GET',
            url: '/api/air-quality'
        };

        done();
    });

    it('should retrieve air quality by lat lon', function(done) {
        var response_data = path.resolve('test/data/airnow_single.json');

        nock(config.epaApi.baseUrl)
            .get('/aq/observation/latLong/current/')
            .query(true)
            .reply(200, function(uri, requestBody) {
                return fs.createReadStream(response_data);
            });

        options.url += '/lat-lon/100/34/-114';

        server.inject(options, function(response) {
            response.statusCode.should.equal(200);
            response.result.quality.value.should.equal(1);
            response.result.quality.description.should.equal('Good');

            done();
        });
    });

    it('should retrieve air quality by zip code', function(done) {
        var response_data = path.resolve('test/data/airnow_single.json');

        nock(config.epaApi.baseUrl)
            .get('/aq/observation/zipCode/current/')
            .query(true)
            .reply(200, function(uri, requestBody) {
                return fs.createReadStream(response_data);
            });


        options.url += '/zip-code/100/20002';

        server.inject(options, function(response) {
            response.statusCode.should.equal(200);
            response.result.quality.value.should.equal(1);
            response.result.quality.description.should.equal('Good');

            done();
        });
    });
});
