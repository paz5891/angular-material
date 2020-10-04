const express = require ("express");
const mySqlCon = require ("../db/database");
const security = require ("../security/security");
const router = express.Router();


router.get('/clientes',security,(req, res)=>{
    console.log('GET clientes')
    mySqlCon.query("Select * from clientes", (err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.get('/clientes/:id', security, (req, res)=>{
    console.log('GET clientes')
    mySqlCon.query("Select * from clientes where id = ?", [req.params.id], (err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.post('/clientes',security,(req,res)=>{
    let cli = req.body;
    console.log('POST clientes')
    mySqlCon.query('insert into clientes (nombre, nit, direccion, creado_por) values (?,?,?,?)',
    [cli.nombre,cli.nit,cli.direccion,cli.creado_por], (err,result)=>{
        if(!err){
            res.send('created successfully');
         }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
         }
    })
});

router.put('/clientes/:id', security, (req,res)=>{
    let cli = req.body;
    console.log('PUT clientes')
    mySqlCon.query('update clientes set nombre=?, nit=?, direccion=?, creado_por=? where id = ?',
    [cli.nombre,cli.nit,cli.direccion,cli.creado_por,req.params.id],(err,result)=>{
        if(!err){
            res.send('updated successfully');            
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.delete('/clientes/:id',security, (req, res)=>{
    console.log('DELETE clientes')
    mySqlCon.query('delete from clientes where id = ?',
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