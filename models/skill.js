var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var SkillSchema = new Schema({
    name: { type: String, unique: true, required: true },
    image: {type: String, unique: false, default: 'default_skill.png'}
});

// Metodi

SkillSchema.statics.saveSkill = function (requestData, callback) {
    this.create(requestData, callback);
};

SkillSchema.statics.updateSkill = function (skill, callback) {
    skill.save(callback);
};

SkillSchema.statics.findSkillByName = function (name, callback) {
    this.findOne({
        Name: name
    }, callback);
};

SkillSchema.statics.findSkillById = function (id, callback) {
    this.findOne({
        _id: id
    }, callback);
};

var skill = mongoose.model('Skill', SkillSchema);

/** export schema */
module.exports = {
    Skill: skill
};