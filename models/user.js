var Mongoose = require('../database').Mongoose;

//create the schema
var userSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    box:{
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});


//create the model and add it to the exports
module.exports = Mongoose.model('User', userSchema, 'Users');