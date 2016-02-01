var Joi = require('joi');
var Boom = require('boom');
var User = require('../models/user');


exports.callbackTwitter = {
    handler: function (req, res) {
        console.log(req.query)
        res(JSON.stringify(req.query, null, 2))
    }
};

/**
 * Responds to GET /logout and logs out the user
 */
exports.logout = {
    handler: function logoutHandler(request, reply) {
        // Clear the cookie
        request.cookieAuth.clear();

        return reply.redirect('/');
    }
};

/**
 * Responds to POST /register and creates a new user.
 */
exports.register = {
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function (request, reply) {

        // Create a new user, this is the place where you add firstName, lastName etc.
        // Just don't forget to add them to the validator above.
        var newUser = new User({
            email: request.payload.email
        });

        // The register function has been added by passport-local-mongoose and takes as first parameter
        // the user object, as second the password it has to hash and finally a callback with user info.
        User.register(newUser, request.payload.password, function (err, user) {

            // Return error if present
            if (err) {
                return reply(err);
            }

            console.log('registered');
            return reply.redirect('/login');
        });
    }
};