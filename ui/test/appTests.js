'use strict';

describe('Test Application Routes', function() {

    beforeEach(module('epa'));

    it('should map urls to controllers', function() {
        inject(function($route) {
            expect($route.routes['/'].controller).toBe('epaMainPageController');
            expect($route.routes['/settings'].controller).toBe('epaSettingsPageController');
        });
    });
});
