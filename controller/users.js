const conexion = require("../database/db");
const transporter = require("../database/email");

//CREAR USUARIOS
exports.usersRegister = (req, res) => {
    const {name, email, password, passwordConfi, radio} = req.body;
    if(password != passwordConfi){
      res.redirect("/");
    }else{}
    conexion.query(
      "INSERT INTO users SET ?",
      {
        name: name,
        email: email,
        password: password,
        img: '',
        idrole: radio,
      },
      (error) => {
        if (error) {
          throw error;
        }else{
          res.redirect("/");
        }
      }
    );
  }
  //EDITAR SOCCIOS
exports.edit_users = (req, res) => {
    const id = req.params.id;
   res.redirect("/edit/" + id);
  };
// CREATE SOCCIOS
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

//validar cuenta
exports.SeccionStar = (req, res) => {
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
                  ruta:"/"
              });
          }else{
            req.session.ids = resurt[0].id;
            req.session.name = resurt[0].name;
            req.session.email = resurt[0].email;
            req.session.rol = resurt[0].idrole;
            req.session.img = resurt[0].img;
            req.session.idusers = resurt[0].idusers;
            res.render("/",transporter.emailStar);      
            res.render("login",{
                alert: true,
                alertTitle: "Conexion Exitosa",
                alertMessage: "Inicio de Seccion Correcto",
                alertIcon: "success",
                showConfimButton: true,
                timer: 1500,
                ruta:"/"
            });
          }
      }else{
          res.send('Por favor ingrese usuario y/o password')
      }
    }
  })
}