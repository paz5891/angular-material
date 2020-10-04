const express = require ("express");
const mySqlCon = require ("../db/database");
const security = require ("../security/security");
const router = express.Router();

router.get('/productos',security,(req, res)=>{
    console.log('get productos')
    mySqlCon.query("select * from productos",(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.get('/productos/:id', security, (req, res)=>{
    console.log('GET productos')
    mySqlCon.query("Select * from productos where id = ?", 
    [req.params.id], (err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.post('/productos',security,(req,res)=>{
    let pro = req.body;
    console.log('POST productos')
    mySqlCon.query('insert into productos (nombre, precio, creado_por) values (?,?,?)',
    [pro.nombre,pro.precio,pro.creado_por], (err,result)=>{
        if(!err){
            res.send('created successfully');
         }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
         }
    })
});

router.put('/productos/:id', security, (req,res)=>{
    let pro = req.body;
    console.log('PUT productos')
    mySqlCon.query('update productos set nombre=?, precio=?, creado_por=? where id = ?',
    [pro.nombre,pro.precio,pro.creado_por,req.params.id],(err,result)=>{
        if(!err){
            res.send('updated successfully');            
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.delete('/productos/:id',security, (req, res)=>{
    console.log('DELETE productos')
    mySqlCon.query('delete from productos where id = ?',
    [req.params.id], (err,result)=>{
        if(!err){
            res.send('deleted successfully');
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

module.exports = router;