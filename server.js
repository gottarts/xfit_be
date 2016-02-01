'use strict';

const Hapi = require('hapi');
const yar = require('yar');
const Boom = require('boom');
const Config = require('./config');
const Routes = require('./routes');
const Grant = require('grant-hapi')
const grant = new Grant();

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost', port: 3000
});

server.route(Routes.endpoints);

server.register([
  // REQUIRED:
  {
    register: yar,
    options: {
      cookieOptions: {
        password: 'grant',
        isSecure: false
      }
    }
  },
  // mount grant
  {
    register: grant,
    options: require('./auth.json')
  }
], function (err) {
  if (err) throw err

  server.start();
  console.log('Server running at:', server.info.uri);
})