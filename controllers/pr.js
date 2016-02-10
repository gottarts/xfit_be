var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    Pr = require('../models/pr').Pr;
var privateKey = Config.key.privateKey;

exports.create = {
    auth: 'jwt',
    validate: {
        payload: {
            value: Joi.number(),
            measure: Joi.string().valid('Kg')
        }
    },
    handler: function (request, reply) {
        var pr = new Pr;
        console.log(request.payload);
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
    auth: 'jwt',
    handler: function(request, reply){
        Pr
        .findOne({ user: request.params.user})
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
