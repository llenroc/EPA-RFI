'use strict';

var server = require('../../server');
var should = require('should');

describe('GeocoderService', function() {
    var options;

    beforeEach(function(done) {
        options = {
            method: 'GET',
            url: '/api/geocoder'
        };

        done();
    });

    it('should retrieve location of valid zip code', function(done) {
        options.url += '/45432';

        server.inject(options, function(response) {
            response.statusCode.should.equal(200);
            response.result.city.should.equal('Dayton');
            response.result.state.should.equal('OH');
            response.result.latitude.should.equal(39.74035);
            response.result.longitude.should.equal(-84.09306);
            response.result.zip.should.equal(45432);

            done();
        });
    });

    it('should return 204 when querying valid, but non-existent zip code', function(done) {
        options.url += '/00001';

        server.inject(options, function(response) {
            response.statusCode.should.equal(204);

            done();
        });
    });


    it('should return 400 when querying invalid zip code', function(done) {
        options.url += '/0';

        server.inject(options, function(response) {
            response.statusCode.should.equal(400);
            response.result.message.should.equal('child "zipCode" fails because ["zipCode" with value "0" fails to match the required pattern: /^[0-9]{5}$/]');

            done();
        });
    });
});
