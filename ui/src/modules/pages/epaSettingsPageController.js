'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaSettingsPageController', function($scope, AirQualityService, GeocoderService, GeoService, LocationService) {

        $scope.showCurrent = false;

        var parseZipCode = function() {
            if (typeof $scope.inputLocation === 'undefined' || $scope.inputLocation === null) {
                return null;
            }
            if ($scope.inputLocation.length !== 5) {
                return null;
            }
            var zip = parseInt($scope.inputLocation);
            if (isNaN(zip)) {
                return null;
            }
            return zip;
        };

        var isValid = function() {
            var zip = parseZipCode();
            if (zip) {
                return true;
            }
            $scope.inputMessage = 'Please enter a valid Zip Code.';
            return false;
        };

        $scope.setActiveLocation = function(location) {
            if (location === 'current') {
                LocationService.setActiveLocation({
                    name: 'Current'
                });
            }
            else {
                LocationService.setActiveLocation(location);
            }
        };

        $scope.removeLocation = function(location) {
            LocationService.removeLocation(location);
        };

        $scope.addLocation = function() {
            $scope.inputMessage = '';

            if (isValid()) {
                GeocoderService.identifyLocation($scope.inputLocation).then(function (response) {
                    console.log(response);
                    if (response.city && response.state && response.latitude && response.longitude) {
                        var location = {
                            name: `${response.city}, ${response.state}`,
                            latitude: response.latitude,
                            longitude: response.longitude,
                            zip: parseZipCode()
                        };
                        LocationService.addLocation(location);
                    }
                    else {
                        console.log(`Location is invalid: ${response}`);
                    }
                }, function (error) {
                        console.log(`Error querying Geocoder server: ${error}`);
                }); // GeocoderService.identifyLocation
            }
            else {
                console.log('Location is invalid!');
            }
        };

        var initialize = function() {
            console.log('epaSettingsPageController initializing...');

            if (GeoService.supportsGeo()) {
                $scope.showCurrent = true;
                $scope.loading = true;
                GeoService.getLocation().then(function(location) {
                    $scope.current = location;
                    $scope.loading = false;
                });
            }
            $scope.LocationService = LocationService;
        };
        initialize();
    });

};
