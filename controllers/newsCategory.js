var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    NewsCategory = require('../models/newsCategory').NewsCategory;
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

// exports.getSkill = {
//     tags: ['api', 'Skill'],
//     auth: 'jwt',
//     handler: function(request, reply){
//         if (request.auth.credentials.scope[0] == 'Admin') {
//             Skill.findSkillById(request.params.skillId, function(err, skill){
//                 if (err) {
//                     console.error(err);
//                     return reply(Boom.badImplementation(err));
//                 }
//                 return reply(skill);
//             })
//         } else {
//             reply(Boom.unauthorized("Only for admins"));
//         }
//     }
// }