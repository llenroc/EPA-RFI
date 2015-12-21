'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.service('AirQualityService', function($http, $rootScope, LocalStorageService) {

        var LS_DATA_KEY = 'airquality_data';

        this.data = null;

        this.updateAirQuality = function(latitude, longitude, refresh) {
            var localData = checkLocalStorage(latitude, longitude);
            if (localData && !refresh)
            {
                this.data = localData;

                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }

                return;
            }

            // Wasnt found in localStorage, go request it.
            var distance = 100;
            var url = `/api/air-quality/lat-lon/${distance}/${latitude}/${longitude}`;
            var svc = this;
            $http.get(url).then(function(response) {
                console.log('Got an api response: ' + JSON.stringify(response));
                if (typeof response.data !== 'undefined') {
                    svc.data = response.data;
                    updateLocalStorage(latitude, longitude, svc.data);
                }
                else {
                    svc.data = null;
                }

                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };



        // airquality_data is stored for 2 hours using a key built from lat/lon at 2 decimal places
        // '93.22,25.44': { updated: '...', data: {...} } (lat/lon ordering)

        var checkLocalStorage = function(latitude, longitude) {
            var d = LocalStorageService.get(LS_DATA_KEY);
            if (typeof d === 'undefined' || d === null || d === '') {
                console.log('No AirQuality data in local storage...');
                return;
            }

            var key = latitude.toFixed(2) + ',' + longitude.toFixed(2);
            if (d[key] && d[key] !== null && d[key] !== 'undefined')
            {
                var value = d[key];
                var updated = new Date(value.updated);
                var expired = moment().subtract(2, 'hours');
                if (expired.isAfter(updated)) {
                    console.log('Expiration [' + expired + '] is after [' + updated + ']');
                    return;
                }

                // it's good!
                console.log('Using LocalStorage data from ' + updated);

                // Data is current in local storage
                return value.data;
            }
        };

        var updateLocalStorage = function(latitude, longitude, data) {
            var d = LocalStorageService.get(LS_DATA_KEY);
            if (typeof d === 'undefined' || d === null || d === '') {
                console.log('No AirQuality data in local storage... initializing.');
                d = {};
            }

            var key = latitude.toFixed(2) + ',' + longitude.toFixed(2);
            d[key] = { updated: new Date(), data: data};

            LocalStorageService.set(LS_DATA_KEY, d);

        };

    });

};
