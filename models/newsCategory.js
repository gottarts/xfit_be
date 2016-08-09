var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var NewsCategorySchema = new Schema({
    name: {type: String, unique: true, required: true},
    icon: {type: String, unique: false, default: '../static/icons/food.png'},
    locale: {type: String, unique: false, default: 'en_EN'}
});

// Metodi

NewsCategorySchema.statics.saveNewsCategory = function (requestData, callback) {
    this.create(requestData, callback);
};


NewsCategorySchema.statics.findNewsCategoryByName = function (name, callback) {
    this.findOne({
        Name: name
    }, callback);
};

NewsCategorySchema.statics.findNewsCategoryById = function (id, callback) {
    this.findOne({
        _id: id
    }, callback);
};

var newsCategory = mongoose.model('NewsCategory', NewsCategorySchema);

/** export schema */
module.exports = {
    NewsCategory: newsCategory
};