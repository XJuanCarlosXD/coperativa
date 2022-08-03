$(document).ready(function () {
    const url = "/account-catalogo";
    var t = $("#tableCuenta").DataTable({
        ajax: {
            url: url,
            dataSrc: "",
        },
        scrollX: true,
        columns: [
            { data: "noCuenta" },
            { data: "nombre" },
        ],
        columnDefs: [
            { targets: [0], className: "font-weight-bold", render(v) { let data = v + ` <a href="#" onclick="buscar('${v}')"><i class="fa fa-search"></i></a>`; return data; } },
            { targets: [1], className: "text-capitalize" },
        ],
        "processing": true,
        "oLanguage": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ Cuentas",
            "sZeroRecords": "No se encontraron cuentas",
            "sEmptyTable": "Ningún cuenta disponible en esta tabla",
            "sInfo": "",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "sInfoPostFix": "",
            "sSearch": "Buscar",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior",
            },
        },
        order: [[0, "asc"]],
    });
    setInterval(() => {
        t.ajax.reload(null, false);
    }, 5000);
});
const buscar = (id) => {
    document.querySelector("#cuenta").value = id;
    document.querySelector("#right").click();
}