$(document).ready(function () {
    const url = "/status-User-coopafi";
    var t = $("#estado").DataTable({
        ajax: {
            url: url,
            dataSrc: "",
        },
        dom: "Bfrtip",
        buttons: {
            dom: {
                button: {
                    classNames: 'btn'
                },
            }
        },
        buttons: [{
            extend: "excel",
            text: "EXCEL",
            className: "btn btn-success",
            excelStyles: {
                template: "blue_medium",
            }
        }, {
            extend: "pdf",
            text: "PDF",
            className: "btn btn-danger",
            excelStyles: {
                template: "blue_medium",
            }
        }],
        scrollX: true,
        columns: [
            { data: "name" },
            { data: "ahorro" },
            { data: "ahorro_retirable" },
            { data: "totalAhorro" },
            { data: "retiros" },
            { data: "inscripcion" },
            { data: "balance" },
        ],
        columnDefs: [
            { targets: [0], searchable: false, className: "text-capitalize", orderable: false },
            { targets: [1], class: "text-primary", render(v) { return currency(v) } },
            { targets: [2], class: "text-warning", render(v) { return currency(v) } },
            { targets: [3], class: "text-success", render(v) { return currency(v) } },
            { targets: [4], class: "text-danger", render(v) { return currency(v) } },
            { targets: [5], class: "text-primary", render(v) { return currency(v) } },
            { targets: [6], class: "text-dark", render(v) { return currency(v) } },
        ],
        order: [[6, "desc"]],
    });
});
const currency = function (number) {
    return new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(number);
};