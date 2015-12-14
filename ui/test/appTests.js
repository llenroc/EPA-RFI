'use strict';

describe('Test Angular Routes', function() {
    
    beforeEach(module('epa'));
    
    it('should pickup angular routes', function() {
        inject(function($route) {
            expect($route.routes['/'].controller).toBe('epaMainPageController');
        });
    });
});
