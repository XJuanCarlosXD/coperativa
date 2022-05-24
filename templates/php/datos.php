<?php
if (isset($_GET['id'])) {
  $id = $_GET['id'];

  include '../php/conexion.php';
  $sql = "SELECT * FROM registro WHERE id='$id'";
  $resurt = $conexion->query($sql);
  while ($row = $resurt->fetch_assoc()) {

    $nombre = $row['nombre'];
    $apellido = $row['apellido'];
    $cedula = $row['cedula'];
    $correo = $row['correo'];
    $celular = $row['celular'];
    $telefono = $row['telefono'];
  }
  $ql = "SELECT SUM(IF(id_trasaccion=1,monto,0))AS aporte,SUM(IF(id_trasaccion=2,monto,0))AS retirable FROM `trasaciones` WHERE id_cedula='$id'";
  $resu = $conexion->query($ql);
  while ($row = $resu->fetch_assoc()) {
    $aporte = $row['aporte'];
    $aporte_retirable = $row['retirable'];
  }
} elseif (isset($_POST["btn_aporte"])) {
  $id = $_GET['ids'];

  include '../php/conexion.php';
  $sql = "SELECT SUM(monto)AS monto FROM `ingresos` WHERE id_identidad='$id'";
  $sq = "SELECT codigo FROM `ingresos` WHERE id_identidad='$id' AND id_trasaccion =2 ORDER BY codigo DESC LIMIT 1";
  $resultado = mysqli_query($conexion, $sql);
  $resultado1 = mysqli_query($conexion, $sq);
  $retirable = $_POST["tipo_ahorro"];
  $comentario = $_POST["comentario"];
  $fecha = $_POST['fecha'];
  $monto_1 = intval(preg_replace('/[^0-9]+/', '', $_POST["monto_1"]), 10);
  $monto_2 = intval(preg_replace('/[^0-9]+/', '', $_POST["monto_2"]), 10);

  if ($_POST["retirable"] == 4) {
    while ($row = mysqli_fetch_array($resultado)) {
      $balance = $row['monto'] + $monto_2;
    }
    $insert = mysqli_query($conexion, "INSERT INTO ingresos (id_identidad,id_trasaccion,tipo_ahorro,monto,comentario,fecha,cuenta,balance) VALUES('$id','1','$retirable','$monto_2','$comentario','$fecha','1','$balance')");
  } elseif ($_POST["retirable"] == 3 or 2 or 1) {
    while ($row = mysqli_fetch_array($resultado)) {
      $balance = $row['monto'] + $_POST["monto_2"];
    }
    $insert = mysqli_query($conexion, "INSERT INTO ingresos (id_identidad,id_trasaccion,tipo_ahorro,monto,comentario,fecha,cuenta,balance) VALUES('$id','1','$retirable','$monto_1','$comentario','$fecha','1','$balance')");
    $sql1 = mysqli_query($conexion, "SELECT SUM(monto)AS monto FROM `ingresos` WHERE id_identidad='$id'");
    while ($row = mysqli_fetch_array($sql1)) {
      $balance = $row['monto'] + $monto_2;
    }
    $insert = mysqli_query($conexion, "INSERT INTO ingresos (id_identidad,id_trasaccion,tipo_ahorro,monto,comentario,fecha,cuenta,balance) VALUES('$id','2','$retirable','$monto_2','$comentario','$fecha','2','$balance')");
  }
  if (!isset($insert)) {
    echo "<script>alert('Ha occurido un error Nose pudo completar la Trasaccion')</script>";
  }
  header('Location:' . getenv('HTTP_REFERER'));
} elseif (isset($_POST['btn_inscripcion'])) {
  $id = $_GET['ids'];
  include '../php/conexion.php';
  $insert = mysqli_query($conexion, "INSERT INTO ingresos(id_identidad,id_trasaccion,tipo_ahorro,monto,comentario,fecha,cuenta,balance) VALUES('$id','3','5','500','Cuota de inscripcion a la Cooperativa','$horaf','2','500')");
  header('Location:' . getenv('HTTP_REFERER'));
}
