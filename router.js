const express = require("express");
const router = express.Router();

let conexion = require("./database/db");
//INDEX
router.get("/", (req, res) => {
  conexion.query("SELECT * FROM registro", (error, filas) => {
    if (error) {
      throw error;
    } else {
      res.render("index", { filas: filas });
    }
  });
});
// PAGINA ERROR
router.get('/error-page', (req, res) => {
  res.redirect('/public/error.html');
});
//BUSCAR SOOCCIOS
router.get("/buscar/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT *,COUNT(*)as contar FROM registro WHERE id = ?", [id], (error, filas) => {
    if (error) {
      throw error;
    } else {
      conexion.query("SELECT SUM(if(id_trasaccion=2,monto,0))AS retirable,SUM(if(id_trasaccion in(1,2),monto,0)-if(id_trasaccion=3,monto,0))AS prestamo FROM ingresos WHERE id_identidad = ?", [id], (error, resurt) => {
        if (error) {
          throw error;
        } else {
          res.render("buscar", { filas: filas, resurt: resurt });
        }
      });
    }
  });
});
router.get("/history/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT *,if(id_trasaccion in(1,2),monto,0)as ingreso,if(id_trasaccion=3,monto,0)as debito FROM ingresos WHERE id_identidad = ?", [id], (error, resurt) => {
    if (error) {
      throw error;
    } else {
      res.send(resurt);
    }
  });
});
//EDITAR
router.get("/edit/id",(req, res) =>{
const id = req.params.id;
conexion.query("SELECT *,COUNT(*)as contar FROM registro WHERE id = ?",[id],(error,filas) =>{
if(error){
  throw error;
}else{
  res.render("edit",{filas: filas});
}
});
});
//REGISTER SOCCIOS
router.get("/register",(req, res) => {
  res.redirect("/public/login/registro.html");
});
//COMPROBANTE
router.get("/comprobante/:id", (req, res) => {
  const id = req.params.id;
  res.redirect('http://localhost/coperativa/templates/views/comprobante.php?id=' + id);
});

//CONTROLLER
const crud = require('./controller/crud');
const { route } = require("express/lib/application");
router.post('/save_ahorros/:id', crud.save_ahorro);
router.post('/register-user',crud.save_users);
router.post("/debitar/:id",crud.debitar);

//EXPORTAR MODULO
module.exports = router;
