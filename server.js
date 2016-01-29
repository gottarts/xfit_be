'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const Config = require('./config');
const Routes = require('./routes');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: Config.server.port
});

// Register bell and hapi-auth-cookie with the server
server.register([require('hapi-auth-cookie'), require('bell')], function (err) {

    //Setup the session strategy
    server.auth.strategy('session', 'cookie', {
        password: 'secret_cookie_encryption_password', //Use something more secure in production
        redirectTo: '/login/twitter', //If there is no session, redirect here
        isSecure: false //Should be set to true (which is the default) in production
    });

    //Setup the social Twitter login strategy
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: Config.twitter.password, //Use something more secure in production
        clientId: Config.twitter.clientId,
        clientSecret: Config.twitter.clientSecret,
        isSecure: Config.twitter.isSecure //Should be set to true (which is the default) in production
    });

    server.route(Routes.endpoints);

    //Setup the routes (this could be done in an own file but for the sake of simplicity isn't)
    //     server.route({
    //         method: 'GET',
    //         path: '/auth/twitter',
    //         config: {
    //             auth: 'twitter', //<-- use our twitter strategy and let bell take over
    //             handler: function (request, reply) {
    // 
    //                 if (!request.auth.isAuthenticated) {
    //                     return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
    //                 }
    // 
    //                 //Just store the third party credentials in the session as an example. You could do something
    //                 //more useful here - like loading or setting up an account (social signup).
    //                 request.cookieAuth.set(request.auth.credentials);
    // 
    //                 return reply.redirect('/');
    //             }
    //         }
    //     });

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     config: {
    //         auth: 'session', //<-- require a session for this, so we have access to the twitter profile
    //         handler: function (request, reply) {
    //             if (!request.auth.isAuthenticated){
    //                 return reply('Hello not authenticated');
    //             }
    //             //ELSE Return a message using the information from the session
    //             return reply(request.auth.credentials.profile);
    //         }
    //     }
    // });
        
    // This route does not require the user to be logged in.  
    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     config: {
    //         handler: function homePageHandler(request, reply) {
    //             return reply('Home Page');
    //         }
    //     }
    // });

    //     server.route({
    //         method: ['GET', 'POST'], // Must handle both GET and POST
    //         path: '/login',          // The callback endpoint registered with the provider
    //         config: {
    //             auth: 'twitter',
    //             handler: function (request, reply) {
    // 
    //                 if (!request.auth.isAuthenticated) {
    //                     return reply('Authentication failed due to: ' + request.auth.error.message);
    //                 }
    // 
    //                 // Perform any account lookup or registration, setup local session,
    //                 // and redirect to the application. The third-party credentials are
    //                 // stored in request.auth.credentials. Any query parameters from
    //                 // the initial request are passed back via request.auth.credentials.query.
    //                 return reply.redirect('/');
    //             }
    //         }
    //     });
        
    // This route is used to the logout the user.  This will **not**  
    // logout the user from the provider they used to login.  
    //     server.route({
    //         method: 'GET',
    //         path: '/logout',
    //         config: {
    //             handler: function logoutHandler(request, reply) {
    //                 // Clear the cookie
    //                 request.cookieAuth.clear();
    // 
    //                 return reply.redirect('/');
    //             }
    //         }
    //     });

    // Start the server
    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});