var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String,  required: true },
    scope: { type: String, enum: ['User', 'Admin'], required: true},
    isVerified: { type: Boolean, default: false},
    username: { type: String, unique: true, required: false},
    picture: { type: String, require: false, default: "default_pic.png"}
});

User.statics.saveUser = function (requestData, callback) {
    this.create(requestData, callback);
};

User.statics.updateUser = function (user, callback) {
    user.save(callback);
};

User.statics.findUser = function (email, callback) {
    this.findOne({
        email: email
    }, callback);
};

User.statics.findUserById = function (id, callback) {
    this.findOne({
        _id: id
    }, callback);
};

var user = mongoose.model('User', User);

/** export schema */
module.exports = {
    User: user
};