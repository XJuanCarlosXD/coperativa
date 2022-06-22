$(document).ready(function () {
  const id = document.getElementById('id').value;
  const url = "/history/" + id;
  var t = $("#HistoryTable").DataTable({
    ajax: {
      url: url,
      dataSrc: "",
    },
    scrollX: true,
    columns: [
      { data: "id" },
      { data: "id" },
      { data: "comentario" },
      { data: "fecha" },
      { data: "ingreso" },
      { data: "debito" },
      { data: "balance" },
      { data: "id" },
    ],
    columnDefs: [
      {targets: [0], responsivePriority: 1, searchable: false, className: "dt-control", orderable: false},
      {targets: [2], responsivePriority: 1},
      { targets: [3], responsivePriority: 1, render(v){ let date = new Date(v); return formatDate(date)} },
      { targets: [4], class: "text-primary", render(v){return currency(v)} },
      { targets: [5], class: "text-warning" ,render(v){return currency(v)} },
      { targets: [6], responsivePriority: 1, class: "text-dark" ,render(v){return currency(v)} },
      { targets: [7], class: "d-none"},
    ],
    order: [[7, "desc"]],
  });
  t.on("order.dt search.dt", function () {
    t.column(0, { search: "applied", order: "applied" })
      .nodes()
      .each(function (cell) {
          cell.innerHTML = "";
      });
  }).draw();

  function format ( d ) {
    const metodo = d.id_metodo;
    if (metodo == 1){
      var pago = "Efectivo";
    }else if(metodo == 2){
      var pago = "Deposito";
    }else if(metodo == 3){
      var pago = "Trasferencia";
    }else if(metodo == 4){
      var pago = "Cheque";
    }
    const Trasaccion = d.id_trasaccion;
    if (Trasaccion == 1){
      var transa = "Aporte a Capital";
    }else if(Trasaccion == 2){
      var transa = "Ahorro Retiable";
    }else if(Trasaccion == 3){
      var transa = "Debito Retirable";
    }else if(Trasaccion == 4){
      var transa = "Cuota de inscripcion";
    }
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Tipo de Trasaccion:</td>'+
            '<td>'+transa+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Metodo de Pago:</td>'+
            '<td>'+pago+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Acciones:</td>'+
            '<td><div class="btn-group row"><a class="btn btn-primary" href="/comprobante/'+d.id+'"><i class="bi bi-printer"></i></a>' +
            '<a class="btn btn-danger" href="/comprobante/'+d.id+'"><i class="bi bi-x-square"></i></a><div></td>'+
        '</tr>'+
    '</table>';
}
  $("#HistoryTable tbody").on("click", "td.dt-control", function () {
    var tr = $(this).closest("tr");
    var row = t.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass("shown");
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass("shown");
    }
  });
  
  setInterval (function () {
    t.ajax.reload (null, false);
  }, 5000);
});
const formatDate = (date) => {
  let formatted_date =
    (date.getDate() + 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formatted_date;
};
const currency = function (number) {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
};
