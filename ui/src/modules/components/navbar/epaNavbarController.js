'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaNavbarController', function($scope, $location) {

        $scope.toggle = function(flyoutId) {
            console.log(`Toggling ${flyoutId}`);
            if (flyoutId === $scope.activeFlyout) {
                flyoutId = null;
            }
            $scope.activeFlyout = flyoutId;
        };

        $scope.isSettingsPage = function() {
            return $location.path() === '/settings';
        };

        var initialize = function() {
            console.log('epaNavbarController initializing...');
        };
        initialize();
    });

};
