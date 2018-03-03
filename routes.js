var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Tweet = require('./modules/tweets');
var app = express();
var User = require('./modules/users');


router.get('/',function(req,res){
  res.status(200).send("Facebook api is live");
});


//show users
router.get('/users',function(req,res){
  User.find({}).populate({path:'mytweets',model:'tweets'}).exec(function(err,tweets){
    if(err)
    res.status(500).send("couldn't fetch users");
    else {
        res.status(200).send(tweets);
    }
  })

});
//login
router.post('/login',function(req,res){
  var login = req.body;
  User.findOne({user:login.username},function(err,found){
      if(err||!found)
      {
      res.status(500).send("sorry it doesn't exist");
      }
      else {
        if(found.password==login.password)
          {


            if(login.tweet==""||!login.tweet)
              res.status(200).send("logged in!");
            else{
            var founduser = found._id
           var tweet = new Tweet({tweet:login.tweet});
             tweet.save(function(err,savedTweet){
               if(err)
                res.status(500).send("couldn't save tweet");
               else {

                 User.update({_id:founduser},{$addToSet : { mytweets:savedTweet._id}},function(err,twitted){
                   if(err)
                      res.status(500).send("couldn't add tweet");
                   else {
                       res.status(200).send(twitted);
                   }
                 })



               }
             })
            // res.status(200).send("logged in !");
          }
          }
        else {
            res.status(404).send("invalid password");

        }
      }
  });
})
//register
router.post('/users',function(req,res){
  var user = new User({user:req.body.username,password:req.body.password});
  user.save(function(err,savedItem){
    if(err)
      {
        res.status(500).send(err);
      }
    else {
      {
        res.status(200).send(savedItem);
      }
    }
  })
});

module.exports = router;
