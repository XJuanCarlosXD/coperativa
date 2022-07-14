"use strict";

function goToAmortizationTable(n) {
  n && n.stopPropagation();
  $("body, html").animate({
    scrollTop: $(".amortization_table_title").offset().top,
  });
}
function calculateLoans() {
  var h, u, a, n;
  let date = new Date();
  if ($(".loans_calculator_container").hasClass("show_result"))
    $("input#loansPayments").val(undefined),
      $("input#yearInterest").val(undefined),
      $(".cCard").removeClass("d-none"),
      $(".cCardp").removeClass("d-none"),
      $(".cCardt").addClass("d-none"),
      $(".amortization_table_container .amortization_table tbody tr").remove(),
      $(".loans_calculator_container").removeClass("show_result"),
      $(".link_to_table_container").hide(),
      loadbalance(),
      $(".loans_calculator button").removeClass("five");
  else {
    var f = +$("input#amountLoan").val(),
      e = +$("input#loansPayments").val(),
      l = +$("input#yearInterest").val(),
      t = !0;
    if (
      (f <= 0
        ? ($("input#amountLoan").addClass("border-danger").attr("disabled", true), (t = !1), alerta())
        : $("input#amountLoan").removeClass("border-danger"),
        e <= 0
          ? ($("input#loansPayments").addClass("border-danger"), (t = !1), alerta())
          : $("input#loansPayments").removeClass("border-danger"),
        l <= 0
          ? ($("input#yearInterest").addClass("border-danger"), (t = !1), alerta())
          : $("input#yearInterest").removeClass("border-danger"),
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
      for (u = 1; u <= e; u++)
        (r = c * s),
          (a = i - r),
          (n = c - i + r),
          (c = n),
          n < 1 && (n = 0),
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
            ">${formatD(sumDate(date, 30))}</div></th>\n                    
            </tr>\n
            `
          );
      $(".result_message").html(
        "La cuota mensual sería de <strong>$" + formatNumber(i) + "</strong>."
      );
      $(".cCard").addClass("d-none");
      $(".cCardp").addClass("d-none");
      $(".cCardt").removeClass("d-none");
      $("#calculate_button").prop("disabled", !1);
      $(".loans_calculator_container").addClass("show_result");
      $(".link_to_table_container").show();
      $(".loans_calculator button").addClass("five");
    }
  }
}
function formatNumber(n) {
  return n
    ? n.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : n;
}
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
}
$("#prestamo").click(() => {
  loadbalance();
});
const loadbalance = () => {
  const number = $("#id").text()
  try {
    fetch(`/status-User-balance/${number.trim()}`).then(res => res.ok ? res.json() : Promise.reject(res))
      .then(array => {
        array.forEach(e => {
          $("#amountLoan").attr("disabled", true);
          $("#amountLoan").val(e.balance);
        })
      })
  } catch (error) {
    console.log(error)
  }
}
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
      numero = json[0].numeracion
      $("#nume").text(numero).hide();
    });
}
$("#bAutori").click(() => {
  const noCuota = document.querySelectorAll(".noCuota");
  const mCuota = document.querySelectorAll(".mCuota");
  const mCapital = document.querySelectorAll(".mCapital");
  const mInteres = document.querySelectorAll(".mInteres");
  const mBalance = document.querySelectorAll(".mBalance");
  const dDate = document.querySelectorAll(".dDate");
  num()
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
          Swal.showLoading();
          try {
            fetch(`/create-lend%Lease/detail/${$("#id").text().trim()}`, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                noPrestamo: $("#nume").text().trim(),
                mBalance: mBalance[0].innerHTML.replace(/[$]/g, ''),
              })
            })
              for (let i = 0; i < noCuota.length; i++) {
                fetch(`/create-lend%Lease/cuota/${$("#id").text().trim()}`, {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify({
                    noCuota: noCuota[i].innerHTML,
                    noPrestamo: $("#nume").text().trim(),
                    mCuota: mCuota[i].innerHTML.replace(/[$]/g, ''),
                    mCapital: mCapital[i].innerHTML.replace(/[$]/g, ''),
                    mInteres: mInteres[i].innerHTML.replace(/[$]/g, ''),
                    mBalance: mBalance[i].innerHTML.replace(/[$]/g, ''),
                    dDate: dDate[i].innerHTML.trim(),
                  })
                });
              }
          } catch (error) {
            console.log(error);
          }
          Swal.close()
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
        }
      })
    } else if (result.isDenied) {
      Swal.fire("Cambios no Guardados", "", "info");
    }
  });
});

const sumDate = (date, numDate) => {
  date.setDate(date.getDate() + numDate);
  return date;
};
const formatD = (date) => {
  let formatted_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return formatted_date;
};