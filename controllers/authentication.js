var Joi = require('joi');
var Boom = require('boom');
//var User = require('../models/user');

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
/*exports.login = {
  handler: function (request, reply) {

    // In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
    // Passport and inserted the request and reply variables).
    User.authenticate()(request.payload.email, request.payload.password, function (err, user, passwordError) {

      // There has been an error, do something with it. I just print it to console for demo purposes.
      if (err) {
        console.error(err);
        return reply.redirect('/login');
      }

      // Something went wrong with the login process, could be any of:
      // https://github.com/saintedlama/passport-local-mongoose#error-messages
      if (passwordError) {
        // For now, just show the error and login form
        console.log(passwordError);
        return reply.view('login', {
          errorMessage: passwordError.message,
        });
      }

      // If the authentication failed user will be false. If it's not false, we store the user
      // in our session and redirect the user to the hideout
      if (user) {
        request.auth.session.set(user);
        return reply.redirect('/batmanshideout');
      }

      return reply.redirect('/login');

    });
  }
};
*/

exports.index = {
    auth: 'session', //<-- require a session for this, so we have access to the twitter profile
            handler: function (request, reply) {
                if (!request.auth.isAuthenticated){
                    return reply('Hello not authenticated');
                }
                //ELSE Return a message using the information from the session
                return reply(request.auth.credentials.profile);
            }
};

exports.loginTwitter = {
    auth: 'twitter', //<-- use our twitter strategy and let bell take over
    handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
            return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
        }

        //Just store the third party credentials in the session as an example. You could do something
        //more useful here - like loading or setting up an account (social signup).
        request.cookieAuth.set(request.auth.credentials);

        return reply.redirect('/');
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