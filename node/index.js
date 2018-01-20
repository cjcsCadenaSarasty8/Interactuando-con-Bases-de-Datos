var express = require('express');
var body_parser = require('body-parser');
var path = require("path");
var app = express();


app.use(express.static("client"));
app.use(body_parser.urlencoded({extended:true}));

app.post("/login",function(req,res){
  var user=req.body.user || '';
  var pass=req.body.pass || '';
  res.end(user+" "+pass);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
