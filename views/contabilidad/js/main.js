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
const diferencia = () => {
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
const credito = () => {
  var total2 = 0;
  $(".credito").each(function () {
    if (isNaN(parseFloat($(this).val()))) {
      total2 += 0;
    } else {
      total2 += parseFloat($(this).val());
    }
  });
  document.getElementById("total_Credito").value = currency(total2);
};
const debito = () => {
  var total1 = 0;
  $(".debito").each(function () {
    if (isNaN(parseFloat($(this).val()))) {
      total1 += 0;
    } else {
      total1 += parseFloat($(this).val());
    }
  });
  document.getElementById("totaDebito").value = currency(total1);
};
const currency = (number) => {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(number);
};
const addRow = () => {
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
};
window.onload = () => {
  let carga = document.getElementById("loader-page");
  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';
  applyInputMask('cuenta', '00', 1)
};
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
const agregar = () => {
  document.getElementById("fila").innerHTML = addRow();
};
const texto = () => {
  return '<p class="navbar-brand d-xl-inline-block text-white" id="logo-text">' +
    '<b>COOPACFI</b>' +
    '</p>';
};
/** mascara */
const formato = document.querySelector("#formato");
const cuenta = document.querySelector("#cuenta");
const body = document.querySelector("#body");
formato.addEventListener('change', () => {
  numeroCuenta(formato.value);
});
cuenta.addEventListener('blur', () => {
  if (cuenta.value == "" || cuenta.value == 0) {
    cuenta.value = 0;
  } else {
    if (cuenta.value > 99 || cuenta.value <= 10) {
      Swal.fire({
        icon: "error",
        title: "Los numeros ingresado no pueden ser menor a 10 o mayor 99",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      if (cuenta.value.length == 10) {

      } else {
        formatcuenta(formato.value);
      }
    }
  }
});
const formatcuenta = (datos) => {
  let id;
  let num;
  if (datos == 1) {
    num = cuenta.value + '.00.00.00';
    id = cuenta.value;
  } else if (datos == 2) {
    num = cuenta.value + '.00.00';
    id = cuenta.value.slice(0, -3);
  } else if (datos == 3) {
    num = cuenta.value + '.00';
    id = cuenta.value.slice(0, -6);
  } else if (datos == 4) {
    num = cuenta.value;
    id = cuenta.value.slice(0, -9);
  } else {
    num = cuenta.value;
  }
  sCuenta(id.slice(0, -1));
  sClase(id.slice(0, -1));
  cuenta.value = num;
};
const sCuenta = (id) => {
  fetch("/tipo-cuenta/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      let option = `<option value="0">Elige un tipo</option>`;
      json.forEach(e => { option += `<option value="${e.id_tipo}">${e.noCuenta + " " + e.nombre}</option>` });
      document.querySelector("#tipo").innerHTML = option;
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      document.querySelector("#tipo").innerHTML = `Error ${error.status}: ${message}`;
    })
}
const sClase = (id) => {
  fetch("/clase-cuenta/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      json.forEach(e => document.querySelector("#clase").value = e.nombre);
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      document.querySelector("#clase").value = `Error ${error.status}: ${message}`;
    })
}
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
      inputElement.value = maskIt('00', content);
    } else if (tipo == 2) {
      inputElement.value = maskIt('00.00', content);
    } else if (tipo == 3) {
      inputElement.value = maskIt('00.00.00', content);
    } else if (tipo == 4) {
      inputElement.value = maskIt('00.00.00.00', content);
    }
  })
};
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
};
const isNumeric = (char) => {
  return !isNaN(char - parseInt(char));
};
const numberCharactersPattern = (pattern) => {
  let numberChars = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '0') {
      numberChars++;
    }
  }
  return numberChars;
};
const numeroCuenta = (formato) => {
  if (formato == 1) {
    applyInputMask('cuenta', '00', 1);
  }
  else if (formato == 2) {
    applyInputMask('cuenta', '00.00', 2);
  }
  else if (formato == 3) {
    applyInputMask('cuenta', '00.00.00', 3);
  } else if (formato == 4) {
    applyInputMask('cuenta', '00.00.00.00', 4);
  }
}
let date = new Date();
const formatDate = (date) => {
  let formatted_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formatted_date;
};
const bSubmit = document.querySelector("#bSubmit");
const nombre = document.querySelector("#nombre").value;
const tipo = document.querySelector("#tipo").value;
const clase = document.querySelector("#clase").value;
const movimiento = document.querySelector("#movimiento").value;
const moneda = document.querySelector("#moneda").value;
const activa = document.querySelector("#activa");
const nota = document.querySelector("#nota").value;
const input = document.querySelectorAll(".input");
const select = document.querySelectorAll(".select");
const validation = document.querySelectorAll(".validation");
bSubmit.addEventListener('click', () => {
  const cuenta = document.querySelector("#cuenta").value;
  const div1 = document.querySelectorAll(".div");
  if (cuenta.value > 99 || cuenta.value <= 10) {
    Swal.fire({
      icon: "error",
      title: "Los numeros ingresado no pueden ser menor a 10 o mayor 99",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    if (cuenta == "" || cuenta == 0 || nombre.trim() == "" || tipo == 0 || clase == 0 || movimiento == 0 || moneda == 0) {
      for (i = 0; i < input.length; i++) {
        if (input[i].value == "" || input[i].value == 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: 'Campos vacios revise'
          })
          input[i].classList.add("border-danger");
          input[i].classList.remove("border-success");
          stop;
        } else {
          input[i].classList.add("border-success");
          input[i].classList.remove("border-danger");
        }
      }
      for (i = 0; i < validation.length; i++) {
        if (input[i].value == "" || input[i].value == 0) {
          if (div1.length > 0) {
          } else {
            let div = document.createElement('small');
            div.classList.add("text-danger");
            div.classList.add("div");
            div.innerHTML = "Chequea este campo";
            validation[i].appendChild(div);
          }
        } else {
          validation[i].classList.add("d-none");
        }
      } {
        for (i = 0; i < select.length; i++)
          if (select[i].value == 0) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'error',
              title: 'Campos vacios revise'
            })
            select[i].classList.add("border-danger")
            select[i].classList.remove("border-success");
            stop;
          } else {
            select[i].classList.add("border-success");
            select[i].classList.remove("border-danger");
          }
      }
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
        if (result.isConfirmed) {
          let timerInterval
          Swal.fire({
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
              const nClase = cuenta.slice(0, -10);
              Swal.showLoading();
              fetch('/create-account', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ Nocuenta: cuenta, nCuenta: nombre, tipo: tipo, clase: nClase, movimiento: movimiento, moneda: moneda, nota: nota })
              }).then(res => res.text())
                .catch(error => {
                  console.log(error);
                  Swal.fire("Error Hubo un problema al mandar la Informacion", "", "warning");
                });
              Swal.close();
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            for (i = 0; i < select.length; i++) {
              select[i].value = 0;
              select[i].classList.remove("border-danger");
              select[i].classList.remove("border-success");
            }
            for (i = 0; i < input.length; i++) {
              input[i].value = "";
              input[i].classList.remove("border-danger");
              input[i].classList.remove("border-success");
            }
            document.getElementById("nota").value = "";
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
                title: 'Cuenta Creada Satisfactoriamente'
              })
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Cambios no Guardados", "", "info");
        }
      });
    }
  }
});
const right = document.querySelector("#right");
const left = document.querySelector("#left");
let a = -1;
right.addEventListener('click', () => {
  let timerInterval
  Swal.fire({
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
      applyInputMask('cuenta', '00.00.00.00', 4);
      document.querySelector("#formato").classList.add("d-none")
      fetch("/numberCatalogo").then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          if (document.querySelector("#cuenta").value.length < 4) {
            const acumulador = () => {
              if (a >= json.length - 1) {
                a = 0;
              }
              else {
                a = a + 1;
              }
              return a;
            }
            const numero = json[acumulador()].noCuenta
            document.querySelector("#cuenta").value = numero;
          }
        }).catch(error => {
          console.log(error);
          let message = error.statusText || "Ocurrio un error";
          document.querySelector("#cuenta").value = `Error ${error.status}: ${message}`;
        }).then(() => {
          bSubmit.classList.add("d-none");
          bSubmit.disabled = true;
          bUpdate.classList.remove("d-none");
          bUpdate.disabled = false;
          const id = document.querySelector("#cuenta").value;
          sCuenta(id.slice(0, -10));
          sClase(id.slice(0, -10));
          document.querySelector("#checked").classList.remove("d-none");
          fetch("/account-catalogo/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
              json.forEach(e => {
                document.querySelector("#nombre").value = e.nombre;
                document.querySelector("#tipo").value = e.tipo;
                document.querySelector("#movimiento").value = e.acMovimiento;
                document.querySelector("#moneda").value = e.moneda;
                document.querySelector("#nota").value = e.nota;
                document.querySelector("#activa").value = e.estado;
                if (e.estado == 3) {
                  document.querySelector("#activa").checked = true
                } else {
                  document.querySelector("#activa").checked = false
                }
                Swal.close();
              })
            }).catch(error => {
              console.log(error);
              let message = error.statusText || "Ocurrio un error";
              document.querySelector("#cuenta").value = `Error ${error.status}: ${message}`;
            })
        })
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  })
});
const bUpdate = document.querySelector("#bUpdate")
bUpdate.addEventListener('click', () => {
  const id = document.querySelector("#cuenta").value;
  fetch("/account-catalogo/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      json.forEach(e => {
        /*if (document.querySelector("#nombre").value !== e.nombre || document.querySelector("#tipo").value !== e.tipo || document.querySelector("#movimiento").value !== e.acMovimiento || document.querySelector("#moneda").value !== e.moneda || document.querySelector("#nota").value !== e.nota || document.querySelector("#activa") !== e.estado) {
          Swal.fire({
            icon: "info",
            title: "Ningun cambio realizado",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {*/
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
              if (activa.checked == true) {
                var cheked = 3
              } else {
                var cheked = 4
              }
              let timerInterval
              Swal.fire({
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                  const nClase = cuenta.value.slice(0, -10);
                  const ids = cuenta.value
                  const Nombre = document.querySelector("#nombre").value
                  const Nota = document.querySelector("#nota").value
                  const Tipo = document.querySelector("#tipo").value
                  fetch('/update-account/' + ids, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ nCuenta: Nombre, tipo: Tipo, clase: nClase, movimiento: movimiento, moneda: moneda, nota: Nota, estado: cheked })
                  }).then(res => res.text())
                    .catch(error => {
                      console.log(error);
                      Swal.fire("Error Hubo un problema al mandar la Informacion", "", "warning");
                    });
                  Swal.close();
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                for (i = 0; i < select.length; i++) {
                  select[i].value = 0;
                  select[i].classList.remove("border-danger");
                  select[i].classList.remove("border-success");
                }
                for (i = 0; i < input.length; i++) {
                  input[i].value = "";
                  input[i].classList.remove("border-danger");
                  input[i].classList.remove("border-success");
                }
                document.getElementById("nota").value = "";
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
                    title: 'Cuenta Actualizada Satisfactoriamente'
                  })
                }
              })
            } else if (result.isDenied) {
              Swal.fire("Cambios no Guardados", "", "info");
            }
          })
        //}
      })
    })
})
