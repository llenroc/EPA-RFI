var config = require('./config');

// Hapi initialization
var Hapi = require('hapi');
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: true
        }
    }
});
server.connection({ port: config.port });

server.route(require('./routes'));

server.start(function() {
    console.log('Node/Hapi running on port ' + server.info.port);
});

module.exports = server;
