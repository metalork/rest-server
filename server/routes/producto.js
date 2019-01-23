const express = require('express');

let {verificaToken, verificaAdmin_Role} =require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

const _ = require('underscore');



app.get('/producto', verificaToken, (req, res)=>{

    Producto.find({disponible:true})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) =>{
            if (err){
                return res.status(400).json({
                ok: false,
                err
            });
        }res.json({
            ok:true,
            productos
            })
        })
});


app.get('/producto/:id', verificaToken, (req, res)=>{
    
    let id = req.params.id;
    
    Producto.findById(id)
            .populate('usuario', 'nombre email')
             .populate('categoria', 'descripcion')
             .exec( (err, productoDB) =>{
            if (err){
                return res.status(400).json({
                ok: false,
                err
            });
        }res.json({
            ok:true,
            producto: productoDB
            })
        })
    });
    

    app.get('/producto/buscar/:termino', verificaToken, (req, res)=>{
    
        let termino = req.params.termino;
        let regex = new RegExp(termino, 'i');
        
        Producto.find({nombre:regex})
                 .populate('categoria', 'nombre')
                 .exec( (err, productoDB) =>{
                if (err){
                    return res.status(400).json({
                    ok: false,
                    err
                });
            }res.json({
                ok:true,
                producto: productoDB
                })
            })
        });



app.post('/producto', verificaToken, (req, res)=>{

        let body = req.body;

        let producto = new Producto({
            nombre: body.nombre,
            precioUni: body.precioUni,
            descripcion: body.descripcion,
            disponible: body.disponible,
            categoria: body.categoria,
            usuario: req.usuario._id
            });

            producto.save((err, productoDB)=>{
                if (err) {
                    return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok:true,
                producto: productoDB
                })
            });
    
});

app.put('/producto/:id', verificaToken, (req, res)=>{

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, {new: true, runValidators:true}, (err, productoDB)=>{

        if (err){
            return res.status(500).json({
            ok: false,
            err
        });
    }
    if (!productoDB){
        return res.status(400).json({
            ok: false,
            err
        });
    }


        res.json({
            ok:true,
            producto: productoDB
        }); 
    })

    // actualizar categoria
 
    
});


app.delete('/producto/:id', verificaToken, (req, res) =>{
   
    
    let id = req.params.id;
    let body = _.pick(req.body, ['disponible']);

    Producto.findByIdAndUpdate(id, {disponible: false}, {new: true}, (err, productoBorrado)=>{
        
        if (err){
            return res.status(400).json({
            ok: false,
            err
        });
    };

    if(!productoBorrado){
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Producto no encontrado'
            }
        });
    }

    res.json({
        ok: true,
        producto: productoBorrado,
        mensaje: 'producto borrado'
    })


    })



});


module.exports = app;