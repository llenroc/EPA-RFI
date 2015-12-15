'use strict';

module.exports = function(ngModule) {
    require('./AirQualityService')(ngModule);
    require('./GeoService')(ngModule);
};
