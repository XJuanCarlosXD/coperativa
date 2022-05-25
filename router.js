const express = require("express");
const router = express.Router();

const conexion = require("./database/db");

router.get("/", (req, res) => {
  const { ids } = req.session;
  if (ids === undefined) {
    res.redirect("/login");
  } else {
    res.redirect("/index");
  }
});
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
    conexion.query("SELECT * FROM registro", (error, filas) => {
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
    conexion.query("SELECT *,COUNT(*)as contar FROM registro WHERE id = ?", [id], (error, filas) => {
      if (error) {
        throw error;
      } else {
        conexion.query("SELECT IFNULL(SUM(if(id_trasaccion=2,monto,0)),0)AS retirable,SUM(if(id_trasaccion in(1,2),monto,0)-if(id_trasaccion=3,monto,0))AS prestamo FROM ingresos WHERE id_identidad = ?", [id], (error, resurt) => {
          if (error) {
            throw error;
          } else {
            if (rol == 1) {
              res.render("buscar", { filas: filas, resurt: resurt, name: name, email: email, role: rol, idusers: idusers, img: img });
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
  res.redirect("/public/login/registro.html");
});
//COMPROBANTE
router.get("/comprobante/:id", (req, res) => {
  const id = req.params.id;
  res.redirect('http://localhost/coperativa/templates/views/comprobante.php?id=' + id);
});

//CONTROLLER
const crud = require('./controller/crud');
const users = require('./controller/users');
router.post('/save_ahorros/:id', crud.save_ahorro);
router.post('/register-user', users.save_users);
router.post("/debitar/:id", crud.debitar);
router.post("/edited/:id", users.edit_users);
router.post("/users-register", users.usersRegister);

//EXPORTAR MODULO
module.exports = router;
