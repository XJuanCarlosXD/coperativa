const conexion = require("../database/db");

var hoy = new Date();
var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() ;
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
const fulldate = fecha +' ' + hora;
exports.save_ahorro = (req, res) => {
  const id = req.params.id;
  const fecha = req.body.fecha;
  const monto_1 = req.body.monto_1;
  const monto_2 = req.body.monto_2;
  const tipo = req.body.tipo;
  const metodo = req.body.metodo;
  const comentario = req.body.comentario;
  if (tipo == 4 || tipo == 5) {
    conexion.query(
      "SELECT ifnull(SUM(if(id_trasaccion in(1,2),monto,0)-if(id_trasaccion=3,monto,0)),0)as monto FROM ingresos WHERE id_identidad =?",
      [id],
      (error, filas) => {
        if (error) {
          throw error;
        } else {
          filas.forEach((filas) => {
            let mon = filas.monto;
              const balance = parseFloat(mon) + parseFloat(monto_2);
              conexion.query(
                "INSERT INTO ingresos SET ?",
                {
                  id_identidad: id,
                  id_trasaccion: 1,
                  tipo_ahorro: tipo,
                  id_metodo: metodo,
                  monto: monto_2,
                  comentario: comentario,
                  fecha: fecha,
                  balance: balance,
                },
                (error) => {
                  if (error) {
                    throw error;
                  }
                }
              );
          });
        }
      }
    );
  } else {
    conexion.query(
      "SELECT ifnull(SUM(if(id_trasaccion in(1,2),monto,0)-if(id_trasaccion=3,monto,0)),0)as monto FROM ingresos WHERE id_identidad =?",
      [id],
      (error, filas) => {
        if (error) {
          throw error;
        } else {
          filas.forEach((filas) => {
            let mon = filas.monto;
              const balance = parseFloat(mon) + parseFloat(monto_2);
              const balance1 = parseFloat(mon) + parseFloat(monto_1) + parseFloat(monto_2);
            conexion.query(
              "INSERT INTO ingresos SET ?",
              {
                id_identidad: id,
                id_trasaccion: 2,
                tipo_ahorro: tipo,
                id_metodo: metodo,
                monto: monto_2,
                comentario: comentario,
                fecha: fecha,
                balance: balance,
              },
              (error) => {
                if (error) {
                  throw error;
                }
              }
            );
            conexion.query(
              "INSERT INTO ingresos SET ?",
              {
                id_identidad: id,
                id_trasaccion: 1,
                tipo_ahorro: tipo,
                id_metodo: metodo,
                monto: monto_1,
                comentario: comentario,
                fecha: fecha,
                balance: balance1,
              },
              (error) => {
                if (error) {
                  throw error;
                }
              }
            );
          });
        }
      }
    );
  }
  res.redirect("/buscar/" + id);
};
exports.save_users = (req, res) => {
  //informacion personal
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const correo = req.body.correo;
  const fecha_n = req.body.fecha_n;
  const estado = req.body.estado;
  const profeccion = req.body.profeccion;
  const telefono = req.body.telefono;
  const celular = req.body.celular;
  const genero = req.body.genero;
  const cuotas = req.body.cuotas;
  const id_identidad = req.body.id_identidad;
  const cedula = req.body.cedula;
  //direcciones
  const direccion = req.body.direccion;
  const sector = req.body.sector;
  const ciudad = req.body.ciudad;
  const pais = req.body.pais;
  const nacionalidad = req.body.nacionalidad;
  //info laboral
  const empresa = req.body.empresa;
  const puesto = req.body.puesto;
  const tiempo = req.body.tiempo;
  const salario = req.body.salario;
  const pose = req.body.pose;
  if (pose ==1) {
    var name_bank = req.body.banco;
    var no_cuenta = req.body.no_cuenta;
  }else{
    var name_bank = "No posee";
    var no_cuenta = "No posee";
  }
  conexion.query("INSERT INTO registro SET ?", {
    id_identificacion: id_identidad,
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono,
    celular: celular,
    estado_civil: estado,
    fecha_nacimiento: fecha_n,
    direccion: direccion,
    sector: sector,
    ciudad: ciudad,
    nacionalidad: nacionalidad,
    pais: pais,
    profecion: profeccion,
    fecha_entrada: fulldate,
    empresa: empresa,
    posicion: puesto,
    tiempo: tiempo,
    salario: salario,
    banco: name_bank,
    no_cuenta: no_cuenta,
    cuota: cuotas,
    genero: genero
  }, (error, resurt) => {
    if (error) {
      throw error;
    }
  });
  res.redirect("/public/login/registro.html");
};

exports.debitar = (req, res) => {
 const id = req.params.id;
 const fecha = req.body.fecha;
 const monto = req.body.monto;
 const metodo = req.body.metodo;
 const comentario = req.body.comentario;
 conexion.query(
  "SELECT ifnull(SUM(if(id_trasaccion in(1,2),monto,0)-if(id_trasaccion=3,monto,0)),0)as monto FROM ingresos WHERE id_identidad =?",
  [id],
  (error, filas) => {
    if (error) {
      throw error;
    } else {
      filas.forEach((filas) => {
        let mon = filas.monto;
          const balance = parseFloat(mon) - parseFloat(monto);
        conexion.query(
          "INSERT INTO ingresos SET ?",
          {
            id_identidad: id,
            id_trasaccion: 3,
            tipo_ahorro: 6,
            id_metodo: metodo,
            monto: monto,
            comentario: comentario,
            fecha: fecha,
            balance: balance,
          },
          (error) => {
            if (error) {
              throw error;
            }
          }
        );
      });
    }
  });
  res.redirect("/buscar/" + id);
}