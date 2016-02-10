var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ActivitySchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    date: { type: Date },
    workout: { type: Schema.ObjectId, ref: 'Workout'}
});

var Activity = mongoose.model('UserActivity', ActivitySchema);

module.exports = {
    UserActivity: Activity
};