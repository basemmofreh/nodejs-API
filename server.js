const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


// app.use((req,res)=>{
//   res.render('maintainance.hbs');
// })
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
return  'the year in which created'+new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log+'\n');
next();
})



app.get('/',function(req,res){
  res.render('home.hbs',{
    pageName:'Welcome this is basem mofre portfoilo',
  });

});

app.get('/about',function(req,res){
  res.render('about.hbs',{
    pageName: "please don't for get the meeting tomorrow 10am"
  })
});


app.listen(port,function(){
  console.log(`server is up and running ${port}`);
})
