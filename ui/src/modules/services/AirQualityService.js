'use strict';

module.exports = function(ngModule) {

    ngModule.service('AirQualityService', function($http, $rootScope) {

        this.data = null;

        this.updateAirQuality = function(latitude, longitude) {
            var distance = 100;
            var url = `/api/air-quality/lat-lon/${distance}/${latitude}/${longitude}`;
            var svc = this;
            $http.get(url).then(function(response) {
                console.log('Got an api response: ' + JSON.stringify(response));
                if (typeof response.data !== 'undefined') {
                    svc.data = response.data;
                }
                else {
                    svc.data = null;
                }

                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };

    });

};
