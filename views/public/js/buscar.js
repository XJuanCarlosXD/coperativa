function buscar(id){
    let  dataen = 'id='+id;

    $.ajax({
    type: 'POST',
    url: '/user/'+id,
    data: dataen,
    success:function(resp){
        $("#resp").html(resp);
    }     
    })
    return false;
}