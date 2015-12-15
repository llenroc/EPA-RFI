'use strict';

var airQualityService = require('../../services/airQualityService')();

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var config = require('../../config');
var nock = require('nock');
var should = require('should');

describe('UserService', function() {
    beforeEach(function(done) {
        // No shared setup presently

        done();
    });

    it('should retrieve air quality by lat lon', function(done) {
        var distance = 100,
            lat = 34,
            lon = -114;

        var response_data = path.resolve('test/data/airnow_single.json');

        var apiMock = nock(config.epaApi.baseUrl)
            .get('/aq/observation/latLong/current/')
            .query(true)
            .reply(200, function(uri, requestBody) {
                return fs.createReadStream(response_data);
            });

        // Act
        airQualityService.getAirQualityByLatLon(100, 34, -114, function(err, data) {
            // Assert
            data.Category.Number.should.equal(1);
            data.Category.Name.should.equal('Good');

            done();
        });
    });

    it('should retrieve air quality by zip code', function(done) {
        var distance = 100,
            lat = 34,
            lon = -114;

        var response_data = path.resolve('test/data/airnow_single.json');

        var apiMock = nock(config.epaApi.baseUrl)
            .get('/aq/observation/zipCode/current/')
            .query(true)
            .reply(200, function(uri, requestBody) {
                return fs.createReadStream(response_data);
            });

        // Act
        airQualityService.getAirQualityByZipCode(100, 20002, function(err, data) {
            // Assert
            data.Category.Number.should.equal(1);
            data.Category.Name.should.equal('Good');

            done();
        });
    });
});
