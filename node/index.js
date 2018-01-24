var express = require('express');
var app = express();
var body_parser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/examen');
var Schema = mongoose.Schema;

var IDUsuario="";

//usuario
var userSchemaJson={
  email:String,
  password:String
};
var userSchema=new Schema(userSchemaJson);
var UserModelo=mongoose.model("User",userSchema);

var EventoSchemaJson={
  idUser:String,
  title:String,
  start:String,
  start_hour:String,
  end:String,
  end_hour:String
};
var EventoSchema=new Schema(EventoSchemaJson);
var EventoModelo=mongoose.model("Evento",EventoSchema);


app.use(express.static("client"));
app.use(body_parser.urlencoded({extended:true}));

app.get("/events/all",function(req,res){

  EventoModelo.find().exec(function(err,docs){
    while ($fila = mysqli_fetch_array($Resultado)){
         if(empty($Eventos)){
            $Eventos="[".json_encode(array("id"=> $fila['Id'], "title"=> $fila['Titulo'], "start"=> $fila['FechaInicio']." ". $fila['HoraInicio'], "allDay"=> $fila['DiaCompleto'], "end"=> $fila['FechaFinalizacion']." ".$fila['HoraFinalizacion']));
          }else{
            $Eventos=$Eventos.",".json_encode(array("id"=> $fila['Id'], "title"=> $fila['Titulo'], "start"=> $fila['FechaInicio']." ". $fila['HoraInicio'], "allDay"=> $fila['DiaCompleto'], "end"=> $fila['FechaFinalizacion']." ".$fila['HoraFinalizacion']));
          }
        }
        if(!empty($Eventos)){
          $Eventos=$Eventos."]";
        }
  console.log(docs);
  });

})

app.post("/events/new",function(req,res){
  var titulo=req.body.title || '';
  var start=(req.body.start).split("T") || '';
  var startDate=start[0];
  var startHour=start[1];
  var end=(req.body.end).split("T") || '';
  var endDate=end[0];
  var endHour=end[1];
  var evento=new EventoModelo({
    idUser:IDUsuario,
    title:titulo,
    start:startDate,
    start_hour:startHour,
    end:endDate,
    end_hour:endHour});
    evento.save();
  console.log("titulo: "+titulo+" inicio: "+start+" finalizar: "+end);
})

app.post("/login",function(req,res){
  var user=req.body.user || '';
  var pass=req.body.pass || '';
  UserModelo.findOne({email:user}).exec(function(err,docs){
    if(docs!=null){
      if(pass.search(docs.password)!=-1){
        IDUsuario=docs._id;
      res.end("Validado");
      }else{
          res.end("Usuario o contraseña incorrecta");
      }
    }else{
      res.end("Usuario o contraseña incorrecta");
    }
  })
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
