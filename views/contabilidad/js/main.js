const contenerdor = document.querySelector("#fila");
const btn_agregar = document.querySelector("#btn_agregar");
const entrada = document.querySelector("#entrada");

let total = 1;
let j = 1;
entrada.addEventListener('click', e => {
  let div = document.createElement('ul');
  div.classList.add("d-flex");
  div.classList.add("flex-row");
  div.id = "row" + j++;
  div.innerHTML = addRow();
  contenerdor.appendChild(div);
});
btn_agregar.addEventListener('click', e => {
  let div = document.createElement('ul');
  div.classList.add("d-flex");
  div.classList.add("flex-row");
  div.id = "row" + j++;
  div.innerHTML = addRow();
  contenerdor.appendChild(div);
});
/**
 * @param {this} e
 */

const eliminar = (e) => {
  const divPadre = e.parentNode;
  contenerdor.removeChild(divPadre);
  UpdateCount();
};
const UpdateCount = () => {
  let divs = contenerdor.children;
  total = 1;
  for (let i = 0; i < divs.length; i++) {
    divs[i].children[0].innerHTML = total++ + '.';
  }
}
function diferencia() {
  const totalC = document.getElementById("total_Credito").value;
  const totalD = document.getElementById("totaDebito").value;
  if (totalC.match(/[0-9]*\.[0-9]*/g) == "" || totalC.match(/[0-9]*\.[0-9]*/g) == null || totalD.match(/[0-9]*\.[0-9]*/g) == "" || totalD.match(/[0-9]*\.[0-9]*/g) == null) {
    w = 0;
    document.getElementById("diferencia").value = currency(w);
  } else {
    let w = parseFloat(totalC.match(/[0-9]*\.[0-9]*/g)) - parseFloat(totalD.match(/[0-9]*\.[0-9]*/g));
    document.getElementById("diferencia").value = currency(w);
  }
};
function credito() {
  var total2 = 0;
  $(".credito").each(function () {
    if (isNaN(parseFloat($(this).val()))) {
      total2 += 0;
    } else {
      total2 += parseFloat($(this).val());
    }
  });
  document.getElementById("total_Credito").value = currency(total2);
}
function debito() {
  var total1 = 0;
  $(".debito").each(function () {
    if (isNaN(parseFloat($(this).val()))) {
      total1 += 0;
    } else {
      total1 += parseFloat($(this).val());
    }
  });
  document.getElementById("totaDebito").value = currency(total1);
}
const currency = function (number) {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(number);
};

function addRow() {
  return '<li>' +
    total++ + '.' +
    '</li>' +
    '<div class="col-md-2">' +
    '<li>' +
    '<small class="text-muted">Numero de Cuenta</small>' +
    '<input type="text" name="cuenta" id="cuenta" autocomplete="off" class="form-control text-center" placeholder="Cuenta">' +
    '</li>' +
    '</div>' +
    '<div class="col-md-3">' +
    '<li>' +
    '<small class="text-muted">Nombre de la Cuenta</small>' +
    '<input type="text" name="nombre" id="nombre" autocomplete="off" class="form-control text-center" placeholder="Nombre de Cuentas" />' +
    '</li>' +
    '</div>' +
    '<li>' +
    '<small class="text-muted">AP</small>' +
    '<input type="checkbox" name="ap" id="ap" autocomplete="off" class="form-control text-center" />' +
    '</li>' +
    '<div class="col-md-2">' +
    '<li>' +
    '<small class="text-muted">Credito</small>' +
    `<input type="number" name="credito" autocomplete="off" onkeyup="credito();" onchange="diferencia(); credito();" class="form-control text-center credito" placeholder="Credito" />` +
    '</li>' +
    '</div>' +
    '<div class="col-md-2">' +
    '<li>' +
    '<small class="text-muted">Debito</small>' +
    `<input type="number" name="debito" autocomplete="off" onkeyup="debito();" onchange="diferencia(); debito();" class="form-control text-center debito" placeholder="Debito" />` +
    ' </li>' +
    '</div>' +
    '<div class="col-md-2" onclick="eliminar(this)">' +
    '<small class="invisible">Debito</small>' +
    '<button class="btn btn-inverse-danger btn-faw btn-sm"><i class="fa fa-times"> Eliminar fila</i></button>' +
    '</div>';
}

window.onload = () => {
  let carga = document.getElementById("loader-page");
  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';
}
window.addEventListener("scroll", function (event) {

  var scroll_y = this.scrollY;

  posicion = scroll_y;
  let logo = document.getElementById("logo");
  if (posicion >= 100.35088348388672) {
    logo.src = "../public/img/logo_2_w.svg";
    logo.style.width = "70px";
    document.getElementById("logo-text").innerHTML = texto();
  } else {
    logo.src = "../public/img/logo_w.svg";
    logo.removeAttribute("style");
    document.getElementById("logo-text").innerHTML = "";

  }
});
function agregar() { //btn_agregar
  document.getElementById("fila").innerHTML = addRow();
}
function texto() {
  return '<p class="navbar-brand d-xl-inline-block text-white" id="logo-text">' +
    '<b>COOPACFI</b>' +
    '</p>';
}