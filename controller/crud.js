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

