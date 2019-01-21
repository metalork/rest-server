require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../public')));

// configuracion global de rutas
app.use(require ('./routes/index'));

process.env.CLIENT_ID = process.env.CLIENT_ID || '470553242798-bk162uuud67uoj5ho5kofjejcli35vq2.apps.googleusercontent.com'

mongoose.connect(process.env.URLDB, (err, res)=>{
    if (err) throw err;
    console.log('base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});