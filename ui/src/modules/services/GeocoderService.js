'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.service('GeocoderService', function($http, $q) {

        this.identifyLocation = function(zipCode) {
            var deferred = $q.defer();

            var url = `http://tutum-79f231a3.cloudapp.net/api/geocoder/${zipCode}`;
            $http.get(url).then(function(response) {
                console.log('Got an api response: ' + JSON.stringify(response));
                if (typeof response.data !== 'undefined') {
                    deferred.resolve(response.data);
                }
                else {
                    deferred.reject('No data found.');
                }
            },
            function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    });

};
