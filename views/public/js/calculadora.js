"use strict";

function goToAmortizationTable(n) {
  n && n.stopPropagation();
  $("body, html").animate({
    scrollTop: $(".amortization_table_title").offset().top,
  });
}
function calculateLoans() {
  var h, u, a, n;
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
      $(".loans_calculator button").removeClass("five"),
      screen.width < 960 && showElement($(".info_calculator_box .info_container"));
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
      screen.width < 960 && $(".info_calculator_box .info_container").hide();
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
            </tr>\n                `
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

$("#bAutori").click(() => {
  const noCuota = document.querySelectorAll(".noCuota");
  const mCuota = document.querySelectorAll(".mCuota");
  const mCapital = document.querySelectorAll(".mCapital");
  const mInteres = document.querySelectorAll(".mInteres");
  const mBalance = document.querySelectorAll(".mBalance");
  for (let i = 0; i < noCuota.length; i++) {
    try {
      fetch('/create-lend%Lease', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          noCuota: noCuota[i].innerHTML,
          mCuota: mCuota[i].innerHTML.replace(/[$]/g, ''),
          mCapital: mCapital[i].innerHTML.replace(/[$]/g, ''),
          mInteres: mInteres[i].innerHTML.replace(/[$]/g, ''),
          mBalance: mBalance[i].innerHTML.replace(/[$]/g, ''),
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
});