var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/examen');
var Schema = mongoose.Schema;
var child = new Schema({ name: String });
var userSchemaJson={
  email:String,
  password:String
};
var userSchema=new Schema(userSchemaJson);
var UserModelo=mongoose.model("User",userSchema);
var app = express();


app.use(express.static("client"));
app.use(body_parser.urlencoded({extended:true}));

app.post("/login",function(req,res){
  var user=req.body.user || '';
  var pass=req.body.pass || '';
  UserModelo.findOne({email:user}).exec(function(err,docs){
    if(docs!=null){
      if(pass.search(docs.password)!=-1){
      res.end("Validado");
      }else{
          res.end("Usuario o contraseña incorrecta");
      }
    }else{
      res.end("Usuario o contraseña incorrecta");
    }
  })
//  res.end(user+" "+pass);
})

app.listen(3000, function () {
  console.log('Escuchando por el puerto 3000');
  CrearUsuarios("cjcs@dominio.com","123456");
});


function CrearUsuarios(user,pass){
  UserModelo.findOne({email:user}).exec(function(err,docs){
    if(docs==null){
      var usuario=new UserModelo({email:user,password:pass});
      usuario.save();
    }
  });
}


function DesconectarBase(){
  mongoose.disconnect();
  module.exports=mongoose;
}
