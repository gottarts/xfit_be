var Mongoose = require('mongoose'); 
var Config = require('./config');

//Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db + ':' + config.database.port);  
Mongoose.connect('mongodb://' + Config.database.username + ':' + Config.database.password + '@' + Config.database.host + ':' + Config.database.port + '/' + Config.database.db);
//console.log('mongodb://' + Config.database.username + ':' + Config.database.password + '@' + Config.database.host + ':' + Config.database.port + '/' + Config.database.db);
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));  
db.once('open', function callback() {  
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;  
exports.db = db;  
