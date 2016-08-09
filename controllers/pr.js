var Joi = require('joi'),
    mongoose = require('mongoose'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    Pr = require('../models/pr').UserSkill;
var privateKey = Config.key.privateKey;

exports.create = {
    tags: ['api', 'Pr'],
    auth: 'jwt',
    validate: {
        payload: {
            user: Joi.string().required(),
            skill: Joi.string().required(),
            value: Joi.number().required(),
            measure: Joi.string().valid('Kg')
        }
    },
    handler: function (request, reply) {
        var pr = new Pr();

        pr.user = request.payload.user;
        pr.skill = request.payload.skill;
        pr.value = request.payload.value;
        pr.measure = request.payload.measure;
        pr.save(function (err, us) {
            if (err) {
                return reply(err);
            }
            return reply(us);
        })
    }
}

exports.getAllSkillsForUser = {
    tags: ['api', 'Pr'],
    auth: 'jwt',
    validate: {
        query: {
            user: Joi.string().required()
        }
    },
    handler: function(request, reply){
        Pr
        .find({ user: request.query.user})
        .populate('user skill')
        .exec(function(err, us){
           if (err) {
               reply(err);
           } else {
               reply(us);
           } 
        });
    }
}

exports.getSkillForUser = {
    tags: ['api', 'Pr'],
    auth: 'jwt',
    validate: {
        query: {
            user: Joi.string().required(),
            skill: Joi.string().required()
        }
    },
    handler: function(request, reply){
        console.log(request.query);
        //console.log(request.query.user.toObjectId());
        Pr
        .find({ user: request.query.user.toObjectId()})
        .where({skill: request.query.skill.toObjectId()})
        .populate('user skill')
        .exec(function(err, us){
           if (err) {
               reply(err);
           } else {
                reply(us);
           } 
        });
    }
}



