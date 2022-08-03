$(document).ready(function () {
  var tablee = $("#tStatus").DataTable({
    ajax: {
      url: `/get-prestamos/0`,
      dataSrc: "array3",
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
      { data: "noPrestamo" },
    ],
    columnDefs: [
      { targets: [2], render(v) { const date = new Date(v); return formatDate(date) } },
      { targets: [3], render(v) { return currency(v) } },
      { targets: [4], render(v) { return `<a class="btn btn-secondary" href="#${v}"><i class="fa fa-check fa-2x"></i></a>  <a  class="btn btn-secondary" href="#${v}"><i class="fa fa-ban text-danger fa-2x"></i></a> ` } },
    ],
    order: [[1, "desc"]],
  });
  $("#statuu").click(() => {
    tablee.ajax.reload(null, false); searching
  });
  $("#tStatus tbody").on("click", "td.dt-control", function () {
    const tr = $(this).closest("tr");
    const row = tablee.row(tr);

    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass("shown");
    } else {
      $("#tdetail").remove();
      $(".fd").remove();
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
      formate(row.data().noPrestamo);
      tr.addClass("shown");
    }
  });
  /** searching */
  var t = $("#tabla_cedula").DataTable({
    ajax: {
      url: `/get-socios-inco`,
      dataSrc: "filas",
    },
    fnDrawCallback: function () {
      const odd = document.querySelectorAll("#tabla_cedula .odd");
      const even = document.querySelectorAll("#tabla_cedula .even");
      for (let i = 0; i < odd.length; i++) {
        odd[i].classList.add("text-capitalize");
        odd[i].classList.add("selecTable");
        odd[i].classList.add("tex-color-white");
      }
      for (let i = 0; i < even.length; i++) {
        even[i].classList.add("text-capitalize")
        even[i].classList.add("selecTable");
        even[i].classList.add("tex-color-white");
      }
    },
    scrollX: true,
    columns: [
      {
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: '',
      },
      { data: "fullname" },
      { data: "cedula" },
      { data: "profecion" },
      { data: "fecha_entrada" },
    ],
    columnDefs: [
      { targets: [4], render(v) { const date = new Date(v); return formatDate(date) } },
    ],
    order: [[0, "desc"]],
  });
  $("#searching").click(() => {
    t.ajax.reload(null, false);
  });
  $("#tabla_cedula tbody").on("click", "tr", function () {
    const tr = $(this).closest("tr");
    const row = t.row(tr);

    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass('shown');
      tr.removeAttr('style');
    } else {
      row.child(format(row.data())).show();
      tr.addClass('shown');
      tr.css("background-color", "#5778ff");
    }
  });
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
};
function format(d) {
  // `d` is the original data object for the row
  return (
    `<table class="table table-striped" style="width:50px;">
      <tr class="selecTable">
      <td><a class="btn btn-primary btn-sm" href="/buscar/${d.id}"><i class="fa fa-search"></i> Consultar</a>
      <td><a class="btn btn-secondary btn-sm" href="/edit/${d.id}"><i class="fa fa-edit"></i> Editar</a></td>
      </tr>
      </table>`
  );
}
const formatDate = (date) => {
  let formatted_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formatted_date;
};
const currency = function (number) {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
};
