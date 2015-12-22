'use strict';

describe('LocalStorageService', function() {

    var LocalStorageService;

    beforeEach(module('epa'));
    beforeEach(inject(function(_LocalStorageService_) {
        LocalStorageService = _LocalStorageService_;
    }));

    it('should add and retrieve values', function() {
        var obj = {
            id: 5,
            firstName: 'foo',
            lastName: 'bar'
        };
        var key = 'test';
        expect(LocalStorageService.get(key)).toBeNull();
        LocalStorageService.set(key, obj);
        var retrievedValue = LocalStorageService.get(key);
        expect(retrievedValue.id).toBe(5);
        expect(retrievedValue.firstName).toBe('foo');
        expect(retrievedValue.lastName).toBe('bar');
    });

    it('should add created and updated dates', function() {
        var obj = {
            id: 5,
            firstName: 'foo',
            lastName: 'bar'
        };
        var key = 'test';
        LocalStorageService.set(key, obj);
        var retrievedValue = LocalStorageService.get(key);
        expect(retrievedValue.created).toBeDefined();
        expect(retrievedValue.updated).toBeDefined();
    });

});