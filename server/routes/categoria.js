const express = require('express');

let {verificaToken, verificaAdmin_Role} =require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


app.get('/categoria', verificaToken, (req, res)=>{

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) =>{
            if (err){
                return res.status(400).json({
                ok: false,
                err
            });
        }res.json({
            ok:true,
            categorias
            })
        })
});

app.get('/categoria/:id', verificaToken, (req, res)=>{
    
    let id = req.params.id;
    
    Categoria.findById(id, (err, categoriaDB) =>{
            if (err){
                return res.status(400).json({
                ok: false,
                err
            });
        }res.json({
            ok:true,
            categoria: categoriaDB
            })
        })
    });
    
    



app.post('/categoria/', verificaToken, (req, res)=>{

        let body = req.body;

        let categoria = new Categoria({
            descripcion : body.descripcion,
            usuario: req.usuario._id
            });

            categoria.save((err, categoriaDB)=>{
                if (err) {
                    return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!categoriaDB){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok:true,
                categoria: categoriaDB
                })
            });
    
});

app.put('/categoria/:id', verificaToken, (req, res)=>{

    let id = req.params.id;
    let body = req.body;
    let descCategoria = {descripcion: body.categoria};

    Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators:true}, (err, categoriaDB)=>{

        if (err){
            return res.status(500).json({
            ok: false,
            err
        });
    }
    if (!categoriaDB){
        return res.status(400).json({
            ok: false,
            err
        });
    }


        res.json({
            ok:true,
            categoria: categoriaDB
        }); 
    })

    // actualizar categoria
 
    
});

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res)=>{

    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndDelete(id, body, (err, usuarioBorrado)=>{
        
        if (err){
            return res.status(400).json({
            ok: false,
            err
        });
    };

    if(!usuarioBorrado){
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Usuario no encontrado'
            }
        });
    }

    res.json({
        ok: true,
        usuario: usuarioBorrado
    })
})
    // solo administrador puede borrar categorias
    // Categoria.findByIdAndRemove
    
});

module.exports = app;