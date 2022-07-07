const table = document.querySelector("#tEntrada");
const btn_agregar = document.querySelector("#bAdd");
const entradaD = document.querySelector("#entrada");
const bSave = document.querySelector("#bSave");
const bConsu = document.querySelector("#bConsu");
const search = document.querySelector("#search");
const bNuloo = document.querySelector("#bNuloo")

bNuloo.addEventListener('click', () => {
  const detalle = $("#detalle").val()
  if (detalle == 0 || detalle == "") {
    Swal.fire({
      icon: "error",
      title: "Campo de detalle vacio",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      title: "Se anulara el siguiente asiento",
      text: "Desea Continuar!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#19d895",
      DenyButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const numero = $("#numero").val();
        try {
          fetch(`/anular-asiento-contable/${numero}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ detalle: detalle })
          })
        } catch (error) {
          console.log(error);
        }
        $("#closee").click();
        $("#numero").val(numero);
        search.click();
      } else {
        Swal.fire("Cambios no Guardados", "", "info");
      }
    })
  }
});
search.addEventListener('click', () => {
  const number = document.querySelector("#numero").value
  if (number == "" || number == 0) {
    document.querySelector("#numero").value = 0;
    Swal.fire({
      icon: "error",
      title: "Campo vacio!",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
  } else {
    let timerInterval
    Swal.fire({
      timerProgressBar: true,
      timer: 2000,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        table.classList.add("d-none");
        const input = document.querySelectorAll(".input");
        for (let i = 0; i < input.length; i++) {
          input[i].classList.remove("border-success")
        }
        try {
          see();
          fetch(`/seat-account-accountant-detail/${number}`).then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
              if (json.length == 0) {
                Swal.fire({
                  icon: "error",
                  title: "Sin resultado!",
                  text: "No se ha encontrado asiento",
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                })
                const consu = document.querySelectorAll(".consu");
                for (let i = 0; i < consu.length; i++) {
                  consu[i].value = "";
                }
              } else {
                json.forEach(e => {
                  let d = new Date(e.date)
                  $("#fecha").attr("type", "text");
                  $("#fecha").val(Datee(d));
                  $("#referencia").val(e.referencia);
                  $("#observa").val(e.observaciones);
                  $("#sMoneda").val(e.moneda);
                  if (e.id_estado == 5) {
                    $("#bNulo").attr("disabled", true);
                    $("#bNulo").addClass("d-none");
                    $("#person").text(e.userName);
                    $("#person1").addClass("d-flex");
                    $("#person1").removeClass("d-none");
                    $("#perso").text(e.userCreate);
                    $("#person2").addClass("d-flex");
                    $("#person2").removeClass("d-none")
                  } else {
                    $("#person1").removeClass("d-flex");
                    $("#person1").addClass("d-none");
                    $("#perso").text(e.userCreate);
                    $("#person2").addClass("d-flex");
                    $("#person2").removeClass("d-none");
                    $("#bNulo").attr("disabled", false);
                    $("#bNulo").removeClass("d-none");
                  }
                  document.querySelector("#statu").innerHTML = e.estado;
                })
              }
              $("#tEntrada").find("tr:gt(1)").remove();
              fetch(`/seat-account-accountant-asiento/${number}`).then(res => res.ok ? res.json() : Promise.reject(res))
                .then(array => {
                  array.forEach(e => {
                    let tr = document.createElement('tr');
                    tr.innerHTML = addRows(e)
                    table.appendChild(tr);
                  })
                  document.querySelector("#tTotal").innerHTML = currency(parseFloat(array[0].tCredito) - parseFloat(array[0].tDebito))
                  document.querySelector("#tCredito").innerHTML = currency(array[0].tCredito)
                  document.querySelector("#tDebito").innerHTML = currency(array[0].tDebito)
                })
            })
        } catch (error) {
          console.log(error)
        }
      },
      willClose: () => {
        clearInterval(timerInterval)
        table.classList.remove("d-none");
      }
    })
  }
});
const addRows = (e) => {
  return `<td>${e.cuenta}</td>
<td>${e.descripcion}</td>
<td>${e.costo}</td>
<td class="text-warning">${currency(e.debito)}</td>
<td class="text-primary">${currency(e.credito)}</td>`
};
const see = () => {
  $("#bNulo").removeClass("d-none");
  $("#bNulo").attr("disabled", false);
  $("#bPrint").removeClass("d-none");
  $("#bPrint").attr("disabled", false);
  $("#status").removeClass("d-none");
  $("#status").addClass("d-flex");
}
const Datee = (date) => {
  let formatted_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formatted_date;
};
bConsu.addEventListener('click', () => {
  const consu = document.querySelectorAll(".consu");
  bConsu.classList.add("d-none");
  bConsu.disabled = true;
  $("#numero").val("");
  $("#numero").attr('disabled', false);
  $("#bSave").attr('disabled', true);
  $("#bSave").addClass("d-none");
  $("#back").attr("disabled", false);
  $("#back").removeClass("d-none");
  $("#search").removeClass("d-none");
  $("#numero").removeClass("form-control-sm");
  $("#search").attr("disabled", false);
  $("#bAdd").attr("disabled", false);
  $("#add1").addClass("d-none");
  table.classList.add("d-none");
  $("#thead").addClass("table-success");
  $("#tEntrada").addClass("table-bordered");
  table.classList.remove("table-responsive");
  deleteRows();
  deleteRows();
  for (let i = 0; i < consu.length; i++) {
    consu[i].disabled = true;
  }
});
bSave.addEventListener('click', () => {
  const numero = $('#numero').val();
  const fecha = $('#fecha').val();
  const referencia = $('#referencia').val();
  const observa = $('#observa').val();
  const sMoneda = $('#sMoneda').val();
  const sCuenta = document.querySelectorAll(".sCuenta");
  const descripcion = document.querySelectorAll(".descripcion");
  const sCosto = document.querySelectorAll(".sCosto");
  const iDebito = document.querySelectorAll(".iDebito");
  const iCredito = document.querySelectorAll(".iCredito");
  const input = document.querySelectorAll(".input");
  for (let i = 0; i < input.length; i++) {
    if (input[i].value == 0 || input[i].value == "") {
      input[i].classList.remove("border-success");
      input[i].classList.add("border-danger");
    } else {
      input[i].classList.add("border-remove");
      input[i].classList.add("border-success");
    }
  }
  for (let i = 0; i < sCuenta.length; i++) {
    if (numero == 0 || fecha == "" || observa == "" || sMoneda == 0 || sCosto[i].value == 0 || sCuenta[i].value == 0 || iDebito[i].value == "" || iCredito[i].value == "") {
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
        icon: 'error',
        title: 'Campos vacio revise'
      })
    } else {
      Swal.fire({
        title: "Confirma guardar el asiento?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#19d895",
        DenyButtonColor: "#dd6b55",
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          numeracion()
          let timerInterval
          Swal.fire({
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              try {
                fetch('/save-asiento-Detalle/' + numero, {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify({ fecha: fecha, referencia: referencia, observa: observa, sMoneda: sMoneda })
                })
                for (let i = 0; i < sCuenta.length; i++) {
                  if (iCredito[i].value == 0 || iCredito[i].value == "") {
                    fetch(`/save-asientoCuenta/${numero}`, {
                      method: "POST",
                      headers: { "Content-type": "application/json" },
                      body: JSON.stringify({ sCuenta: sCuenta[i].value, descripcion: descripcion[i].value, sCosto: sCosto[i].value, tipo: 1, monto: iDebito[i].value })
                    })
                  } else {
                    fetch(`/save-asientoCuenta/${numero}`, {
                      method: "POST",
                      headers: { "Content-type": "application/json" },
                      body: JSON.stringify({ sCuenta: sCuenta[i].value, descripcion: descripcion[i].value, sCosto: sCosto[i].value, tipo: 2, monto: iCredito[i].value })
                    })
                  }
                }
                for (let i = 0; i < sCuenta.length; i++) {
                  sCuenta[i].value = "";
                  descripcion[i].value = "";
                  sCosto[i].value = 0;
                  iCredito[i].value = "";
                  iDebito[i].value = ""
                  iCredito[i].disabled = false;
                  iDebito[i].disabled = false;
                }
                $('#fecha').val("")
                $('#referencia').val("")
                $('#observa').val("")
                $('#sMoneda').val(0)
              } catch (error) {
                console.log(error)
              }
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
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
              title: `Asiento #${numero} Registrado Satisfactoriamente`
            })
            numeracion()
          })
        } else if (result.isDenied) {
          Swal.fire("Cambios no Guardados", "", "info");
        }
      });
    }
  }
});
entradaD.addEventListener('click', () => {
  account();
  ocultar();
  numeracion();
});
const account = () => {
  const sCuenta = document.querySelectorAll(".sCuenta");
  fetch("/account-catalogo").then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      let option = `<option value="0">Elige una cuenta</option>`;
      json.forEach(e => { option += `<option value="${e.id_catalogo}">${e.noCuenta + " " + e.nombre}</option>` });
      fillS(option, sCuenta);
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      let err = `Error ${error.status}: ${message}`;
      fillS(err, sCuenta);
    })
}
const fillS = (option, select) => {
  for (let i = 0; i < select.length; i++) {
    const valor = select[i].value
    select[i].innerHTML = option;
    select[i].value = valor
  }
}
let c = 2
btn_agregar.addEventListener('click', e => {
  let tr = document.createElement('tr');
  tr.innerHTML = addRow()
  table.appendChild(tr);
  account()
  $(`#sCuenta${c = c + 1}`).select2();
});
const deleteRows = () => {
  var rowCount = table.rows.length - 1;
  if (rowCount <= 1) {
    console.log('No se puede eliminar el encabezado');
  }
  else {
    table.deleteRow(rowCount - 1);
  }
  credito()
  debito()
}
const diferencia = () => {
  const totalC = document.getElementById("toCredito").innerHTML;
  const totalD = document.getElementById("toDebito").innerHTML;
  const iCredito = document.querySelectorAll("iCredito");
  const iDebito = document.querySelectorAll("iDebito");
  for (let i = 0; i < iCredito.length; i++) {
    if (iCredito[i].value == "" || iCredito[i].value == null || iCredito[i].value == 0) {
      totalC = 0;
    }
  }
  for (let i = 0; i < iDebito.length; i++) {
    if (iDebito[i].value == "" || iDebito[i].value == null || iDebito[i].value == 0) {
      totalD = 0;
    }
  }
  let w = parseFloat(totalC) - parseFloat(totalD);
  document.getElementById("tTotal").innerHTML = currency(w);
};
const credito = () => {
  var total2 = 0;
  $(".iCredito").each(function () {
    if (isNaN(parseFloat($(this).val()))) {
      total2 += 0;
    } else {
      total2 += parseFloat($(this).val());
    }
  });
  document.getElementById("tCredito").innerHTML = currency(total2);
  document.getElementById("toCredito").innerHTML = total2;
  diferencia()
  ocultar()
};
const debito = () => {
  var total1 = 0;
  $(".iDebito").each(function () {
    if (isNaN(parseFloat($(this).val()))) {
      total1 += 0;
    } else {
      total1 += parseFloat($(this).val());
    }
  });
  document.getElementById("tDebito").innerHTML = currency(total1);
  document.getElementById("toDebito").innerHTML = total1;
  diferencia()
  ocultar()
};
const vali = () => {
  const iCredito = document.querySelectorAll(".iCredito");
  const iDebito = document.querySelectorAll(".iDebito");
  for (let i = 0; i < iCredito.length; i++) {
    if (iDebito[i].value == "") {
      iDebito[i].disabled = true;
      iDebito[i].value = 0;
    } else if (iCredito[i].value == "") {
      iCredito[i].disabled = true;
      iCredito[i].value = 0;
    } else {
      iCredito[i].disabled = false;
      iDebito[i].disabled = false;
    }
  }
}
const ocultar = () => {
  const sCuenta = document.querySelectorAll(".sCuenta");
  const iCredito = document.querySelectorAll(".iCredito");
  const iDebito = document.querySelectorAll(".iDebito");
  for (let i = 0; i < sCuenta.length; i++) {
    iDebito[i].min = 1;
    iCredito[i].min = 1;
  }
};
const currency = (number) => {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(number);
};
const numeracion = () => {
  fetch("/number/" + 1).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      json.forEach(e => { document.querySelector("#numero").value = e.numeracion; });
    }).catch(error => {
      console.log(error);
      let message = error.statusText || "Ocurrio un error";
      document.querySelector("#numero").value = `Error ${error.status}: ${message}`;
    })
};
let b = 2;
const addRow = () => {
  return `<td style="width: 25%;"><select class="form-control form-control-sm sCuenta" autocomplete="off"
  id="sCuenta${b = b + 1}">
  <option value="0">Elige cuenta</option>
</select></td>
<td><textarea class="form-control descripcion" id="descripcion" name="descripcion"
  placeholder="Observaciones de asiento" rows="3"></textarea></td>
<td style="width: 20%;"><select class="form-control form-control-sm sCosto" autocomplete="off"
  id="sCosto">
  <option value="0">Elige centro costo</option>
  <option value="1">Principal</option>
</select></td>
<td style="width: 13%;"><input type="number" autocomplete="off" onkeyup="debito()" onfocus="ocultar()" onblur="vali()" class="form-control form-control-sm iDebito" id="iDebito" />
</td>
<td style="width: 13%;"><input type="number" autocomplete="off" onkeyup="credito()" onfocus="ocultar()" onblur="vali()" class="form-control form-control-sm iCredito" id="iCredito" />
</td>
<td><button class="badge badge-danger border border-white" onclick="deleteRows()"><i
    class="fa fa-times"></i></button></td>`
};
window.onload = () => {
  let carga = document.getElementById("loader-page");
  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';
  applyInputMask('cuenta', '00', 1);
  $('#sCuenta1').select2();
  $('#sCuenta2').select2();
  scroll()
};
window.addEventListener("scroll", function (event) {
  scroll()
});
const scroll = () => {
  var scroll_y = this.scrollY;

  posicion = scroll_y;
  let logo = document.getElementById("logo");
  if (posicion >= 50) {
    logo.src = "../public/img/olivia2.svg";
    logo.classList.add("img-fluid")
    logo.style.width = "200px";
    logo.style.position = "relative";
    logo.style.top = "-35px";
  } else {
    logo.src = "../public/img/logo_w.svg";
    logo.removeAttribute("style");

  }
}
const agregar = () => {
  document.getElementById("fila").innerHTML = addRow();
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
  const cuenta = document.querySelector("#cuenta").value;
  const div1 = document.querySelectorAll(".div");
  if (cuenta > 99 || cuenta <= 10) {
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
        validation[i].classList.remove("d-none");
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
        for (i = 0; i < select.length; i++) {
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
            timer: 2000,
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
          })
        } else if (result.isDenied) {
          Swal.fire("Cambios no Guardados", "", "info");
        }
      });
    }
  }
});
const right = document.querySelector("#right");
const bBack = document.querySelector("#bBack");
let a = -1;
right.addEventListener('click', () => {
  let timerInterval
  Swal.fire({
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
      for (i = 0; i < validation.length; i++) {
        validation[i].classList.add("d-none");
      }
      for (i = 0; i < select.length; i++) {
        select[i].classList.remove("border-danger");
        select[i].classList.remove("border-success");
      }
      for (i = 0; i < input.length; i++) {
        input[i].classList.remove("border-danger");
        input[i].classList.remove("border-success");
      }
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
          bBack.disabled = false;
          bBack.classList.remove("d-none");
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
  const nombre = document.querySelector("#nombre").value;
  const tipo = document.querySelector("#tipo").value;
  const movimiento = document.querySelector("#movimiento").value;
  if (cuenta == "" || cuenta == 0 || nombre.trim() == "" || tipo == 0 || movimiento == 0 || moneda == 0) {
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
    for (i = 0; i < input.length; i++) {
      if (input[i].value == "" || input[i].value == 0) {
        input[i].classList.add("border-danger");
        input[i].classList.remove("border-success");
      } else {
        input[i].classList.add("border-success");
        input[i].classList.remove("border-danger");
      }
    }
    for (i = 0; i < select.length; i++) {
      if (select[i].value == 0) {
        select[i].classList.add("border-danger");
        select[i].classList.remove("border-success");
      } else {
        select[i].classList.add("border-success");
        select[i].classList.remove("border-danger");
      }
    }
  } else {
    const id = document.querySelector("#cuenta").value;
    fetch("/account-catalogo/" + id).then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        json.forEach(e => {
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
                timer: 2000,
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
                    });
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
              })
            } else if (result.isDenied) {
              Swal.fire("Cambios no Guardados", "", "info");
            }
          })
        })
      })
  }
});
bBack.addEventListener('click', () => {
  bBack.disabled = true;
  bUpdate.disabled = true;
  bBack.classList.add("d-none");
  bUpdate.classList.add("d-none");
  bSubmit.classList.remove("d-none");
  formato.classList.remove("d-none");
  bSubmit.disabled = false;
  for (i = 0; i < validation.length; i++) {
    validation[i].classList.remove("d-none");
  }
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
});

