'use strict';

describe('StoredLocationsService', function() {

    var StoredLocationsService;

    beforeEach(module('epa'));
    beforeEach(inject(function(_StoredLocationsService_) {
        StoredLocationsService = _StoredLocationsService_;
    }));

    it('should add and remove locations', function() {
        var locations = StoredLocationsService.getLocations();
        expect(locations.length).toBe(0);
        var zip = 12345;
        StoredLocationsService.storeLocation({
            name: 'TEST',
            zip: zip
        });
        locations = StoredLocationsService.getLocations();
        expect(locations.length).toBe(1);
        expect(locations[0].zip).toBe(zip);
        StoredLocationsService.removeLocation(zip);
        locations = StoredLocationsService.getLocations();
        expect(locations.length).toBe(0);
    });

    it('should set active location correctly', function() {
        var beverlyHills = {
            name: 'Beverly Hills',
            zip: 90210
        };
        var lasVegas = {
            name: 'Las Vegas',
            zip: 89109
        }
        StoredLocationsService.storeLocation(beverlyHills);
        StoredLocationsService.storeLocation(lasVegas);
        StoredLocationsService.setActiveLocation(beverlyHills);
        var activeLocation = StoredLocationsService.getActiveLocation();
        expect(activeLocation.name).toBe(beverlyHills.name);
        expect(activeLocation.zip).toBe(beverlyHills.zip);
    });

});
