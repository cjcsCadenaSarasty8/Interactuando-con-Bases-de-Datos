<?php
  
    include 'conexionBD.php';
    ObtenerEventos();
    function ObtenerEventos(){
       $Eventos="hola";
       IniciarConexion();
       $Consulta="select * from evento where IdUsuario=".$_COOKIE['IdUser']."";
       $Resultado= $GLOBALS['Conexion']->query($Consulta);
       while ($fila = mysqli_fetch_array($Resultado)){
            
        }
       DesactivarConexion();
       echo json_encode(array("msg"=>"OK","eventos"=>$Eventos));
    }
 ?>