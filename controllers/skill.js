var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    Skill = require('../models/skill').Skill;
var privateKey = Config.key.privateKey;

exports.create = {
    tags: ['api', 'Skill'],
    auth:{
        strategy: 'jwt',
        scope: 'Admin'   
    },
    validate: {
        payload: {
            name: Joi.string().required(),
            icon: Joi.string()
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

exports.updateSkill = {
    tags: ['api', 'Skill'],
    auth:{
        strategy: 'jwt',
        scope: 'Admin'   
    },
    validate: {
        payload: {
            id: Joi.string().required(),
            name: Joi.string(),
            icon: Joi.string()
        }
    },
    handler: function (request, reply) {
        Skill.findSkillById(request.payload.id, function (err, skill) {
            if (err) return reply(Boom.badImplementation(err));
            if (skill === null) return reply(Boom.forbidden("Non autorizzato"));
            skill.name = request.payload.name == null ? skill.name : request.payload.name;
            skill.icon = request.payload.icon == null ? skill.icon : request.payload.icon;
            
            Skill.updateSkill(skill, function (err, skill) {
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                return reply(skill);
            });
        })
    }
}

exports.getSkills = {
    tags: ['api', 'Skill'],
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
    tags: ['api', 'Skill'],
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