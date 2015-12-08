'use strict';

module.exports = function(ngModule) {

    ngModule.config(function($routeProvider) {
        $routeProvider
        .when('/', {
             controller: 'eaMainPageController',
            templateUrl: 'modules/pages/eaMainPageTemplate.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

};
