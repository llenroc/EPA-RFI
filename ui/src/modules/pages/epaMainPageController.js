'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaMainPageController', function($scope, GeoService) {

        var initialize = function() {
            console.log('epaMainPageController initializing...');
            $scope.GeoService = GeoService;
            GeoService.updateLocation();
        };
        initialize();
    });

};
