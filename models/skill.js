var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Skill = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
});


Skill.statics.saveSkill = function (requestData, callback) {
    this.create(requestData, callback);
};

Skill.statics.updateSkill = function (user, callback) {
    user.save(callback);
};

Skill.statics.findSkillByName = function (name, callback) {
    this.findOne({
        Name: name
    }, callback);
};

Skill.statics.findSkillById = function (id, callback) {
    this.findOne({
        _id: id
    }, callback);
};

var skill = mongoose.model('Skill', Skill);

/** export schema */
module.exports = {
    Skill: skill
};