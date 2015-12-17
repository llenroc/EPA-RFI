'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaSettingsPageController', function($scope, StoredLocationsService) {

        var initialize = function() {
            console.log('epaSettingsPageController initializing...');
            
            $scope.locations = StoredLocationsService.getLocations();
        };
        initialize();
    });

};
