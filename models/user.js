var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        enum: ['User', 'Admin'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});


User.statics.saveUser = function (requestData, callback) {
    this.create(requestData, callback);
};

User.statics.updateUser = function (user, callback) {
    user.save(callback);
};

User.statics.findUser = function (userName, callback) {
    this.findOne({
        userName: userName
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