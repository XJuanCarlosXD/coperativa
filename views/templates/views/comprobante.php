 <?php
 
include '../pdf/fpdf.php';

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
    // Logo
    $this->Image('../../views/public/img/logo1.jpg',15,9,55);
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
    $this->Ln(5);
    $this->SetFont('Times','b',10);
    $this->Cell(108);
    $this->Cell(30,10,'RNC: 430-29888-3',0,0,'C');
    $this->Ln(26);
    $this->Cell(80);
    $this->SetFont('Times',''.'',13);
    $this->Cell(30,10,'Comprobante',0,0,'C');
    $this->Ln(15);
}

// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-17);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    $this->Cell(0,10,'Ave. Gustavo Mejia Ricart No. 136 Apto. 3-A, Edificio Covinfa IX. Evaristo Morales. 10130. Distrito Nacional',0,0,'C');
    $this->Ln(3);
    $this->Cell(0,10,'Telefono: 809-350-9268  Email: coopfiduciaria@gmail.com',0,0,'C');
    $this->Ln(5);
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
$pdf->Cell(96,10,'',0,0,'C');
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
$pdf->Cell(75,10,'',0,0,'C');
$pdf->Ln(9);
$pdf->Cell(10);
$pdf->Cell(115,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(10);
$pdf->SetFont('arial','b',11);
$pdf->Cell(96,10,'Dirección',0,0,'l');
$pdf->Ln(2);
$pdf->SetFont('arial','',11);
$pdf->Cell(30);
$pdf->Cell(90,10,'',0,0,'C');
$pdf->Ln(0);
$pdf->Cell(125);
$pdf->Cell(55,10,'',1,0,'l');
$pdf->Ln(-2);
$pdf->Cell(125);
$pdf->SetFont('arial','B',11);
$pdf->Cell(96,10,'',0,0,'l');
$pdf->Ln(2);
$pdf->SetFont('arial','',11);
$pdf->Cell(118);
$pdf->Cell(90,10,'',0,0,'C');
$pdf->Ln(10);

$pdf->Output();


