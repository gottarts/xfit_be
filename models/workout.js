var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var WorkoutSchema = new Schema({
    name : {type: String},
    type : {type: String, enum : ['Wod', 'Strenght']},
    description : {type: String}
});

var Wo = mongoose.model('Workout', WorkoutSchema);

module.exports = {
    UserSkill: Wo
};