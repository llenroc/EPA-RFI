'use strict';
var moment = require('moment');

module.exports = function(ngModule) {
    
    ngModule.service('GeoService', function($rootScope) {
        
        this.loading = false;
        this.position = null;

        this.updateLocation = function() {

            var startTime = moment();
            var timeout = 10 * 1000; // convert to seconds

            var svc = this;

            var gotLocation = function(position) {
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('SettingsService.getLocation() took ' + duration);
                svc.position = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                svc.loading = false;

                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            };
            
            var noLocation = function() {
                var endTime = moment();
                var duration = moment(endTime.diff(startTime)).format('mm:ss:SSS');
                console.log('SettingsService.getLocation() (no position) took ' + duration);
                svc.loading = false;
                // should we do this? geo might be down only temporarily...
                svc.position = null;

                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            };

            if (navigator.geolocation) {
                this.loading = true;
                navigator.geolocation.getCurrentPosition(
                    gotLocation, 
                    noLocation, 
                    {timeout: timeout}
                );
            }
            else {
                console.log('Browser does not support geolocation');
                this.loading = false;
            }

        }; // getLocation
    });

};
