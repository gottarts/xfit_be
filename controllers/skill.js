var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    Skill = require('../models/skill').Skill;
var privateKey = Config.key.privateKey;

exports.create = {
    auth:{
        strategy: 'jwt',
        scope: 'Admin'   
    },
    validate: {
        payload: {
            name: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        if (request.auth.credentials.scope[0] == 'Admin') {
            Skill.saveSkill(request.payload, function (err, skill) {
                if (!err) {
                    reply(skill);
                } else {
                    reply(Boom.forbidden(err)); // HTTP 403
                }
            });
        } else {
            reply(Boom.unauthorized("Only for admins"));
        }
    }
}

exports.getSkills = {
    auth: 'jwt',
    handler: function (request, reply) {
        var credentials = request.auth.credentials;
        Jwt.verify(request.auth.token.split(" ")[1], privateKey, function (err, decoded) {
            if (credentials === undefined) return reply(Boom.forbidden("Non autorizzato"));
            if (credentials.scope[0] != 'User' && credentials.scope[0] != 'Admin') return reply(Boom.unauthorized("Only for users or admins"));
            
            Skill.find({}, function (err, skills) {
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                return reply(skills);
            })
        });
    }
}

exports.getSkill = {
    auth: 'jwt',
    handler: function(request, reply){
        if (request.auth.credentials.scope[0] == 'Admin') {
            Skill.findSkillById(request.params.skillId, function(err, skill){
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                return reply(skill);
            })
        } else {
            reply(Boom.unauthorized("Only for admins"));
        }
    }
}