const express = require ("express");
const mySqlCon = require ("../db/database");
const security = require ("../security/security");
const router = express.Router();


router.get('/empleados',security,(req, res)=>{
    console.log('GET empleados')
    mySqlCon.query("Select * from empleados", (err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.get('/empleados/:id', security, (req, res)=>{
    console.log('GET empleados')
    mySqlCon.query("Select * from empleados where id = ?", [req.params.id], (err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.post('/empleados',security,(req,res)=>{
    let emp = req.body;
    console.log('POST empleados')
    mySqlCon.query('insert into empleados (nombre, codigo, salario, creado_por) values (?,?,?,?)',
    [emp.nombre,emp.codigo,emp.salario,emp.creado_por], (err,result)=>{
        if(!err){
            res.send('created successfully');
         }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
         }
    })
});

router.put('/empleados/:id', security, (req,res)=>{
    let emp = req.body;
    console.log('PUT empleados')
    mySqlCon.query('update empleados set nombre = ?, codigo=?, salario=?, creado_por=? where id = ?',
    [emp.nombre,emp.codigo,emp.salario,emp.creado_por,req.params.id],(err,result)=>{
        if(!err){
            res.send('updated successfully');            
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.delete('/empleados/:id',security, (req, res)=>{
    console.log('DELETE empleados')
    mySqlCon.query('delete from empleados where id = ?',
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