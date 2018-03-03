var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tweets = new schema({
    tweet:String,
    date:{type:String , default:new Date()},
    likes:{type:Number,default:0}
});

module.exports = mongoose.model('tweets',tweets);
