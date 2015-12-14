'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaNavbarController', function($scope) {

        $scope.toggle = function(flyoutId) {
            console.log(`Toggling ${flyoutId}`);
            if (flyoutId === $scope.activeFlyout) {
                flyoutId = null;
            }
            $scope.activeFlyout = flyoutId;
        };

        var initialize = function() {
            console.log('epaNavbarController initializing...');
        };
        initialize();
    });

};
