function buscar_cedula(){
    let cedula = document.getElementById('cedu').value
    let  dataen = 'cedula='+cedula;

    $.ajax({
    type: 'POST',
    url: 'buscar_tabla.php',
    data: dataen,
    success:function(resp){
        $("#dispo").html(resp);
    }     
    })
    return false;
}
function buscar(){
    let cedula = document.getElementById('celu').value
    let  dataen = 'cedula='+cedula;

    $.ajax({
    type: 'POST',
    url: 'search.php',
    data: dataen,
    success:function(resp){
        $("#cedu").html(resp);
    }     
    })
    return false;
}