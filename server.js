'use strict';

const Hapi = require('hapi');
const Config = require('./config/config');
const Routes = require('./routes');
const Db = require('./config/db').db;

const validate = function (decoded, request, callback) {
    // do your checks to see if the person is valid
    // if (!people[decoded.id]) {
    //   return callback(null, false);
    // }
    // else {
      return callback(null, true);
    //}
};

//App configuration
var app = {};
app.config = Config;
var privateKey = app.config.key.privateKey;
var ttl = app.config.key.tokenExpiry;

var server = new Hapi.Server();
server.connection({ port: app.config.server.port });
        // include our module here ↓↓
server.register(require('hapi-auth-jwt2'), function (err) {

    if(err){
      console.log(err);
    }
    server.auth.strategy('jwt', 'jwt',
    { key: privateKey,          // Never Share your secret key
      validateFunc: validate,            // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });
    server.auth.default('jwt');
    server.route(Routes.endpoints);
});


server.start(function () {
  console.log('Server running at:', server.info.uri);
});

module.exports = server;