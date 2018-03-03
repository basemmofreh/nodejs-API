var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var users = new schema({
  user:String,
  password:String,
  mytweets: [{type:ObjectId , ref:'tweets'}]
});

module.exports = mongoose.model('users',users);
