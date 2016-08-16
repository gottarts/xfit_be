var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var NewsSchema = new Schema({
    newsCategories: [{ type : Schema.ObjectId, ref: 'NewsCategory' }],
    title: {type: String, unique: false, required: true},
    url: {type: String, unique: true, required: true},
    excerpt: {type: String, unique: false, required: true},
    image: {type: String, unique: false, default: 'default_news.png'},
    locale: {type: String, unique: false, default: 'en_EN'}
});

// Metodi

NewsSchema.statics.saveNews = function (news, callback) {
    this.create(news, callback);
};


NewsSchema.statics.findNewsByCategory = function (cat, callback) {
    this.findOne({
        newsCategories: mongoose.Types.ObjectId(cat)
    }, callback);
};

NewsSchema.statics.findNewsById = function (id, callback) {
    this.findOne({
        _id: id
    }, callback);
};

NewsSchema.statics.findNewsByMultipleCategories = function (ids, callback) {
    
    this.find({
        _id: {$in: ids}
    }, callback);
};

var news = mongoose.model('News', NewsSchema);

/** export schema */
module.exports = {
    News: news
};