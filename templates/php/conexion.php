<?php 
$host = "localhost";
$email = "root";
$password = "";
$bd = "coperativa";

$conexion = mysqli_connect($host,$email,$password,$bd);

date_default_timezone_set('America/Santo_Domingo');
$hoy=date("Y-m-d");
$horaf=date('Y-m-d h:i:s A');
