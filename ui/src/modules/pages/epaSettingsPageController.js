'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaSettingsPageController', function($scope, StoredLocationsService) {

        $scope.locations = [];

        var isValid = function() {
            if (typeof $scope.inputLocation === 'undefined' || $scope.inputLocation === null) {
                $scope.inputMessage = 'Please enter a Zip Code.';
                return false;
            }

            var zip = parseInt($scope.inputLocation);
            if (isNaN(zip)) {
                $scope.inputMessage = 'Please enter a numeric Zip Code.';
                return false;
            }

            return true;
        };

        $scope.addLocation = function() {

            $scope.inputMessage = '';

            if (isValid()) {
                console.log('Location is valid!');
                var location = {
                    name: 'TestCity, OH',
                    zip: parseInt($scope.inputLocation)
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
            
            $scope.locations = StoredLocationsService.getLocations();
        };
        initialize();
    });

};
