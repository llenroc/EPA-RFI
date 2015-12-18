'use strict';

module.exports = function(ngModule) {

    ngModule.service('StoredLocationsService', function(LocalStorageService) {

        var LS_LOCATIONS_KEY = 'locations';

        this.removeLocation = function(zip) {
            // creates a new array without the matching location and stores it
            // back to local storage.
            var old = this.getLocations();
            var locations = old.filter(function(l) {
                return l.zip !== zip;
            });
            LocalStorageService.set(LS_LOCATIONS_KEY, locations);
        };

        this.storeLocation = function(location) {
            var locations = this.getLocations();
            locations.push(location);
            LocalStorageService.set(LS_LOCATIONS_KEY, locations);
        };

        this.getLocations = function() {
            var locations = LocalStorageService.get(LS_LOCATIONS_KEY);
            if (typeof locations === 'undefined' || locations === null || locations === '') {
                locations = [];
            }
            return locations;
        };

    });

};
