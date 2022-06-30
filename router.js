const express = require("express");
const router = express.Router();

const conexion = require("./database/db");
const query = require('./database/query');

router.get("/", (req, res) => {
  const { ids } = req.session;
  if (ids === undefined) {
    res.redirect("/login");
  } else {
    res.redirect("/index");
  }
});
/**router.get("/", (req, res) => {
    res.redirect("/index");
});
*/
router.get("/login" || "/auth/login", (req, res) => {
  const { ids } = req.session;
  if (ids === undefined) {
    res.render("login", {
      alert: "underfine",
      alertTitle: "",
      alertMessage: "",
      alertIcon: "",
      showConfimButton: true,
      timer: false,
      ruta: ""
    });
  } else {
    res.redirect("/index");
  }
});
//INDEX
router.get("/index", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  if (ids === undefined) {
    res.render("login", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Usuario inactivo o no ha iniciado session",
      alertIcon: "error",
      showConfimButton: true,
      timer: 1500,
      ruta: "/login"
    });
  } else {
    conexion.query("SELECT *,LOWER(CONCAT(nombre,' ',apellido))AS fullname FROM registro", (error, filas) => {
      if (error) {
        throw error;
      } else {
        conexion.query("SELECT id,name,idrole FROM users", (error, resurt) => {
          if (error) {
            throw error;
          } else {
            res.render("index", {
              resurt: resurt,
              filas: filas,
              name: name,
              email: email,
              role: rol,
              idusers: idusers,
              img: img,
            });
          }
        });
      }
    });
  }
});
// PAGINA ERROR
router.get('/error-page', (req, res) => {
  res.redirect('/public/error.html');
});
//BUSCAR SOOCCIOS
router.get("/buscar/:id", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  if (ids === undefined) {
    res.render("login", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Usuario inactivo o no ha iniciado session",
      alertIcon: "error",
      showConfimButton: true,
      timer: 1500,
      ruta: "/login"
    });
  } else {
    const id = req.params.id;
    conexion.query("SELECT *,COUNT(*)as contar,LOWER(CONCAT(r.nombre,' ',r.apellido))AS fullname,LOWER(r.nombre)AS nombre,LOWER(r.profecion)AS profecion,LOWER(CONCAT(p.nombre,' ',r.direccion))AS direccion  FROM coopafidb_coperativa.registro r INNER JOIN coopafidb_coperativa.provincias p ON p.provincia_id=r.id_provincia INNER JOIN coopafidb_coperativa.municipios m ON m.municipio_id=r.id_municipio WHERE r.id= ?", [id], (error, filas) => {
      if (error) {
        throw error;
      } else {
        conexion.query("SELECT IFNULL(SUM(if(id_trasaccion=2,monto,0)),0)AS retirable,SUM(if(id_trasaccion in(1,2),monto,0)-if(id_trasaccion=3,monto,0))AS prestamo FROM ingresos WHERE id_identidad = ?", [id], (error, resurt) => {
          if (error) {
            throw error;
          } else {
            if (rol == 1) {
              conexion.query("SELECT *,LOWER(CONCAT(nombre,' ',apellido))AS fullname FROM registro", (error, busqueda) => {
                res.render("buscar", { filas: filas, resurt: resurt, name: name, email: email, role: rol, idusers: idusers, img: img, busqueda: busqueda });
              });
            } else if (rol == 2) {
              if (idusers == id) {
                res.render("buscar", { filas: filas, resurt: resurt, name: name, email: email, role: rol, idusers: idusers, img: img });
              } else {
                res.redirect("/error-page");
              }
            }

          }
        });
      }
    });
  }
});
router.get("/history/:id", (req, res) => {
  const { ids } = req.session;
  if (ids === undefined) {
    res.send("No se encontraron resultados");
  } else {
    const id = req.params.id;
    conexion.query("SELECT *,if(id_trasaccion in(1,2),monto,0)as ingreso,if(id_trasaccion=3,monto,0)as debito FROM ingresos WHERE id_identidad = ?", [id], (error, resurt) => {
      if (error) {
        throw error;
      } else {
        res.send(resurt);
      }
    });
  }
});
//EDITAR
router.get("/edit/:id", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  if (ids === undefined) {
    res.render("login", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Usuario inactivo o no ha iniciado session",
      alertIcon: "error",
      showConfimButton: true,
      timer: 1500,
      ruta: "/login"
    });
  } else {
    const id = req.params.id;
    conexion.query("SELECT *,COUNT(*)as contar FROM registro WHERE id = ?", [id], (error, filas) => {
      if (error) {
        throw error;
      } else {
        res.render("edit", { filas: filas, name: name, email: email, role: rol, idusers: idusers, img: img });
      }
    });
  }
});
//Role mantenimiento
router.get("/role/:id", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  if (ids === undefined) {
    res.render("login", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Usuario inactivo o no ha iniciado session",
      alertIcon: "error",
      showConfimButton: true,
      timer: 1500,
      ruta: "/login"
    });
  } else {
    const id = req.params.id;
    conexion.query("SELECT id,name,idrole FROM users WHERE id = ?", [id], (error, filas) => {
      if (error) {
        throw error;
      } else {
        res.render("role", { filas: filas, name: name, email: email, role: rol, idusers: idusers, img: img });
      }
    });
  }
});
//REGISTER SOCCIOS
router.get("/register", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  if (ids === undefined) {
    res.render("login", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Usuario inactivo o no ha iniciado session",
      alertIcon: "error",
      showConfimButton: true,
      timer: 1500,
      ruta: "/login"
    });
  } else {
    conexion.query("SELECT * FROM provincias", (error, resurt) => {
      res.render("registro", { name: name, email: email, role: rol, idusers: idusers, img: img, resurt: resurt });
    })
  }
});
//COMPROBANTE
router.get("/comprobante/:id", (req, res) => {
  const id = req.params.id;
  res.redirect('/templates/views/comprobante.php?id=' + id);
});
router.get("/contabilidad", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  res.render("contabilidad/views/index", { name: name, email: email, role: rol, id: ids, img: img });
});
router.get("/account-catalogo", (req, res) => {
  conexion.query("SELECT *,LOWER(nombre)AS nombre FROM catalogo", (error, resurt) => {
    try {
      res.send(resurt);
    } catch (error) {
      console.log("ha ocurrido un error");
      throw error;
    }
  })
});
router.get("/account-catalogo/:id", (req, res) => {
  const { id } = req.params
  conexion.query("SELECT *,LOWER(nombre)AS nombre FROM catalogo where noCuenta = ?", [id], (error, resurt) => {
    try {
      res.send(resurt);
    } catch (error) {
      console.log("ha ocurrido un error");
      throw error;
    }
  })
});
router.get("/numberCatalogo", (req, res) => {
  conexion.query("SELECT noCuenta FROM catalogo", (error, resurt) => {
    try {
      res.send(resurt);
    } catch (error) {
      console.log("ha ocurrido un error");
      throw error;
    }
  })
});
/** reporte */
router.get("/chart", (req, res) => {
  const { name, email, rol, idusers, ids, img } = req.session;
  if (ids === undefined) {
    res.redirect("/login");
  } else {
    res.render('chart', { name: name, email: email, role: rol, idusers: idusers, img: img })
  }
});
/** APIS */
router.get("/municipio/:id", (req, res) => {
  const { id } = req.params;
  conexion.query("SELECT * FROM municipios WHERE provincia_id = ?", [id], (error, row) => {
    res.send(row);
  });
});
router.get("/sector/:id", (req, res) => {
  const { id } = req.params;
  conexion.query("SELECT * FROM distritos_municipales WHERE municipio_id = ?", [id], (error, row) => {
    res.send(row);
  });
});
router.get("/bancos", (req, res) => {
  const { id } = req.params;
  conexion.query("SELECT * FROM bancos", [id], (error, row) => {
    res.send(row);
  });
});
router.get("/tipo-cuenta/:id", (req, res) => {
  const { id } = req.params;
  conexion.query(`SELECT * FROM tipo WHERE noCuenta LIKE '${id}%' `, (error, resurt) => {
    try {
      res.send(resurt);
    } catch (error) {
      console.log(error);
    }
  })
});
router.get("/clase-cuenta/:id", (req, res) => {
  const { id } = req.params;
  conexion.query("SELECT * FROM clase WHERE id_clase= ?", [id], (error, resurt) => {
    try {
      res.send(resurt);
    } catch (error) {
      console.log(error);
    }
  })
});
router.get('/status-User-coopafi', query.statusUsers);
//CONTROLLER
const crud = require('./controller/crud');
const users = require('./controller/users');
router.post('/save_ahorros/:id', crud.save_ahorro);
router.post('/register-user', users.save_users);
router.post("/debitar/:id", crud.debitar);
router.post("/edited/:id", users.edit_users);
router.post("/users-register", users.usersRegister);
router.post("/create-account", crud.createAccount);
router.post("/update-account/:id", crud.UpdateAccount);

//EXPORTAR MODULO
module.exports = router;
