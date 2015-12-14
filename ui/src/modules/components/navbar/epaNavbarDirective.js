'use strict';

module.exports = function(ngModule) {

    ngModule.directive('epaNavbar', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/components/navbar/epaNavbarTemplate.html',
            controller: 'epaNavbarController'
        };
    });
};
