'use strict';

describe('LocationService', function() {

    var LocationService;

    beforeEach(module('epa'));
    beforeEach(inject(function(_LocationService_) {
        LocationService = _LocationService_;
    }));

    it('should add and remove locations', function() {
        expect(LocationService.storedLocations.length).toBe(0);
        var fixture = {
            name: 'TEST',
            zip: 12345
        };
        LocationService.addLocation(fixture);
        expect(LocationService.storedLocations.length).toBe(1);
        expect(LocationService.storedLocations[0].zip).toBe(fixture.zip);
        LocationService.removeLocation(fixture);
        expect(LocationService.storedLocations.length).toBe(0);
    });

    it('should set active location correctly', function() {
        var beverlyHills = {
            name: 'Beverly Hills',
            zip: 90210
        };
        var lasVegas = {
            name: 'Las Vegas',
            zip: 89109
        };
        LocationService.addLocation(beverlyHills);
        LocationService.addLocation(lasVegas);
        LocationService.setActiveLocation(beverlyHills);
        expect(LocationService.activeLocation.name).toBe(beverlyHills.name);
        expect(LocationService.activeLocation.zip).toBe(beverlyHills.zip);
    });
});
