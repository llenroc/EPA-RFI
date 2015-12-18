'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaSettingsPageController', function($scope, GeoService, StoredLocationsService) {

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

        $scope.removeLocation = function(zip) {
            console.log('Removing stored location ' + zip);
            StoredLocationsService.removeLocation(zip);
            $scope.locations = StoredLocationsService.getLocations();
        };

        $scope.addLocation = function() {
            $scope.inputMessage = '';

            if (isValid()) {
                var location = {
                    name: 'TestCity, OH',
                    zip: parseZipCode()
                };
                StoredLocationsService.storeLocation(location);
                $scope.locations = StoredLocationsService.getLocations();
            }
            else {
                console.log('Location is invalid!');
            }
        };

        var initialize = function() {
            console.log('epaSettingsPageController initializing...');
            if (GeoService.supportsGeo()) {
                $scope.showCurrent = true;
            }
            $scope.locations = StoredLocationsService.getLocations();
        };
        initialize();
    });

};
