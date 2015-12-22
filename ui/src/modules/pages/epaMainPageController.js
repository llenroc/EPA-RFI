'use strict';

var moment = require('moment');


module.exports = function(ngModule) {

    ngModule.controller('epaMainPageController', function($scope, AirQualityService, GeoService, StoredLocationsService) {

        var positionUpdated = function() {
            var location = StoredLocationsService.getActiveLocation();


            var position = {};
            if (location === 'current') {
                console.log('position updated: ' + JSON.stringify($scope.GeoService.position));
                if ($scope.GeoService.position !== null) {
                    position = {
                        latitude: $scope.GeoService.position.latitude,
                        longitude: $scope.GeoService.position.longitude
                    };
                }
            }
            else {
                console.log('location override set from settings: ' + JSON.stringify(location));
                position = {
                    latitude: location.latitude,
                    longitude: location.longitude
                };
            }

            console.log(`getting data for location ${position.latitude}, ${position.longitude}`);
            AirQualityService.updateAirQuality(
                position.latitude,
                position.longitude
            );
        };

        var initialize = function() {
            console.log('epaMainPageController initializing...');

            $scope.date = moment().format('MM/DD/YYYY');

            $scope.GeoService = GeoService;
            $scope.AirQualityService = AirQualityService;

            //AirQualityService.checkLocalStorage();
            GeoService.updateLocation();

            $scope.$watch('GeoService.position', positionUpdated);
            $scope.$watch('StoredLocationsService.getActiveLocation', positionUpdated);
        };

        initialize();
    });

};
