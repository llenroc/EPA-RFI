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
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('SettingsService.getLocation() took ' + duration);
                deferred.resolve(position);
            };
            
            var noLocation = function() {
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('SettingsService.getLocation() (no position) took ' + duration);
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
