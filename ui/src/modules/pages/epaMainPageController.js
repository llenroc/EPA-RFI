'use strict';

var moment = require('moment');


module.exports = function(ngModule) {

    ngModule.controller('epaMainPageController', function($rootScope, $scope, AirQualityService) {

        var initialize = function() {
            console.log('epaMainPageController initializing...');
            AirQualityService.updateAirQuality();

            $scope.date = moment().format('MM/DD/YYYY');
            $scope.AirQualityService = AirQualityService;

        };
        initialize();

    });
};
