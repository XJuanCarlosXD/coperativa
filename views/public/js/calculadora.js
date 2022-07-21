"use strict";

function goToAmortizationTable(n) {
  n && n.stopPropagation();
  $("body, html").animate({
    scrollTop: $(".amortization_table_title").offset().top,
  });
};
var cuota = [];
function calculateLoans() {
  var h, u, a, n;
  let date = new Date();
  $(".amortization_table_container .amortization_table tbody tr").remove();
  cuota = [];
  var f = +$("input#amountLoan").val(),
    e = +$("input#loansPayments").val(),
    l = +$("input#yearInterest").val(),
    t = !0;
  if (
    (f <= 0
      ? ($("input#amountLoan").addClass("border-danger").attr("disabled", true), (t = !1))
      : $("input#amountLoan").removeClass("border-danger"),
      e <= 0
        ? ($("input#loansPayments").addClass(""), (t = !1))
        : $("input#loansPayments").removeClass(""),
      l <= 0
        ? ($("input#yearInterest").addClass(""), (t = !1))
        : $("input#yearInterest").removeClass(""),
      t)
  ) {
    $("#calculate_button").prop("disabled", !0);
    var o = 1,
      s = l / 1200,
      v = 1 + s;
    for (h = 0; h < e; h++) o *= v;
    var i = f * ((s * o) / (o - 1)),
      r = undefined,
      c = f,
      y = $(".amortization_table_container .amortization_table tbody");
    for (u = 1; u <= e; u++) {
      (r = c * s),
        (a = i - r),
        (n = c - i + r),
        (c = n),
        (n < 1 && (n = 0));
      var objeto =
      {
        noCuota: u,
        mCuota: parseFloat(formatNumber(i).replace(/[,]/g, '')),
        mCapital: parseFloat(formatNumber(a).replace(/[,]/g, '')),
        mInteres: parseFloat(formatNumber(r).replace(/[,]/g, '')),
        mBalance: n,
        dDate: formatD(sumDate(date, 30))
      };
      cuota.push(objeto);
      y.append(
        `\<tr class="row_body">\n                        
            <th><div class="noCuota">${u}</div>
            </th>\n                        
            <th><div class="mCuota">\$${formatNumber(i)}</div>
            </th>\n                        
            <th><div class="mCapital">\$${formatNumber(a)}</div></th>\n                        
            <th><div class="mInteres">\$${formatNumber(r)}</div></th>\n                        
            <th><div class="mBalance">\$${formatNumber(n)}</div></th>\n  
            <th><div class="dDate
            ">${formatDate(sumDate(date, 30))}</div></th>\n                    
            </tr>\n
            `
      );
    }
    $(".result_message").html(
      "La cuota mensual sería de <strong>$" + formatNumber(i) + "</strong>."
    );
    $(".link_to_table_container").show();
    $(".loans_calculator button").addClass("five");
  }
};
function formatNumber(n) {
  return n
    ? n.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : n;
};
const alerta = () => {
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
    title: 'Campos Vacios',
    text: "Verifique!"
  })
};
$("#prestamo").click(() => {
  onCancel();
  loadbalance();
  num();
  motivoo();
});
const motivoo = () => {
  fetch(`/get-prestamos/${$("#id").text().trim()}`).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      var optionn = `<option value=""></option>`;
      json.array2.forEach(e => {
        optionn += `<option value="${e.id_motivo}">${e.nombre}</option>`
      });
      $("#motivo").html(optionn);
    });
};
const loadbalance = () => {
  const number = $("#id").text()
  try {
    fetch(`/status-User-balance/${number.trim()}`).then(res => res.ok ? res.json() : Promise.reject(res))
      .then(array => {
        array.forEach(e => {
          $("#amountLoan").attr("disabled", true);
          $("#amountLoan").val(e.balance * 2);
        })
      })
  } catch (error) {
    console.log(error)
  }
};
window.oncontextmenu = function () {
  return false;
};
/*document.addEventListener("keydown", function (event) {
  var key = event.key || event.keyCode;
  let tecla = event.which || event.keyCode;
  if (event.ctrlKey) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (key == 123) {
    event.preventDefault();
    event.stopPropagation();
  } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
    event.preventDefault();
    event.stopPropagation();
  }
}, false);*/
const num = () => {
  var numero;
  fetch(`/number/${3}`).then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      numero = json[0].numeracion;
      $("#nume").text(numero).hide();
    });
};
function addfilas(e) {
  return `
  <thead class="table-light text-center">
  <tr>
  <th scope="col">No. Prestamo <div class="mt-3 font-weight-normal">${e.noPrestamo}</div></th>
  <th scope="col">Balance <div class="mt-3 font-weight-normal">${currency(e.balance)}</div></th>
  </tr>
  </thead>`
}
const bSavebutton = () => {
  num()
  Swal.fire({
    title: "Confirma se generara la siguiente Solicitud ?",
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
          fetch(`/create-lend%Lease/cuota/${$("#id").text().trim()}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              noPrestamo: $("#nume").text().trim(),
              array: cuota,
              motivo: $("#motivo").val(),
              mComen: $("#mComen").val(),
            })
          }).then(res => res.json())
            .catch(error => console.error('Error:', error))
        },
        willClose: () => {
          clearInterval(timerInterval)
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
            title: 'Prestamo generado exitosamente'
          })
        };
        onCancel();
      })
    } else if (result.isDenied) {
      Swal.fire("Solicitud no generada", "", "info");
    }
  });
};
const sumDate = (date, numDate) => {
  date.setDate(date.getDate() + numDate);
  return date;
};
const formatD = (date) => {
  let formatted_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return formatted_date;
};
function onCancel() {
  // Reset wizard
  $('#smartwizard').smartWizard("reset");
  // Reset form
  const selected = document.querySelectorAll(".radio");
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove("selected");
  };
  document.getElementById("form-1").reset();
  document.getElementById("form-2").reset();
  document.getElementById("form-3").reset();
  document.getElementById("form-4").reset();
};
function onConfirm() {
  let form = document.getElementById('form-5');
  if (form) {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      $('#smartwizard').smartWizard("setState", [4], 'error');
      $("#smartwizard").smartWizard('fixHeight');
      return false;
    } else {
      bSavebutton();
    };
  }
};
var texto;
$("#motivo").change(function () {
  texto = $(this).find('option:selected').text().trim();
});
function showConfirm() {
  const name = tex_1;
  const motivo = texto;
  const mComen = $('#mComen').val();
  const cuotas = $("input#loansPayments").val();
  const interes = $("input#yearInterest").val();
  var po = 0;
  for (let i = 0; i < cuota.length; i++) {
    po += cuota[i].mCuota;
  }
  const balance = currency(po);
  let html = `<h4 class="mb-3-">Detalle de Solicitud</h4>
          <hr class="my-2">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label class="col-form-label font-weight-bold">Tipo de Prestamo:</label>
            </div>
            <div class="col-auto">
              <span class="form-text-">${name}</span>
            </div>
          </div>
          <div class="row g-3 align-items-center">
          <div class="col-auto">
          <label class="col-form-label font-weight-bold">Cuotas:</label>
          </div>
            <div class="col-auto">
              <span class="form-text-">${cuotas}</span>
            </div>
          </div>
          <div class="row g-3 align-items-center">
          <div class="col-auto">
          <label class="col-form-label font-weight-bold">Intereses:</label>
          </div>
            <div class="col-auto">
              <span class="form-text-">${interes}</span>
            </div>
          </div>
          <div class="row g-3 align-items-center">
          <div class="col-auto">
          <label class="col-form-label font-weight-bold">Balance:</label>
          </div>
            <div class="col-auto">
              <span class="form-text-">${balance}</span>
            </div>
          </div>

          <h4 class="mt-3">Motivos</h4>
          <hr class="my-2">
          <div class="row g-3 align-items-center">
          <div class="col-auto">
          <label class="col-form-label font-weight-bold">Motivo:</label>
          </div>
            <div class="col-auto">
              <span class="form-text-">${motivo}</span>
            </div>
          </div>
          <div class="row g-3 align-items-center">
          <div class="col-auto">
          <label class="col-form-label font-weight-bold">Observacion:</label>
          </div>
            <div class="col-auto">
              <span class="form-text-">${mComen}</span>
            </div>
          </div>
          
          <h4 class="mt-3">Observaciones de la Solicitud</h4>
          <hr class="my-2">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <span class="form-text-"></span>
            </div>
          </div>`;
  $("#order-details").html(html);
  $('#smartwizard').smartWizard("fixHeight");
};
$(function () {
  // Leave step event is used for validating the forms
  $("#smartwizard").on("leaveStep", function (e, anchorObject, currentStepIdx, nextStepIdx, stepDirection) {
    // Validate only on forward movement  
    if (stepDirection == 'forward') {
      let form = document.getElementById('form-' + (currentStepIdx + 1));
      let form2 = document.getElementById('form-2');
      if (form) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          alerta();
          $('#smartwizard').smartWizard("setState", [currentStepIdx], 'error');
          $("#smartwizard").smartWizard('fixHeight');
          return false;
        }
        if (!form2.checkValidity()) {
          loadbalance();
          num();
          motivoo();
        } else {
          calculateLoans();
          motivoo();
        }
        $('#smartwizard').smartWizard("unsetState", [currentStepIdx], 'error');
      }
    }
  });

  // Step show event
  $("#smartwizard").on("showStep", function (e, anchorObject, stepIndex, stepDirection, stepPosition) {
    $("#prev-btn").removeClass('disabled').prop('disabled', false);
    $("#next-btn").removeClass('disabled').prop('disabled', false);
    if (stepPosition === 'first') {
      $("#prev-btn").addClass('disabled').prop('disabled', true);
    } else if (stepPosition === 'last') {
      $("#next-btn").addClass('disabled').prop('disabled', true);
    } else {
      $("#prev-btn").removeClass('disabled').prop('disabled', false);
      $("#next-btn").removeClass('disabled').prop('disabled', false);
    }
    // Get step info from Smart Wizard
    let stepInfo = $('#smartwizard').smartWizard("getStepInfo");
    $("#sw-current-step").text(stepInfo.currentStep + 1);
    $("#sw-total-step").text(stepInfo.totalSteps);

    if (stepPosition == 'last') {
      showConfirm();
      $("#btnFinish").prop('disabled', false);
    } else {
      $("#btnFinish").prop('disabled', true);
    }

    // Focus first name
    if (stepIndex == 1) {
      setTimeout(() => {
        $('#first-name').focus();
      }, 0);
    }
  });

  // Smart Wizard
  $('#smartwizard').smartWizard({
    selected: 0,
    theme: 'dots',
    autoAdjustHeight: true,
    transition: {
      animation: 'slideHorizontal',
      speed: '400',
    },
    showPasoURLhash: true,
    toolbar: {
      showNextButton: true, // show/hide a Next button
      showPreviousButton: true, // show/hide a Previous button
      position: 'bottom', // none/ top/ both bottom
      extraHtml: `<button class="btn btn-success" id="btnFinish" disabled onclick="onConfirm()">Completar Solicitud</button>
                      <button class="btn btn-danger" id="btnCancel" onclick="onCancel()">Cancelar</button>`
    },
    lang: {
      next: 'Proximo',
      previous: 'Anterior'
    },
    anchor: {
      enableNavigation: true, // Enable/Disable anchor navigation 
      enableNavigationAlways: false, // Activates all anchors clickable always
      enableDoneState: true, // Add done state on visited steps
      markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
      unDoneOnBackNavigation: true, // While navigate back, done state will be cleared
      enableDoneStateNavigation: true // Enable/Disable the done state navigation
    },
  });
  $("#state_selector").on("change", function () {
    $('#smartwizard').smartWizard("setState", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
    return true;
  });

  $("#style_selector").on("change", function () {
    $('#smartwizard').smartWizard("setStyle", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
    return true;
  });
});
$(document).ready(function () {
  const url = `/get-prestamos/${$("#id").text().trim()}`;
  var tablee = $("#tStatus").DataTable({
    ajax: {
      url: url,
      dataSrc: "array1",
    },
    fnDrawCallback: function () {
      const odd = document.querySelectorAll("#tStatus .odd");
      const even = document.querySelectorAll("#tStatus .even");
      for (let i = 0; i < odd.length; i++) {
        odd[i].classList.add("selecTable");
        odd[i].classList.add("tex-color-white");
      }
      for (let i = 0; i < even.length; i++) {
        even[i].classList.add("selecTable");
        even[i].classList.add("tex-color-white");
      }
    },
    language: {
      "decimal": "",
      "emptyTable": "No hay prestamos",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Prestamos",
      "infoEmpty": "Mostrando 0 to 0 of 0 Prestamos",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Prestamos",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
      }
    },
    scrollX: true,
    paging: false,
    searching: false,
    columns: [
      {
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: '',
      },
      { data: "noPrestamo" },
      { data: "date_create" },
      { data: "balance" },
      { data: "nombre" },
    ],
    columnDefs: [
      { targets: [2], render(v) { const date = new Date(v); return formatDate(date) } },
      { targets: [3], render(v) { return currency(v) } },
    ],
    order: [[0, "desc"]],
  });
  $("#statuu").click(() => {
    tablee.ajax.reload(null, false);
  });
  $("#tStatus tbody").on("click", "tr", function () {
    const tr = $(this).closest("tr");
    const row = tablee.row(tr);

    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass("shown");
    } else {
      $("#tdetail").remove();
      row.child(
        `<table cellpadding="5" class="table-striped" id="tdetail" cellspacing="0" border="0" style="width: 100%;">
        <tr>
        <td>no.Cuota</td>
        <td>Cuota</td>
        <td>Capital</td>
        <td>Interes</td>
        <td>Balance</td>
        </tr>
        <tr class="spa-row">
        </tr>
        </table>`
      ).show();
      formate(row.data().noPrestamo)
      tr.addClass("shown");
    }
  });
  function formate(d) {
    let timerInterval
    Swal.fire({
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        fetch(`/get-prestamo/${d}`).then(res => res.ok ? res.json() : Promise.reject(res))
          .then(json => {
            json.forEach(e => {
              $("#tdetail").append(`<tr class="selecTable tex-color-white">
          <td>${e.id_cuota}</td>
          <td>${currency(e.mCuota)}</td>
          <td>${currency(e.mCapital)}</td>
          <td>${currency(e.mInteres)}</td>
          <td>${currency(e.mBalance)}</td>
        </tr>
        <tr class="spa-row">
        </tr>`);
            });
            Swal.close();
          })
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  }
});
