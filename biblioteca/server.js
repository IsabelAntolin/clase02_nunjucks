const express = require('express');
//const router = require('./router')
const routerAutores =require('./routes/autoresRouters')
const routerLibros =require('./routes/librosRouters')
const path = require("path");
const nunjucks = require("nunjucks");

const app = express()
//configuracion de archivos estaticos
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
//configurar nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: false,
  watch: true,
});

//configurar formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use('/api',router)
app.use( routerAutores)
app.use( routerLibros)

// Ruta por defecto
app.get('*', (req, res) => {
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto http://localhost:3000/`);
});