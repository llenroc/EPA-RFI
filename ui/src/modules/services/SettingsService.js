'use strict';
var moment = require('moment');

module.exports = function(ngModule) {
    
    ngModule.service('SettingsService', function($q) {
        
        this.settings = {};

        this.getLocation = function() {
            var deferred = $q.defer();

            var startTime = moment();
            var timeout = 10 * 1000; // convert to seconds

            var gotLocation = function(position) {
                console.log('Position: ' + position.coords.latitude + ', ' + position.coords.longitude);
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('SettingsService.getLocation() time: ' + duration);
                deferred.resolve(position);
            };
            
            var noLocation = function() {
                console.log('No location within timeout ()');
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('SettingsService.getLocation() time: ' + duration);
                deferred.resolve(null);
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    gotLocation, 
                    noLocation, 
                    {timeout: timeout}
                );
            }
            else {
                console.log('Browser does not support geolocation')
                deferred.resolve(null);
            }

            return deferred.promise;
        }; // getLocation
    });

};
