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

});
