'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaMainPageController', function($scope, GeoService, AirQualityService) {

        var positionUpdated = function() {
            console.log('position updated: ' + $scope.GeoService.position);
            if ($scope.GeoService.position !== null) {
                AirQualityService.updateAirQuality(
                    $scope.GeoService.position.latitude,
                    $scope.GeoService.position.longitude
                );
            }
        };

        var initialize = function() {
            console.log('epaMainPageController initializing...');

            $scope.GeoService = GeoService;
            $scope.AirQualityService = AirQualityService;

            AirQualityService.checkLocalStorage();
            GeoService.updateLocation();

            $scope.$watch('GeoService.position', positionUpdated);
        };
        initialize();
    });

};
