require('./config/config')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

 app.use(bodyParser.urlencoded({extended: false}))

 app.use(bodyParser.json())


app.get('/usuario', function (req, res) {
  res.json('deg usuario local')

});

app.post('/usuario', function (req, res) {
    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre enviado no es correcto'
        });
    }else{
      res.json({
          persona: body});  
    }


  });

app.put('/usuario/:id', function (req, res) {
    
    let id = req.params.id;
  
    res.jason({
        id
    });
  });
 
app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
  });

app.listen(process.env.PORT,() => {
    console.log('Escuchando puertos: ', process.env.PORT);
});