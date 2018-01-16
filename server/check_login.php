<?php

    include 'conexionBD.php';
    IniciarSesion();
    function IniciarSesion(){
       $UserName="Robert@msn.com";
       $Password="123456";
       IniciarConexion();
       $Consulta="Select * from usuario where Username='".$UserName."'";
       $Resultado= ($GLOBALS['Conexion']->query($Consulta));
       while ($fila = mysqli_fetch_array($Resultado)){
            if(password_verify($Password,$fila['Password'])){
                echo "Inicio Sesión Resultado: Exitoso";
            }
            else{
                echo "Inicio Sesión Resultado: Fallido";
            }
        }
       
       DesactivarConexion();
    }


 ?>
