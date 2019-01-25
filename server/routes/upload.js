const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {
    
    let tipo = req.params.tipo;
    let id = req.params.id;
    
    if (Object.keys(req.files).length == 0) {
      return res.status(400).json({
          ok: false,
          err: {
          message: 'no se ha seleccionado nimgun archivo'
          }
      });
    }

      let tiposValidos = ['producto', 'usuarios'];

      if (tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
                ok:false,
                err: {
                    message: 'no es un tipo permtido'
                }
            });
    }

    let archivo = req.files.archivo;
    let nombreArch = archivo.name.split('.');
    let extension = nombreArch[nombreArch.length - 1];
    // console.log(extension);
    let extensions = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensions.indexOf(extension) < 0){
        return res.status(400).json({
                ok:false,
                err: {
                    message: 'la extension no es valida'
                }
            });
    }

    // cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) =>{
        if (err)
          return res.status(500).json({
            ok:false,
            err
        });
        if(tipo === 'producto'){
           return imagenProducto(id, res, nombreArchivo);
        }
       imagenUsuario(id, res, nombreArchivo);
       

      });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB)=>{

        if(err){
            borraArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!usuarioDB){
        borraArchivo(nombreArchivo, 'usuarios');
        return res.status(400).json({
            ok: false,
            err:{
                message: 'Usuario no existe'
            }
        });
        }

        borraArchivo(usuarioDB.img, 'usuarios');


        usuarioDB.img = nombreArchivo;
        usuarioDB.save ((err, usuarioGuardado)=>{

            res.json({
                ok:true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB)=>{

        if(err){
            borraArchivo(nombreArchivo, 'producto');

            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!productoDB){
        borraArchivo(nombreArchivo, 'producto');
        return res.status(400).json({
            ok: false,
            err:{
                message: 'producto no existe'
            }
        });
        }

        borraArchivo(productoDB.img, 'producto');


        productoDB.img = nombreArchivo;
        productoDB.save ((err, productoGuardado)=>{

            res.json({
                ok:true,
                producto: productoGuardado,
                img: nombreArchivo
            })
        })
    });
}


function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
};






module.exports = app;


