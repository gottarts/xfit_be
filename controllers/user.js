var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    User = require('../models/user').User;

var privateKey = Config.key.privateKey;

exports.create = {
    auth: false,
    validate: {
        payload: {
            userName: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        request.payload.password = Common.encrypt(request.payload.password);
        request.payload.scope = "User";
        request.payload.isVerified = true;
        User.saveUser(request.payload, function (err, user) {
            //console.log(err);
            if (!err) {
                var tokenData = {
                    userName: user.userName,
                    scope: [user.scope],
                    id: user._id,
                    isVerified: true
                };
                // Common.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
                // reply("Please confirm your email id by clicking on link in email");
                reply(Jwt.sign(tokenData, privateKey));
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"));
                } else reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};

exports.login = {
    auth: false,
    validate: {
        payload: {
            userName: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        User.findUser(request.payload.userName, function (err, user) {
            if (!err) {
                if (user === null) return reply(Boom.forbidden("invalid username or password"));
                if (request.payload.password === Common.decrypt(user.password)) {

                    if (!user.isVerified) return reply("Your email address is not verified. please verify your email address to proceed");

                    var tokenData = {
                        userName: user.userName,
                        scope: [user.scope],
                        id: user._id
                    };
                    var res = {
                        id: user._id,
                        username: user.userName,
                        scope: user.scope,
                        token: Jwt.sign(tokenData, privateKey)
                    };

                    reply(res);
                } else reply(Boom.forbidden("invalid username or password"));
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"));
                } else {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
            }
        });
    }
};

exports.profile = {
    auth: 'jwt',
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        console.log(credentials);
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
             if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
             if (credentials.scope[0] != 'User'  && credentials.scope[0] != 'Admin' ) return reply(Boom.unauthorized("Only for users or admins"));
            User.findUserById(request.auth.credentials.id, function (err, user) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                if (user === null) return reply(Boom.forbidden("Non autorizzato"));
                return reply(JSON.stringify(user));
            })
        });
    }
}

// exports.resendVerificationEmail = {
//     validate: {
//         payload: {
//             userName: Joi.string().email().required(),
//             password: Joi.string().required()
//         }
//     },
//     handler: function(request, reply) {
//         User.findUser(request.payload.userName, function(err, user) {
//             if (!err) {
//                 if (user === null) return reply(Boom.forbidden("invalid username or password"));
//                 if (request.payload.password === Common.decrypt(user.password)) {
// 
//                     if(user.isVerified) return reply("your email address is already verified");
// 
//                      var tokenData = {
//                         userName: user.userName,
//                         scope: [user.scope],
//                         id: user._id
//                     };
//                     Common.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
//                     reply("account verification link is sucessfully send to an email id");
//                 } else reply(Boom.forbidden("invalid username or password"));
//             } else {                
//                 console.error(err);
//                 return reply(Boom.badImplementation(err));
//             }
//         });
//     }
// };

// exports.forgotPassword = {
//     validate: {
//         payload: {
//             userName: Joi.string().email().required()
//         }
//     },
//     handler: function (request, reply) {
//         User.findUser(request.payload.userName, function (err, user) {
//             if (!err) {
//                 if (user === null) return reply(Boom.forbidden("invalid username"));
//                 Common.sentMailForgotPassword(user);
//                 reply("password is send to registered email id");
//             } else {
//                 console.error(err);
//                 return reply(Boom.badImplementation(err));
//             }
//         });
//     }
// };

// exports.verifyEmail = {
//     handler: function (request, reply) {
//         Jwt.verify(request.headers.authorization.split(" ")[1], privateKey, function (err, decoded) {
//             if (decoded === undefined) return reply(Boom.forbidden("invalid verification link"));
//             if (decoded.scope[0] != "User") return reply(Boom.forbidden("invalid verification link"));
//             User.findUserByIdAndUserName(decoded.id, decoded.userName, function (err, user) {
//                 if (err) {
//                     console.error(err);
//                     return reply(Boom.badImplementation(err));
//                 }
//                 if (user === null) return reply(Boom.forbidden("invalid verification link"));
//                 if (user.isVerified === true) return reply(Boom.forbidden("account is already verified"));
//                 user.isVerified = true;
//                 User.updateUser(user, function (err, user) {
//                     if (err) {
//                         console.error(err);
//                         return reply(Boom.badImplementation(err));
//                     }
//                     return reply("account sucessfully verified");
// 
//                 })
//             })
// 
//         });
//     }
// };

