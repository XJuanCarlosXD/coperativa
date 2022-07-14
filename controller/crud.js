const conexion = require("../database/db");

var hoy = new Date();
var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
const fulldate = fecha + ' ' + hora;
exports.save_ahorro = (req, res) => {
  const id = req.params.id;
  const fecha = req.body.fecha;
  const monto_1 = req.body.monto_1;
  const monto_2 = req.body.monto_2;
  const tipo = req.body.tipo;
  const metodo = req.body.metodo;
  const comentario = req.body.comentario;
  if (tipo == 4) {
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
          });
        }
      }
    );
  } else if (tipo == 5) {
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
                id_trasaccion: 4,
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
  }
  else {
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
                comentario: "Aporte a ahorro retirables",
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
exports.createAccount = (req, res) => {
  const { ids } = req.session;
  const { Nocuenta, nCuenta, tipo, clase, movimiento, moneda, nota } = req.body
  try {
    conexion.query("INSERT INTO catalogo SET ?", {
      noCuenta: Nocuenta,
      nombre: nCuenta,
      tipo: tipo,
      clase: clase,
      acMovimiento: movimiento,
      estado: 3,
      date_create: fulldate,
      moneda: moneda,
      nota: nota,
      user_create: ids
    });
    console.log("Cuenta Creada")
  } catch (error) {
    console.log("Ha ocurrido un error");
    throw error;
  }
};
exports.UpdateAccount = (req, res) => {
  const { ids } = req.session;
  const { id } = req.params;
  const { nCuenta, tipo, clase, movimiento, moneda, nota, estado } = req.body
  try {
    conexion.query("UPDATE catalogo SET ? WHERE noCuenta = ?", [{
      nombre: nCuenta,
      tipo: tipo,
      clase: clase,
      acMovimiento: movimiento,
      estado: estado,
      moneda: moneda,
      nota: nota,
      user_create: ids,
    }, id]);
    console.log("Cuenta actualizada");
  } catch (error) {
    console.log("Ha ocurrido un error");
    throw error;
  }
};
exports.save_AsientDetalle = (req, res) => {
  const { id } = req.params;
  const { ids } = req.session;
  const { fecha, referencia, observa, sMoneda } = req.body;
  try {
    conexion.query("INSERT INTO detalle_asiento SET ?", {
      noAsiento: id,
      date: fecha,
      referencia: referencia,
      observaciones: observa,
      moneda: sMoneda,
      date_create: fulldate,
      user_create: ids,
      status_id: 3,
    });
    console.log("detalle de asiento guardado");
  } catch (error) {
    console.log("Ha ocurrido un error");
    throw error;
  }
};
exports.save_cuentaAsiento = (req, res) => {
  const { id } = req.params;
  const { sCuenta, descripcion, sCosto, tipo, monto } = req.body;
  try {
    conexion.query("INSERT INTO asientos SET ?", {
      id_noAsiento: id,
      id_noCuenta: sCuenta,
      descripcion: descripcion,
      costo: sCosto,
      tipo: tipo,
      monto: monto,
    });
    conexion.query("UPDATE numeraciones SET ? WHERE id_number = ?", [{
      numeracion: parseFloat(id) + 1,
    }, 1]);
    console.log("Asiento guardado exito");
  } catch (error) {
    console.log("Ha ocurrido un error");
    throw error;
  }
};
exports.anularAccount = (req, res) => {
  const { ids } = req.session;
  const { id } = req.params;
  const { detalle } = req.body;
  try {
    conexion.query("UPDATE detalle_asiento SET ? WHERE noAsiento = ?", [{
      user_nulo: ids,
      status_id: 5,
    }, id]);
    conexion.query("INSERT INTO anulacion SET ?", {
      noAnulacion: id,
      detalle: detalle,
      user_create: ids,
    });
    conexion.query("SELECT * FROM numeraciones WHERE id_number = ?", [2], (error, resurt) => {
      conexion.query("UPDATE numeraciones SET ? WHERE id_number = ?", [{
        numeracion: parseFloat(resurt[0].numeracion) + 1,
      }, 2]);
    })
    console.log("asiento anulado");
  } catch (error) {
    console.log("Ha ocurrido un error");
    throw error;
  }
};
exports.createLease_cuota = (req, res) => {
  const { id } = req.params;
  const { noCuota, mCuota, mCapital, noPrestamo, mInteres, mBalance,dDate } = req.body;
  try {
    conexion.query("INSERT INTO cuotas SET ?", {
      noSocio: id,
      noPrestamo: noPrestamo,
      id_cuota: noCuota,
      mCuota: mCuota.replace(/[,]/g, ''),
      mCapital: mCapital.replace(/[,]/g, ''),
      mInteres: mInteres.replace(/[,]/g, ''),
      mBalance: mBalance.replace(/[,]/g, ''),
      dDate:dDate,
    });
    console.log("Cuotas creada exitoxamente!");
  } catch (error) {
    console.log("A occurrido un error al crear el prestamo");
    throw error;
  }
};
exports.createLease_detail = (req, res) => {
  const { id } = req.params;
  const { ids } = req.session;
  const { noPrestamo, mBalance } = req.body;
  try {
    conexion.query("INSERT INTO detalle_prestamo SET ?", {
      noSocio: id,
      user_create:ids,
      noPrestamo:noPrestamo,
      balance: mBalance.replace(/[,]/g, ''),
      date_create:fulldate,
    });
    console.log("detalle prestamo creado exitoxamente!");
  } catch (error) {
    console.log("A occurrido un error al crear el prestamo");
    throw error;
  }
};