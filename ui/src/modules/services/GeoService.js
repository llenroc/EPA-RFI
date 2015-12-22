'use strict';
var moment = require('moment');

module.exports = function(ngModule) {
    
    ngModule.service('GeoService', function($q) {

        this.supportsGeo = function() {
            if (navigator.geolocation) {
                return true;
            }
            return false;
        };

        this.getLocation = function() {
            var deferred = $q.defer();

            var startTime = moment();
            var timeout = 10 * 1000; // convert to seconds

            var gotLocation = function(position) {
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('GeoService.getLocation() took ' + duration);
                deferred.resolve({
                    name: 'Current',
                    latitude: position.coords.latitude.toFixed(2),
                    longitude: position.coords.longitude.toFixed(2)
                });
            };
            
            var noLocation = function() {
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('GeoService.getLocation() (no position) took ' + duration);
                deferred.resolve(null);
            };

            if (this.supportsGeo()) {
                navigator.geolocation.getCurrentPosition(
                    gotLocation, 
                    noLocation, 
                    {timeout: timeout}
                );
            }
            return deferred.promise;
        }; // getLocation
    });

};
