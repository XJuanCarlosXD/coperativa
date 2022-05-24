<?php
$id = $_POST['id'];
$fecha1 = $_POST['fecha1'];
$fecha2 = $_POST['fecha2'];
include '../php/conexion.php';
$sql=mysqli_query($conexion, "SELECT * FROM ingresos WHERE date(fecha) BETWEEN '$fecha1' AND '$fecha2' AND id_identidad='$id' ORDER BY id DESC");
$salida = '';
while($row=mysqli_fetch_array($sql)){
$salida .= "
<div class='table-responsive-sm'>
<table class='table table-bordered table-hover'>
<tbody>
<tr class='credito'>
   <td>".date('d/m/Y', strtotime($row['fecha']))."</td>
   <td>AH-".$row['id']."</td>
   <td>".$row['comentario']."</td>
   <td class='text-success'>$ ".number_format($row['monto'],2)."</td>
   <td class='text-danger egreso'>$ 0.00</td>
   <td>$ ".number_format($row['balance'],2)."</td>
</tr>
</tbody>
</table>
</div>
<script>
opciones();
</script>";
}
echo $salida;