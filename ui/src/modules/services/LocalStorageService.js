'use strict';

module.exports = function(ngModule) {

    ngModule.service('LocalStorageService', function($window) {

        var localStorage = $window.localStorage;

        this.get = function(key) {
            return localStorage.getItem(key);
        };

        this.set = function(key, data) {
            var now = new Date();
            if(!data.created) {
                data.created = now;
            }
            data.updated = now;

            localStorage.setItem(key, data);
        };

        this.remove = function(key) {
            localStorage.removeItem(key);
        };
    });

};