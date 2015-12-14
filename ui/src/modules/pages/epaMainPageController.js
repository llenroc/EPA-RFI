'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaMainPageController', function($scope, SettingsService) {

        var initialize = function() {
            console.log('epaMainPageController initializing...');

            SettingsService.getLocation().then(function(position) {
                if (typeof position !== 'undefined') {
                    $scope.position = position;
                }
                else {
                    // redirect to settings...
                }
            });
        };
        initialize();
    });

};
