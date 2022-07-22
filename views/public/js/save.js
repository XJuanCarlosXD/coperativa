const bSubmit = document.querySelector("#btn-ahorro");
const id = document.querySelector("#id").innerHTML;
bSubmit.addEventListener('click', () => {
  let fecha = document.getElementById("fecha").value;
  let monto_1 = document.getElementById("monto_1").value;
  let monto_2 = document.getElementById("monto_2").value;
  let tipo = document.getElementById("tipo").value;
  let metodo = document.getElementById("metodo").value;
  let comentario = document.getElementById("comentario").value;
  let total = parseFloat(monto_1) + parseFloat(monto_2);

  if (tipo == 4 || tipo == 5) {
    if (
      fecha == "" || monto_2 == "" || monto_2 == "NaN" || tipo == 0 || metodo == 0 || comentario == ""
    ) {
      Swal.fire("Campos vacios revise", "", "info");
      stop;
    } else {
      Swal.fire({
        title: "Confirma guardar el registro?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#19d895",
        DenyButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let timerInterval
          Swal.fire({
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              fetch('/save_ahorros/' + id, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ fecha: fecha, monto_2: monto_2, tipo: tipo, metodo: metodo, comentario: comentario })
              }).then(res => res.text()).then(() => {
                document.getElementById("fecha").value = "";
                document.getElementById("monto_1").value = "";
                document.getElementById("monto_2").value = "";
                document.getElementById("tipo").value = 0;
                document.getElementById("metodo").value = 0;
                document.getElementById("comentario").value = "";
              });
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire('Datos Guardado con exito', '', 'success').then((result) => {
                if (result.dismiss) {
                  document.querySelector("#histo").click();
                }
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Cambios no Guardados", "", "info");
        }
      });
    }
  } else {
    if (
      fecha == "" || monto_1 == "" || monto_2 == "" || monto_1 == "NaN" || monto_2 == "NaN" || tipo == 0 || metodo == 0 || comentario.trim() == ""
    ) {
      Swal.fire("Campos vacios revise", "", "info");
      stop;
    } else {
      if (monto_2 == total * 0.3) {
        Swal.fire({
          title: "Confirma guardar el registro?",
          icon: "warning",
          showDenyButton: true,
          confirmButtonColor: "#19d895",
          DenyButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            let timerInterval
            Swal.fire({
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                fetch('/save_ahorros/' + id, {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify({ fecha: fecha, monto_2: monto_2, monto_1: monto_1, tipo: tipo, metodo: metodo, comentario: comentario })
                }).then(res => res.text()).then(() => {
                  document.getElementById("fecha").value = "";
                  document.getElementById("monto_1").value = "";
                  document.getElementById("monto_2").value = "";
                  document.getElementById("tipo").value = 0;
                  document.getElementById("metodo").value = 0;
                  document.getElementById("comentario").value = "";
                });
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire('Datos Guardado con exito', '', 'success').then((result) => {
                  if (result.dismiss) {
                    document.querySelector("#histo").click();
                  }
                });
              }
            })
          } else if (result.isDenied) {
            Swal.fire("Cambios no Guardados", "", "info");
          }
        });
      } else {
        Swal.fire("Monto #2 no tiene el 30% del Monto #1 Revise", "", "info");
        stop;
      }
    }
  }
});
window.onload = () => {
  //CARGA
  $('#tabla_cedula').DataTable({
    order: [[0, 'asc']]
  });
  num();
  //FECHA
  var hoy = new Date();
  var fecha =
    hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  document.getElementById("fecha").value = fecha + " " + hora;
};
var tex_1;
$('.radio-group .radio').click(function (e) {
  $('.selected .fa').removeClass('fa-check');
  $('.radio').removeClass('selected');
  $(this).addClass('selected');
  $(this).find('input').click();
  tex_1 = $(this).text().trim();
});
window.addEventListener("scroll", function (event) {
  var scroll_y = this.scrollY;

  posicion = scroll_y;
  let logo = document.getElementById("logo");
  if (posicion >= 50) {
    logo.src = "../public/img/logo-w1.svg";
    logo.classList.add("img-fluid")
    logo.style.width = "100%";
  } else {
    logo.src = "../public/img/logo_w.svg";
    logo.removeAttribute("style");
  }
});
window.addEventListener("load", () => {
  const genero = document.querySelector("#genero").innerHTML;
  if (genero.trim() == "Femenino") {
    document.getElementById("socio").src = "https://bootdey.com/img/Content/avatar/avatar8.png";
  } else {
    document.getElementById("socio").src = "https://bootdey.com/img/Content/avatar/avatar7.png";
  }

});
function selecionar() {
  var menu = document.getElementById("sidebar");
  var espacio1 = document.getElementById("espacio1");
  var espacio2 = document.getElementById("espacio2");
  var icon = document.getElementById("icon");
  var icon2 = document.getElementById("div-logo");
  if (menu.classList.contains(' fixed-top') == true) {
    menu.classList.remove("fixed-top");
    espacio1.classList.add("mb-5"); espacio2.classList.add("mb-5");
    icon2.classList.remove("bg-danger"); icon.classList.remove("fa-times-rectangle-o");
    icon.classList.add("fa-navicon"); icon.innerHTML = "<b>Menu</b>"
    document.querySelector("#menu").classList.add("mt-3");
  } else {
    document.querySelector("#menu").classList.remove("mt-3");
    menu.classList.add("fixed-top"); espacio1.classList.remove("mb-5");
    espacio2.classList.remove("mb-5"); icon.classList.remove("fa-navicon");
    icon.classList.add("fa-times-rectangle-o"); icon2.classList.add("bg-danger");
    icon.innerHTML = "<b>Close</b>";
  }
};
function retirable() {
  const ahorro = document.getElementById("monto_1").value;
  let = numero_1 = 0.7;
  let = numero_2 = 0.3;
  nume = ahorro * numero_2;
  num_1 = ahorro * numero_1;
  document.getElementById("monto_2").value = nume;
  document.getElementById("monto_1").value = num_1;
};
function radio_retirable() {
  let
    retirable = document.getElementById("tipo"); if (retirable.value == 4) {
      document.getElementById("monto_1").classList.add("d-none"); //
      document.getElementById("monto_2").disabled = false;
      document.getElementById("monto_1").required = false;
      document.getElementById("comentario").value = "Ahorro Retirable";
    } else if
    (retirable.value == 5) {
    document.getElementById("monto_1").classList.add("d-none"); //
    document.getElementById("monto_2").disabled = false;
    document.getElementById("monto_2").value = 500.00;
    document.getElementById("monto_1").required = false;
    document.getElementById("comentario").value = "Cuota de Inscripción a la cooperativa";
  } else if (retirable.value == 1 || retirable.value == 2 || retirable.value == 3) {
    document.getElementById("monto_1").classList.remove("d-none"); //
    document.getElementById("monto_1").required = true
    document.getElementById("comentario").value = "Ahorro aporte a capital";
  }
};
function Numeros(string) {
  var out = ""; var filtro = "1234567890."; for (var i = 0; i <
    string.length; i++) if (filtro.indexOf(string.charAt(i)) != -1) out += string.charAt(i);
  return out;
};
$(document).ready(()=>{

  $('.Loading').animate({
    width : $('.Loading').data('charge') + '%'
  },1000);

  var getCounter = parseInt($('.loader-page i').text());

  var MyCounter = setInterval(function(){
    if(getCounter !== 101){
      $('.loader-page i').text(getCounter++ + '%');
    }else{
      $("#loader-page").css({ visibility: "hidden", opacity: "0" });
    };

  },10);

});