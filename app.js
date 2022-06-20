const express = require("express")
const session = require("express-session");
const bodyParser = require("body-parser");
const MySQLStore = require('express-mysql-session');
const options = require("./database/dbstore");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const sessionStore = new MySQLStore(options);
app.use(session({
  key: 'cookie-user',
  secret: 'asdiokijiqwwk1234343dsq!',
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  secure: true,
}));
app.use('/',require('./router'));

const users = require('./controller/users');
app.post("/auth",users.SeccionStar)

app.get("/exit",(req, res)=>{
  req.session.destroy(function(error) {
    if(error){
      throw error;
    }else{
      res.redirect("/login");
    }
  })
});

app.use((req, res) => {
  res.status(404).redirect('/public/error.html');
});

app.listen(port, () => console.log(`Hola e iniciado el servidor en el puerto http://localhost ${port}/`))