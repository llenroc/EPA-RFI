'use strict';

module.exports = function(ngModule) {

    ngModule.service('LocalStorageService', function($window) {

        var localStorage = $window.localStorage;

        this.get = function(key) {
            var str = localStorage.getItem(key);
            return JSON.parse(str);
        };

        this.set = function(key, data) {
            var now = new Date();
            if(!data.created) {
                data.created = now;
            }
            data.updated = now;

            localStorage.setItem(key, JSON.stringify(data));
        };

        this.remove = function(key) {
            localStorage.removeItem(key);
        };
    });

};