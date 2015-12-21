'use strict';

var moment = require('moment');


module.exports = function(ngModule) {

    ngModule.controller('epaMainPageController', function($scope, AirQualityService, GeoService, StoredLocationsService) {

        var positionUpdated = function() {
            console.log('position updated: ' + JSON.stringify($scope.GeoService.position));
            if ($scope.GeoService.position !== null) {
                AirQualityService.updateAirQuality(
                    $scope.GeoService.position.latitude,
                    $scope.GeoService.position.longitude
                );
            }
        };

        var activeLocationUpdated = function() {
            var location = StoredLocationsService.getActiveLocation();
            console.log('location override set from settings: ' + JSON.stringify(location));
        };

        var initialize = function() {
            console.log('epaMainPageController initializing...');

            $scope.date = moment().format('MM/DD/YYYY');

            $scope.GeoService = GeoService;
            $scope.AirQualityService = AirQualityService;

            //AirQualityService.checkLocalStorage();
            GeoService.updateLocation();

            $scope.$watch('GeoService.position', positionUpdated);
            $scope.$watch('StoredLocationsService.getActiveLocation', activeLocationUpdated);
        };

        initialize();
    });

};
