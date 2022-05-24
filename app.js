const express = require('express')
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/', require('./router'));

app.use((req, res) => {
  res.status(404).redirect('/public/error.html');
});

app.listen(port, () => console.log(`Hola e iniciado el servidor en el puerto http://localhost${port}/`))