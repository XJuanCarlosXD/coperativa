 <?php
 $nombre=$_POST['nombre'];
 $apellido=$_POST['apellido'];
$correo=$_POST['correo'];
$fecha_n=$_POST['fecha_n'];
if($_POST['estado']==1){$estado="Soltero";}
elseif($_POST['estado']==2){$estado="Casado";}
  elseif($_POST['estado']==3){$estado="Divorciado";}
$profecion=$_POST['profeccion'];
$telefono=$_POST['telefono'];
$celular=$_POST['celular'];
if($_POST['id_identidad']==1){$identidad="Pasaporte";}
  elseif($_POST['id_identidad']==2){$identidad="RNC";}
  elseif($_POST['id_identidad']==3){$identidad="Cedula";}
$identificacion=$_POST['cedula'];
$genero=$_POST['genero'];
$cuota=$_POST['cuotas'];

$direccion=$_POST['direccion'];
$ciudad=$_POST['ciudad'];
$sector=$_POST['sector'];
$pais=$_POST['pais'];
$nacionalidad=$_POST['nacionalidad'];

$empresa=$_POST['empresa'];
$puesto=$_POST['puesto'];
$tiempo=$_POST['tiempo'];
$salario=$_POST['salario'];

if($_POST['pose']==1){
$banco=$_POST['banco'];
$no_cuenta=$_POST['no_cuenta'];}
elseif($_POST['pose']==2){$banco="No pose"; $no_cuenta="No pose";}
if(isset($nombre)){
  include '../../../templates/php/conexion.php';
  $insert=mysqli_query($conexion,"INSERT INTO registro VALUES('','$identidad','$identificacion','$nombre','$apellido','$correo','$telefono','$celular','$estado','$fecha_n','$direccion','$sector','$ciudad','$nacionalidad','$pais','$profecion','$hoy','$empresa','$puesto','$tiempo','$salario','$banco','$no_cuenta','$cuota','$genero')");

 
/*include '../pdf/fpdf.php';

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
    // Logo
    $this->Image('../img/logo1.jpg',15,9,55);
    // Arial bold 15
    $this->Ln(12);
    $this->SetFont('Times',''.'',13);
    $this->Cell(110);
    $this->Cell(30,10,'COOPERATIVA DE AHORROS, CREDITOS Y SERVICIOS',0,0,'C');
    $this->Ln(5);
    $this->Cell(108);
    $this->Cell(30,10,'MULTIPLES LA FIDUCIARIA',0,0,'C');
    $this->Ln(5);
    $this->Cell(108);
    $this->Cell(30,10,'(COOPACFI)',0,0,'C');
    $this->Ln(26);
    $this->Cell(80);
    $this->SetFont('Times',''.'',13);
    $this->Cell(30,10,'Solicitud de Ingreso',0,0,'C');
    $this->Ln(15);
}

// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,'Pagina '.$this->PageNo().'/1',0,0,'C');
}
}

$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont('arial','b',11);
$pdf->Cell(100);
$pdf->Cell(80,6,'Fecha',1,0,'l');
$pdf->Ln(0);
$pdf->SetFont('arial','',11);
$pdf->Cell(130);
include '../php/conexion.php';
$pdf->Cell(80,6,date('d/m/Y',strtotime($hoy)),0,0,'l');
mysqli_close($conexion);
$pdf->Ln(6);
$pdf->SetFont('arial','b',11);
$pdf->Cell(10);
$pdf->Cell(170,6,'Datos Personales',1,0,'l');
$pdf->Ln(6);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(96,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Nombres',0,0,'l');
$pdf->Ln(3);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(96,10,utf8_decode($nombre),0,0,'C');
$pdf->Ln(-1);
$pdf->Cell(106);
$pdf->Cell(74,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(106);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Apellidos',0,0,'l');
$pdf->Ln(3);
$pdf->SetFont('arial','',11);
$pdf->Cell(106);
$pdf->Cell(75,10,utf8_decode($apellido),0,0,'C');
$pdf->Ln(9);
$pdf->Cell(10);
$pdf->Cell(115,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Dirección'),0,0,'l');
$pdf->Ln(2);
$pdf->SetFont('arial','',11);
$pdf->Cell(30);
$pdf->Cell(90,10,utf8_decode($direccion),0,0,'C');
$pdf->Ln(0);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','B',11);
$pdf->Cell(96,10,utf8_decode($identidad),0,0,'l');
$pdf->Ln(2);
$pdf->SetFont('arial','',11);
$pdf->Cell(118);
$pdf->Cell(90,10,utf8_decode($identificacion),0,0,'C');
$pdf->Ln(10);
//ciudad
$pdf->Cell(10);
$pdf->Cell(60,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Sector',0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(60,10,utf8_decode($sector),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(70);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(70);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Ciudad',0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(70);
$pdf->Cell(55,10,utf8_decode($ciudad),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Fecha de Nacimiento',0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(125);
$pdf->Cell(55,10,utf8_decode(date('d/m/Y',strtotime($fecha_n))),0,0,'C');
$pdf->Ln(8);
// direcion
$pdf->Cell(10);
$pdf->Cell(60,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Estado Civil',0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(60,10,utf8_decode($estado),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(70);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(70);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Nacionalidad',0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(70);
$pdf->Cell(55,10,utf8_decode($nacionalidad),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Profesión u Oficio'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(125);
$pdf->Cell(55,10,utf8_decode($profecion),0,0,'C');
$pdf->Ln(8);
//contacto
$pdf->Cell(10);
$pdf->Cell(50,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Celular',0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(50,10,utf8_decode($celular),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(60);
$pdf->Cell(50,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(60);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Teléfono'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(60);
$pdf->Cell(50,10,utf8_decode($telefono),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(110);
$pdf->Cell(70,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(110);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Correo'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(110);
$pdf->Cell(70,10,utf8_decode($correo),0,0,'C');
$pdf->Ln(8);
//datos laborales
$pdf->SetFont('arial','b',11);
$pdf->Cell(10);
$pdf->Cell(170,6,'Datos Laborales',1,0,'l');
$pdf->Ln(8);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(115,10,utf8_decode($empresa),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->Cell(115,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Institución para la que labora'),0,0,'l');
$pdf->Ln(2);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Posición'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(125);
$pdf->Cell(55,10,utf8_decode($puesto),0,0,'C');
$pdf->Ln(8);
//beneficiarios
$pdf->SetFont('arial','b',11);
$pdf->Cell(10);
$pdf->Cell(170,6,'Beneficiarios en caso de fallecimiento',1,0,'l');
$pdf->Ln(8);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(115,10,utf8_decode($beneficiario_1),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->Cell(115,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Nombre'),0,0,'l');
$pdf->Ln(2);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Parentesco'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(125);
$pdf->Cell(55,10,utf8_decode($parentesco_1),0,0,'C');
$pdf->Ln(8);
$pdf->Cell(10);
$pdf->Cell(115,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Nombre'),0,0,'l');
$pdf->Ln(3);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(115,10,utf8_decode($beneficiario_2),0,0,'C');
$pdf->Ln(-1);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Parentesco'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(125);
$pdf->Cell(55,10,utf8_decode($parentesco_2),0,0,'C');
$pdf->Ln(8);
$pdf->Cell(10);
$pdf->Cell(115,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Cuenta Bancaria'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->Cell(115,10,utf8_decode($banco),0,0,'C');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,utf8_decode('Nombre del Banco'),0,0,'l');
$pdf->Ln(4);
$pdf->SetFont('arial','',11);
$pdf->Cell(125);
$pdf->Cell(55,10,utf8_decode($no_cuenta),0,0,'C');
$pdf->Ln(8);
//linea
$pdf->SetFont('arial','',10);
$pdf->Cell(10);
$pdf->Cell(170,20,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->Cell(96,10,utf8_decode('Solicito mi admisión como socio de la COOPERATIVA FAMILIAR DE AHORROS, CREDITOS Y SERVICI-'),0,0,'l');
$pdf->Ln(5);
$pdf->Cell(10);
$pdf->Cell(96,10,utf8_decode('OS MULTIPLES LA FIDUCIARIA (COOPACFI), y me comprometo a ahorrar mensualmente un mínimo de'),0,0,'l');
$pdf->Ln(5);
$pdf->Cell(10);
$pdf->Cell(96,10,utf8_decode('$500.00, a la compra de un certificado de aporte de Capital por un valor de $500.00 y la cuota de inscrip-'),0,0,'l');
$pdf->Ln(5);
$pdf->Cell(10);
$pdf->Cell(96,10,utf8_decode('ción no reembolsable por un valor de $500.00'),0,0,'l');
$pdf->Ln(7);
//firma
$pdf->SetFont('arial','',11);
$pdf->Cell(10);
$pdf->SetFont('arial','b',10);
$pdf->Cell(65,15,'Firma del Solicitante',1,0,'C');
$pdf->Ln(0);
$pdf->Cell(75);
$pdf->Cell(105,15,'',1,0,'l');
$pdf->Ln(3);
$pdf->SetFont('arial','',11);
$pdf->Cell(75);
$pdf->Cell(105,10,utf8_decode($nombre." ".$apellido),0,0,'C');
$pdf->Ln(12);
//ingreso
$pdf->Cell(10);
$pdf->Cell(170,25,'',1,0,'l');
$pdf->Ln(-4);
$pdf->Cell(65);
$pdf->SetFont('arial','',11);
$pdf->Cell(65,15,utf8_decode('Ingreso aprobado por el Consejo de Administración en'),0,0,'C');
$pdf->Ln(6);
$pdf->Cell(65);
$pdf->Cell(65,15,utf8_decode('La Resolución No. _______________'),0,0,'C');
$pdf->Ln(6);
$pdf->Cell(65);
$pdf->Cell(65,15,utf8_decode('D/F _______________'),0,0,'C');
$pdf->Ln(13);
$pdf->SetFont('arial','B',11);
$pdf->Cell(65);
$pdf->Cell(65,15,utf8_decode('Ave. Gustavo Mejía Ricart No. 136. Apto. 3-A. email: coopfiduciaria@gmail.com'),0,0,'C');
$pdf->Ln(0);
$pdf->Output();
*/


}else{
  echo "<script>alert('Error hay datos Vacios')</script>";
  header('Location:' . getenv('HTTP_REFERER'));
}

mysqli_close($conexion);