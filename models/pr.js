var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PrSchema = new Schema({
    user : {type: Schema.ObjectId, ref: 'User'},
    skill : {type: Schema.ObjectId, ref: 'Skill'},
    value: Number,
    measure: {type: String, enum: ['Kg'], default: 'Kg'},
    earned : { type : Date, default: Date.now }
});

// Metodi

PrSchema.statics.savePr = function (requestData, callback) {
    this.create(requestData, callback);
}

PrSchema.statics.updatePr = function (user, callback) {
    user.save(callback);
};

PrSchema.statics.findPrByName = function (name, callback) {
    this.findOne({
        Name: name
    }, callback);
};

PrSchema.statics.findPrById = function (id, callback) {
    this.findOne({
        _id: id
    }, callback);
};

var Pr = mongoose.model('UserSkill', PrSchema);

/** export schema */
module.exports = {
    UserSkill: Pr
};