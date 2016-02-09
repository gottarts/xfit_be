var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PrSchema = new Schema({
    user : {type: Schema.ObjectId, ref: 'User'},
    skill : {type: Schema.ObjectId, ref: 'Skill'},
    value: Number,
    measure: {type: String, enum: ['Kg'], default: 'Kg'},
    earned : { type : Date, default: Date.now }
});

var Pr = mongoose.model('UserSkill', PrSchema);

module.exports = {
    UserSkill: Pr
};