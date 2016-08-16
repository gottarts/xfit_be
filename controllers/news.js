var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    News = require('../models/news').News;
var User = require('../models/user').User;
var privateKey = Config.key.privateKey;

exports.create = {
    tags: ['api', 'News'],
    auth: {
        strategy: 'jwt',
        scope: 'Admin'
    },
    validate: {
        payload: {
            newsCategories: Joi.string().required(),
            title: Joi.string().required(),
            url: Joi.string().required(),
            excerpt: Joi.string().required(),
            image: Joi.string().allow(''),
            locale: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        if (request.auth.credentials.scope[0] == 'Admin') {
            News.saveNews(request.payload, function (err, news) {
                if (!err) {
                    reply(news);
                } else {
                    reply(Boom.forbidden(err)); // HTTP 403
                }
            });
        } else {
            reply(Boom.unauthorized("Only for admins"));
        }
    }
}

exports.getNewsByCategory = {
    tags: ['api', 'News'],
    auth: 'jwt',
    validate: {
        params: {
            newsCategory: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
            if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
            if (credentials.scope[0] != 'User' && credentials.scope[0] != 'Admin') return reply(Boom.unauthorized("Only for users or admins"));

            News.findNewsByCategory(newsCategory, function (err, newsCategories) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                return reply(newsCategories);
            })
        });
    }
}

exports.getNewsForUser = {
    tags: ['api', 'News'],
    auth: 'jwt',
    validate: {
        params: {
            user: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
            if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
            if (credentials.scope[0] != 'User' && credentials.scope[0] != 'Admin') return reply(Boom.unauthorized("Only for users or admins"));
            User.findUserById(request.params.user, function (err, user) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                console.log(user.newsCategories);
                var cat = user.newsCategories;
                cat = cat.forEach(function (v) {
                    delete v.name;
                    // delete v.__v;
                    // delete v.locale;
                    // delete v.icon;
                });
                console.log('2: ' + cat);
                News.findNewsByCategory(cat, function (err, news) {
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(news);
                })
            });
        });
    }
}