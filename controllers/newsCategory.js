var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    NewsCategory = require('../models/newsCategory').NewsCategory;
User = require('../models/user').User;
var privateKey = Config.key.privateKey;

exports.create = {
    tags: ['api', 'NewsCategory'],
    auth: {
        strategy: 'jwt',
        scope: 'Admin'
    },
    validate: {
        payload: {
            name: Joi.string().required(),
            icon: Joi.string(),
            locale: Joi.string()
        }
    },
    handler: function (request, reply) {
        if (request.auth.credentials.scope[0] == 'Admin') {
            NewsCategory.saveNewsCategory(request.payload, function (err, newsCategory) {
                if (!err) {
                    reply(newsCategory);
                } else {
                    reply(Boom.forbidden(err)); // HTTP 403
                }
            });
        } else {
            reply(Boom.unauthorized("Only for admins"));
        }
    }
}

exports.getAllNewsCategory = {
    tags: ['api', 'NewsCategory'],
    auth: 'jwt',
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
            if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
            if (credentials.scope[0] != 'User' && credentials.scope[0] != 'Admin') return reply(Boom.unauthorized("Only for users or admins"));

            NewsCategory.find({}, function (err, newsCategories) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                return reply(newsCategories);
            })
        });
    }
}

exports.getAllNewsCategoryForLocale = {
    tags: ['api', 'NewsCategory'],
    auth: 'jwt',
    validate: {
        params: {
            locale: Joi.string()
        }
    },
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
            if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
            if (credentials.scope[0] != 'User' && credentials.scope[0] != 'Admin') return reply(Boom.unauthorized("Only for users or admins"));

            NewsCategory.find({ locale: request.params.locale }, function (err, newsCategories) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                if (newsCategories.length == 0) {
                    return reply('No categories for selected locale')
                }
                return reply(newsCategories);
            })
        });
    }
}

exports.follow = {
    tags: ['api', 'NewsCategory'],
    auth: {
        strategy: 'jwt'
    },
    validate: {
        payload: {
            user: Joi.string().required(),
            newsCategory: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
            if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
            if (credentials.scope[0] != 'User' && credentials.scope[0] != 'Admin')
                return reply(Boom.unauthorized("Only for users or admins"));

            User.findUserById(request.payload.user, function (err, user) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                if (user === null)
                    return reply(Boom.forbidden("Non autorizzato"));
                if (isUserFollowing(user.newsCategories, request.payload.newsCategory)) {
                    unfollowCategory(user.newsCategories, request.payload.newsCategory);
                } else {
                    user.newsCategories.push(request.payload.newsCategory);
                }

                User.updateUser(user, function (err, user) {
                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(user);
                });
            })
        })
    }
}

function isUserFollowing(arr, value) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
        if (arr[i]._id == value) return true;
    }
    return false;
}

function unfollowCategory(arr, value) {
    for (var i = arr.length; i > 0; i--) {
        if (arr[i-1]._id == value) {
            arr.splice(i-1,1);
        }
    }
}