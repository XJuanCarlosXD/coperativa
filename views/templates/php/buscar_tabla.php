<?php
$cedula=$_POST['cedula'];
$salida="";
include '../php/conexion.php';
$consu="SELECT * FROM `registro` LIMIT 6";
$resu=$conexion->query($consu);
$salida.="
<table id='tabla_cedula' class='table table-striped table-bordered' style='width:100%'>
<thead>
<tr>
    <th scope='col'> Cedulas </th>
    <th scope='col'> Nombre</th>
    <th scope='col'> Ultimo Ahorro </th>
    <th scope='col'> Buscar </th>
  </tr>
</thead>";
if($cedula<=0){
  while($row=$resu->fetch_assoc()){
$salida.="
<tbody>
  <tr>
    <td>".utf8_decode($row['cedula'])."</td>
    <td>".$row['nombre']." ".$row['apellido']."</td>
    <td>".utf8_decode($row['fecha_entrada'])."</td>
    <td><span class='text-dark'><a class='btn btn-secondary' href='buscar.php?id=".$row['id']."'><i class='fa fa-search'></i></a></span></td>
    
  </tr>
</tbody>";
}
}
else{
$consu="SELECT * FROM `registro` WHERE cedula LIKE '$cedula%' ORDER BY cedula DESC LIMIT 6 ";
$resutado=$conexion->query($consu);
while($row=$resutado->fetch_assoc()){
$salida.="
<tbody>
  <tr>
  <td>".utf8_decode($row['cedula'])."</td>
  <td>".$row['nombre']." ".$row['apellido']."</td>
  <td>".utf8_decode($row['fecha_entrada'])."</td>
  <td><span class='text-dark'><a class='btn btn-secondary' href='buscar.php?id=".$row['id']."'><i class='fa fa-search'></i></a></span></td>
  </tr>
</tbody>";
}
}
echo $salida;