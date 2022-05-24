const mysql = require('mysql');
let conexion = mysql.createConnection({
    host: 'mysql-coopafidb.alwaysdata.net',
    database: 'coopafidb_coperativa',
    user: 'coopafidb',
    password:'AF2021!'
});

conexion.connect(function(error){
if(error){
    throw error;
}else{
    console.log("Conexion exitoxa");
}
});

module.exports = conexion;