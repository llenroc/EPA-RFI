'use strict';

module.exports = function(ngModule) {

    ngModule.config(function($routeProvider) {
        $routeProvider
        .when('/', {
             controller: 'epaMainPageController',
            templateUrl: 'modules/pages/epaMainPageTemplate.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

};
