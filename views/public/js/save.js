function save() {
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
      document.getElementById("form-ahorro").submit();
    } else if (result.isDenied) {
      Swal.fire("Cambios no Guardados", "", "info");
    }
  });
}

function require(event) {
  let fecha = document.getElementById("fecha").value;
  let monto_1 = document.getElementById("monto_1").value;
  let monto_2 = document.getElementById("monto_2").value;
  let tipo = document.getElementById("tipo").value;
  let metodo = document.getElementById("metodo").value;
  let comentario = document.getElementById("comentario").value;
  let total = parseFloat(monto_1) + parseFloat(monto_2);
  if (tipo == 4 || tipo == 5) {
    if (
      fecha == "" ||
      monto_2 == "" ||
      monto_2 == "NaN" ||
      tipo == 0 ||
      metodo == 0 ||
      comentario == ""
    ) {
      Swal.fire("Campos vacios revise", "", "info");
      stop;
    } else {
      save();
    }
  } else {
    if (
      fecha == "" ||
      monto_1 == "" ||
      monto_2 == "" ||
      monto_1 == "NaN" ||
      monto_2 == "NaN" ||
      tipo == 0 ||
      metodo == 0 ||
      comentario == ""
    ) {
      Swal.fire("Campos vacios revise", "", "info");
      stop;
    } else {
      if (monto_2 == total * 0.3) {
        save();
      } else {
        Swal.fire("Monto #2 no tiene el 30% del Monto #1 Revise", "", "info");
        stop;
      }
    }
  }
}
window.onload = function () {
  //CARGA
  let carga = document.getElementById("loader-page");
  carga.style.visibility = "hidden";
  carga.style.opacity = "0";
  //FECHA
  var hoy = new Date();
  var fecha =
    hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  document.getElementById("fecha").value = fecha + " " + hora;
};
window.addEventListener("scroll", function (event) {
  var scroll_y = this.scrollY;

  posicion = scroll_y;
  let logo = document.getElementById("logo");
  if (posicion >= 80) {
    logo.src = "../public/img/logo_2_w.svg";
    logo.style.width = "70px";
    document.getElementById("logo-text").innerHTML = texto();
  } else {
    logo.src = "../public/img/logo_w.svg";
    logo.removeAttribute("style");
    document.getElementById("logo-text").innerHTML = "";
  }
});
function texto() {
  return (
    '<span class="navbar-brand d-xl-inline-block text-white" id="logo-text">' +
    "<b>COOPACFI</b>" +
    "</span>"
  );
}
