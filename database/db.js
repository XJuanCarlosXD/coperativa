const mysql = require('mysql');
let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'coperativa',
    user: 'root',
    password:''
});

conexion.connect(function(error){
if(error){
    throw error;
}else{
    console.log("Conexion exitoxa");
}
});

module.exports = conexion;