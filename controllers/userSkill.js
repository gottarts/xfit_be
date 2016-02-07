var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('jsonwebtoken'),
    UserSkill = require('../models/userSkill');
var privateKey = Config.key.privateKey;

exports.create = {
    auth: 'jwt',
    handler: function (request, reply) {
        var userskill = new UserSkill();
        userskill.save(function (err, us) {
            if (err) {
                return reply(err);
            }
            return reply(us);
        })
    }
}


// 
// {
//             value: request.payload.value,
//             measure: request.payload.measure,
//             user: request.payload.user,
//             skill: request.payload.skill
//         }