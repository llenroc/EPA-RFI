'use strict';

module.exports = function(ngModule) {

    ngModule.controller('epaNavbarController', function($scope, $location) {

        $scope.indexVisible = false;

        $scope.toggleIndex = function() {
            $scope.indexVisible = !$scope.indexVisible;
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
