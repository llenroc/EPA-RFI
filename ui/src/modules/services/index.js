'use strict';

module.exports = function(ngModule) {
    require('./AirQualityService')(ngModule);
    require('./GeocoderService')(ngModule);
    require('./GeoService')(ngModule);
    require('./LocalStorageService')(ngModule);
    require('./StoredLocationsService')(ngModule);
};
