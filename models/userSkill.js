var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSkillSchema = new Schema({
    user : {type: Schema.ObjectId, ref: 'User'},
    skill : {type: Schema.ObjectId, ref: 'Skill'},
    value: Number,
    measure: {type: String, enum: ['Kg'], default: 'Kg'}
});

var UserSkill = mongoose.model('UserSkill', UserSkillSchema);

// module.exports = {
//     UserSkill: UserSkill
// };