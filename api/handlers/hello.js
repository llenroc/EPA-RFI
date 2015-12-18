'use strict';

module.exports = function(request, reply) {
    console.log('hello called');
    reply({ 'api' : 'AIS says hello!' });
};
