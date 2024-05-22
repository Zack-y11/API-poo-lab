const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bakestudiantes = require('./rutas/hogar');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('This is my API')
})

app.use('/api/hogar', bakestudiantes);

//conectarse a la BD
mongoose.connect('mongodb://localhost:27017/dbvivienda');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexion a MongoBD'));
db.once('open', ()=> {
    console.log('Conectado a la BD')
})

app.listen(port, () => {
    console.log(`API activa`)
    console.log(`http://localhost:${port}`)
})