'use strict';

module.exports = function(ngModule) {

    ngModule.service('LocationService', function($q, LocalStorageService, GeoService) {
        
        const LS_LOCATIONS_KEY = 'locations';
        const LS_ACTIVE_KEY = 'active';
        const CURRENT = {
            name: 'Current'
        };

        this.activeLocation = LocalStorageService.get(LS_ACTIVE_KEY) || CURRENT;
        this.storedLocations = LocalStorageService.get(LS_LOCATIONS_KEY) || [];

        this.getCurrentLocation = function(shouldSetActive) {
            var deferred = $q.defer();

            var svc = this;
            GeoService.getLocation().then(function(location) {
                if (shouldSetActive) {
                    svc.setActiveLocation(location);
                }
                deferred.resolve(location);
            });

            return deferred.promise;
        };

        this.setActiveLocation = function(location) {
            this.activeLocation = location;
            LocalStorageService.set(LS_ACTIVE_KEY, location);
        };

        this.addLocation = function(location) {
            this.storedLocations.push(location);
            LocalStorageService.set(LS_LOCATIONS_KEY, this.storedLocations);
        };

        this.removeLocation = function(location) {
            var locations = this.storedLocations.filter(function(l) {
                return l.zip !== location.zip;
            });
            this.storedLocations = locations;
            LocalStorageService.set(LS_LOCATIONS_KEY, locations);
        };
    });

};