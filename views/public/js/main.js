function cedula23() {
  var num_sf = document.getElementById('cedula').value;
  var num_cf = '';
  num_cf = num_sf.substring(0, 3) + "-";
  num_cf += num_sf.substring(3, 10) + "-";
  num_cf += num_sf.substring(10, 11);
  document.getElementById('cedula').value = num_cf;
}
window.onload = () => {
  let carga = document.getElementById("loader-page");

  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';

}
window.addEventListener("scroll", (event) => {

  var scroll_y = this.scrollY;

  posicion = scroll_y;
  let logo = document.getElementById("logo");
  if (posicion >= 80) {
    logo.src = "public/img/logo_2_w.svg";
    logo.style.width = "70px";
    document.getElementById("logo-text").innerHTML = texto();
  } else {
    logo.src = "public/img/logo_w.svg";
    logo.removeAttribute("style");
    document.getElementById("logo-text").innerHTML = "";

  }
});
function texto() {
  return '<p class="navbar-brand d-xl-inline-block" id="logo-text">' +
    '<b class="text-white">COOPACFI</b>' +
    '</p>';
}
const selecionar = () => {
  var menu = document.getElementById("sidebar");
  var espacio1 = document.getElementById("espacio1");
  var espacio2 = document.getElementById("espacio2");
  var icon = document.getElementById("icon");
  var icon2 = document.getElementById("div-logo");
  if (menu.classList.contains('fixed-top') == true) {
    menu.classList.remove("fixed-top");
    espacio1.classList.add("mb-5");
    espacio2.classList.add("mb-4");
    icon2.classList.remove("bg-danger");
    icon.classList.remove("fa-times-rectangle-o");
    icon.classList.add("fa-navicon");
    icon.innerHTML = "<b>Menu</b>"
  } else {
    menu.classList.add("fixed-top");
    espacio1.classList.remove("mb-5");
    espacio2.classList.remove("mb-4");
    icon.classList.remove("fa-navicon");
    icon.classList.add("fa-times-rectangle-o");
    icon2.classList.add("bg-danger");
    icon.innerHTML = "<b>Close</b>";
  }
}
const sProvincia = document.querySelector("#provincia");
const sMunicipio = document.querySelector("#municipio");
const sSector = document.querySelector("#sector");
const sBancos = document.querySelector("#banco");
const bSubmit = document.querySelector("#bSubmit");

bSubmit.addEventListener('click', () => {
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const correo = document.querySelector("#correo").value;
  const fecha_n = document.querySelector("#fecha_n").value;
  const estado = document.querySelector("#estado").value;
  const profeccion = document.querySelector("#profeccion").value;
  const telefono = document.querySelector("#telefono").value;
  const celular = document.querySelector("#celular").value;
  const genero = document.querySelector("#genero").value;
  const cuotas = document.querySelector("#cuotas").value;
  const id_identidad = document.querySelector("#id_identidad").value;
  const cedula = document.querySelector("#cedula").value;
  const calle = document.querySelector("#calle").value;
  const nacionalidad = document.querySelector("#nacionalidad").value;
  const pais = document.querySelector("#pais").value;
  const empresa = document.querySelector("#empresa").value;
  const puesto = document.querySelector("#puesto").value;
  const tiempo = document.querySelector("#tiempo").value;
  const salario = document.querySelector("#salario").value;
  const banco = document.querySelector("#banco").value;
  const no_cuenta = document.querySelector("#no_cuenta").value;
  if (nombre == "" || apellido == "" || correo == "" || fecha_n == "" || estado == 0 || profeccion == "" || telefono == "" || celular == 0 || genero == 0 || cuotas == 0 || id_identidad == 0 || cedula == "" || calle == "" || nacionalidad == 0 || pais == "" || empresa == "" || puesto == "" || tiempo == 0 || salario == 0 || banco == 0 || no_cuenta == "" || sProvincia.value == 0 || sMunicipio.value == 0 || sSector == 0) {
    Swal.fire("Campos vacios revise", "", "info");
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
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            fetch('/register-user', {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                correo: correo.trim(),
                fecha_n: fecha_n,
                estado: estado,
                profeccion: profeccion.trim(),
                telefono: telefono,
                celular: celular,
                genero: genero,
                cuotas: cuotas,
                id_identidad: id_identidad,
                cedula: cedula,
                provincia: sProvincia.value,
                municipio: sMunicipio.value,
                sector: sSector,
                calle: calle.trim(),
                pais: pais.trim(),
                nacionalidad: nacionalidad,
                empresa: empresa.trim(),
                puesto: puesto.trim(),
                tiempo: tiempo,
                salario: salario,
                banco: banco,
                no_cuenta: no_cuenta.trim(),
                fulldate:formatDate(date)
              })
            }).then(res => res.text()).then(() => {
              const input = document.querySelectorAll(".input");
              const select = document.querySelectorAll(".select");
              for (i = 0; i < input.length; i++) {
                input[i].value = "";
              }
              for (i = 0; i < select.length; i++) {
                select[i].value = 0;
              }
              document.getElementById("item").click();
            });
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Soccios Guardado Satisfactoriamente'
            }).then((result) => {
              if (result.dismiss) {
                Swal.fire({
                  title: "Desea  Imprimir el comprobante de Ingreso",
                  icon: "warning",
                  showDenyButton: true,
                  confirmButtonColor: "#19d895",
                  DenyButtonColor: "#d33",
                  confirmButtonText: "Imprimir",
                  denyButtonText: `Cancelar`,
                }).then((result) => {
                  if (result.isConfirmed) {

                  }
                  else if (result.isDenied) {
                    Swal.fire({
                      title: "Comprobante no impreso",
                      icon: "info",
                      timer: 2000,
                      timerProgressBar: true,
                    });
                  }
                })
              }
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Cambios no Guardados", "", "info");
      }
    });
  };
});
sBancos.addEventListener('change', () => {
  const id = sBancos.value;
  if (id == 999) {
    document.querySelector("#nCuenta").classList.add("d-none");
    document.querySelector("#no_cuenta").value = "No posee Numero de Cuenta";
  } else {
    document.querySelector("#nCuenta").classList.remove("d-none");
    document.querySelector("#no_cuenta").value = "";
  }
});
window.addEventListener('load', () => {
  fetch("/bancos").then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      let options;
      json.forEach(element => options += `<option value="${element.id_bancos}">${element.nombre}</option>`);
      sBancos.innerHTML = options;
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      sBancos.nextElementSibling.innerHTML = `Error ${error.status}: ${message}`;
    })
});
sMunicipio.addEventListener('blur', () => {
  const id = sMunicipio.value;
  fetch("/sector/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      let options;
      json.forEach(element => options += `<option value="${element.distrito_id}">${element.nombre}</option>`);
      sSector.innerHTML = options;
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      sSector.nextElementSibling.innerHTML = `Error ${error.status}: ${message}`;
    })
});
sProvincia.addEventListener('change', () => {
  const id = sProvincia.value;
  fetch("/municipio/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      let options;
      json.forEach(element => options += `<option value="${element.municipio_id}">${element.nombre}</option>`);
      sMunicipio.innerHTML = options;
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      sMunicipio.nextElementSibling.innerHTML = `Error ${error.status}: ${message}`;
    })
});
sMunicipio.addEventListener('change', () => {
  const id = sMunicipio.value;
  fetch("/sector/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      let options;
      json.forEach(element => options += `<option value="${element.distrito_id}">${element.nombre}</option>`);
      sSector.innerHTML = options;
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      sSector.nextElementSibling.innerHTML = `Error ${error.status}: ${message}`;
    })
});
/*** mascaras */
const identidad = document.querySelector("#id_identidad");
identidad.addEventListener('change', () => {
  if (identidad.value == "Cedula") {
    applyInputMask('cedula', '000-0000000-0', 2);
  }
  else {
    applyInputMask('cedula', '000-00000-0', 3);
  }
})
$(document).ready(function () {
  applyInputMask('telefono', '(000) 000-0000', 1);
  applyInputMask('celular', '(000) 000-0000', 1);
  applyInputMask('fecha_n', '00/00/0000', 4);
});
const applyInputMask = (elementId, mask, tipo) => {
  let inputElement = document.getElementById(elementId);
  let content = '';
  let maxChars = numberCharactersPattern(mask);

  inputElement.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (isNumeric(e.key) && content.length < maxChars) {
      content += e.key;
    }
    if (e.keyCode == 8) {
      if (content.length > 0) {
        content = content.substr(0, content.length - 1);
      }
    }
    if (tipo == 1) {
      inputElement.value = maskIt('(000) 000-0000', content);
    } else if (tipo == 2) {
      inputElement.value = maskIt('000-0000000-0', content);
    } else if (tipo == 3) {
      inputElement.value = maskIt('000-00000-0', content);
    } else if (tipo == 4) {
      inputElement.value = maskIt('00/00/0000', content);
    }
  })
}
const maskIt = (pattern, value) => {
  let position = 0;
  let currentChar = 0;
  let masked = '';
  while (position < pattern.length && currentChar < value.length) {
    if (pattern[position] === '0') {
      masked += value[currentChar];
      currentChar++;
    } else {
      masked += pattern[position];
    }
    position++;
  }
  return masked;
}
const isNumeric = (char) => {
  return !isNaN(char - parseInt(char));
}
const numberCharactersPattern = (pattern) => {
  let numberChars = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '0') {
      numberChars++;
    }
  }
  return numberChars;
}
let date = new Date();
const formatDate = (date) => {
  let formatted_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formatted_date;
};