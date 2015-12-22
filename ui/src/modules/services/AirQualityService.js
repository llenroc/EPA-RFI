'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.service('AirQualityService', function($http, LocalStorageService, LocationService) {

        var LS_DATA_KEY = 'airqualitydata';

        this.airQuality = null;

        this.updateAirQuality = function() {
            var localData = LocalStorageService.get(LS_DATA_KEY);

            // If we have local data that hasn't expired yet, show it while we
            // update from the api
            if (localData && localData !== this.data && !this.isExpired(localData)) {
                console.log('Using local data for now...');
                this.airQuality = localData;
            }

            // Make sure we have an active location before calling the api
            if (!LocationService.activeLocation.latitude) {
                console.log('Need to get position first...');
                var svc = this;
                LocationService.getCurrentLocation(true).then(function() {
                    svc.updateFromApi();
                });
            }
            else {
                // we have a valid location, call the service.
                this.updateFromApi();
            }
        };

        this.updateFromApi = function() {
            if (LocationService.activeLocation === null || 
                LocationService.activeLocation.latitude === null) {
                console.log('AirQualityService.updateFromApi called with no location data!');
                return;
            }

            var distance = 100;
            var lat = LocationService.activeLocation.latitude;
            var lon = LocationService.activeLocation.longitude;
            var url = `/api/air-quality/lat-lon/${distance}/${lat}/${lon}`;
            var svc = this;
            $http.get(url).then(function(response) {
                svc.storeData(response);
            });
        };

        this.storeData = function(dataIn) {
            console.log('Storing data: ' + JSON.stringify(dataIn));
            this.airQuality = dataIn;
            LocalStorageService.set(LS_DATA_KEY, dataIn);
        };

        this.isExpired = function(dataIn) {
            var updated = new Date(dataIn.updated);
            var expired = moment().subtract(2, 'hours');
            if (expired.isAfter(updated)) {
                console.log('Expiration [' + expired + 
                            '] is after [' + updated + ']');
                return true;
            }
            return false;
        };
    });

};
