'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaSettingsPageController', function($scope, AirQualityService, GeocoderService, GeoService, StoredLocationsService) {

        $scope.locations = [];
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

        var refreshLocations = function() {
            $scope.locations = StoredLocationsService.getLocations();
        };

        var refreshActive = function() {
            $scope.active = StoredLocationsService.getActiveLocation();
            console.log('Active set to: ' + JSON.stringify($scope.active));
            if ($scope.active.latitude && $scope.active.longitude) {
                AirQualityService.updateAirQuality(
                    $scope.active.latitude,
                    $scope.active.longitude
                );
            }
        };

        $scope.setActiveLocation = function(location) {
            StoredLocationsService.setActiveLocation(location);
            refreshActive();
        };

        $scope.removeLocation = function(location) {
            console.log('Removing stored location ' + location);
            StoredLocationsService.removeLocation(location);
            refreshLocations();
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
                        StoredLocationsService.storeLocation(location);
                        refreshLocations();
                    }
                    else {
                        console.log(`Location is invalid: ${response}`);
                    }
                    },
                    function (error) {
                        console.log(`Error querying Geocoder server: ${error}`);
                    }
                );


            }
            else {
                console.log('Location is invalid!');
            }
        };

        var initialize = function() {
            console.log('epaSettingsPageController initializing...');
            if (GeoService.supportsGeo()) {
                $scope.showCurrent = true;
                GeoService.updateLocation();
            }
            $scope.GeoService = GeoService;
            refreshActive();
            refreshLocations();
        };
        initialize();
    });

};
