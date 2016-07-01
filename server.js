'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
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

const swaggerOptions = {
    info: {
        version: Pack.version,
        title: 'XFit',
        description: 'This web API was built to demonstrate some of the hapi features and functionality.'
    },
    tags: [{
        'name': 'Auth',
        'description': 'Metodi di autenticazione'
        
    }, {
        'name': 'User',
        'description': 'Metodi degli utenti'
        
    }]
};

const goodOptions = {
  ops: {
        interval: 1000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
};

// include our module here ↓↓
server.register([require('hapi-auth-jwt2'),
  Vision,
  Inert,
  {
    'register': HapiSwagger,
    'options': swaggerOptions
  },
  {
    register: require('good'),
    'options': goodOptions
  }], function (err) {
    if (err) {
      console.log(err);
    }
    server.auth.strategy('jwt', 'jwt',
      {
        key: privateKey,          // Never Share your secret key
        validateFunc: validate,            // validate function defined above
        verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
      });
    server.auth.default('jwt');
    server.route(Routes.endpoints);
  });


server.start(function () {
  console.log('Server running at:', server.info.uri);
  console.log('Process ENV Port:', process.env.port);
});


module.exports = server;