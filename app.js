const express = require("express")
const session = require("express-session");
const bodyParser = require("body-parser");
const conexion = require("./database/db");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(session({
  secret: 'AF 2121!',
  resave: false,
  saveUninitialized: true,
}));

app.use('/',require('./router'));

app.post("/auth",(req, res)=> {
  const {email, password} = req.body;
  conexion.query("SELECT * FROM users WHERE email = ? AND password = ?",[email,password] ,(error, resurt)=>{
      if(error){
          throw error;
      }else{
      if(email && password){
          if(resurt.length == 0){
              res.render("login",{
                  alert: true,
                  alertTitle: "Error",
                  alertMessage: "Usuario y/o password incorrectas",
                  alertIcon: "error",
                  showConfimButton: true,
                  timer: false,
                  ruta:"/login"
              });
          }else{
            req.session.ids = resurt[0].id;
            req.session.name = resurt[0].name;
            req.session.email = resurt[0].email;
            req.session.rol = resurt[0].idrole;
            req.session.img = resurt[0].img;
            req.session.idusers = resurt[0].idusers;
            res.render("login",{
                alert: true,
                alertTitle: "Conexion Exitosa",
                alertMessage: "Inicio de Seccion Correcto",
                alertIcon: "success",
                showConfimButton: true,
                timer: 1500,
                ruta:"/index"
            });
          }
      }else{
          res.send('Por favor ingrese usuario y/o password')
      }
    }
  })
})

app.get("/exit",(req, res)=>{
  req.session.destroy(function(error) {
    if(error){
      throw error;
    }else{
      res.redirect("/login");
    }
  })
})

app.use((req, res) => {
  res.status(404).redirect('/public/error.html');
});

app.listen(port, () => console.log(`Hola e iniciado el servidor en el puerto http://localhost${port}/`))