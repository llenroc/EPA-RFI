'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.service('AirQualityService', function($http, $rootScope, LocalStorageService) {

        var LS_DATA_KEY = 'airquality_data';

        this.data = null;

        this.updateAirQuality = function(latitude, longitude) {
            var distance = 100;
            var url = `/api/air-quality/lat-lon/${distance}/${latitude}/${longitude}`;
            var svc = this;
            $http.get(url).then(function(response) {
                console.log('Got an api response: ' + JSON.stringify(response));
                if (typeof response.data !== 'undefined') {
                    svc.data = response.data;
                    LocalStorageService.set(LS_DATA_KEY, svc.data);
                }
                else {
                    svc.data = null;
                }

                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };

        this.checkLocalStorage = function() {
            var d = LocalStorageService.get(LS_DATA_KEY);
            if (typeof d === 'undefined' || d === null || d === '') {
                console.log('No AirQuality data in local storage...');
                return;
            }

            var updated = new Date(d.updated);
            var expired = moment().subtract(2, 'hours');
            if (expired.isAfter(updated)) {
                console.log('Expiration [' + expired + '] is after [' + updated + ']');
                return;
            }

            // it's good!
            console.log('Using LocalStorage data from ' + updated);
            this.data = d;
        };

    });

};
