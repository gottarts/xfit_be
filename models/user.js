var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db;

autoIncrement.initialize(db);


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

User.plugin(autoIncrement.plugin, {
    model: 'user',
    field: '_id'
});

User.statics.saveUser = function(requestData, callback) {
    this.create(requestData, callback);
};

User.statics.updateUser = function(user, callback) {
    user.save(callback);
};

User.statics.findUser = function(userName, callback) {
    this.findOne({
        userName: userName
    }, callback);
};

User.statics.findUserByIdAndUserName = function(id, userName, callback) {
    this.findOne({
        userName: userName,
        _id: id
    }, callback);
};

var user = mongoose.model('user', User);

/** export schema */
module.exports = {
    User: user
};