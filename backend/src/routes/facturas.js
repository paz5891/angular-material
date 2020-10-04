const express = require ("express");
const mySqlCon = require ("../db/database");
const security = require ("../security/security");
const router = express.Router();


router.get('/facturas',security,(req, res)=>{
    console.log('get facturas')
    mySqlCon.query("select * from facturas",(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});
router.get('/clientes/:id/facturas',security,(req, res)=>{
    console.log('GET facturas por id de clientes')
    mySqlCon.query("select facturas.id, facturas.cliente_id, facturas.empleado_id, facturas.creado, facturas.estado from facturas join clientes on facturas.cliente_id = clientes.id where clientes.id = 4",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.get('/empleados/:id/facturas',security,(req, res)=>{
    console.log('GET facturas por id de empleados')
    mySqlCon.query("select facturas.id, facturas.cliente_id, facturas.empleado_id, facturas.creado, facturas.estado from facturas join empleados on facturas.empleado_id = empleados.id where empleados.id = ?", [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.get('/facturas/:id', security, (req, res)=>{
    console.log('GET facturas')
    mySqlCon.query("Select * from facturas where id = ?", [req.params.id], (err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.post('/facturas',security,(req,res)=>{
    let emp = req.body;
    console.log('POST facturas')
    mySqlCon.query('insert into facturas (cliente_id,empleado_id,creado,estado) values (?,?,NOW(),?)',
    [emp.cliente_id,emp.empleado_id,emp.estado], (err,result)=>{
        if(!err){
            res.send('created Succesfully');
        }else{
            console.log(err);
        }
    })
});


router.put('/facturas/:id', security, (req,res)=>{
    let fac = req.body;
    console.log('PUT facturas con id')
    mySqlCon.query('update facturas set cliente_id=?, creado=?, empleado_id=?, estado=? where id = ?',
    [fac.cliente_id,fac.creado,fac.empleado_id,fac.estado,req.params.id],(err,result)=>{
        if(!err){
            res.send('updated successfully');            
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});


// router.put('/facturas/:id', security, (req,res)=>{
//     let fac = req.body;
//     console.log('PUT facturas')
//     mySqlCon.query('update facturas set cliente_id=?, creado=?, empleado_id=?, estado=? where id = ?',
//     [fac.cliente_id,fac.creado,fac.empleado_id,fac.estado,req.params.id],(err,result)=>{
//         if(!err){
//             res.send('updated successfully');            
//         }else{
//             console.log(err.sqlMessage);
//             res.status(500).send(err.sqlMessage);
//         }
//     })
// });

/* ingresar en el body PROCESO, CREADO, CANCELADO, ANULADA*/
router.patch('/facturas/:id', security, (req,res)=>{
    let fac = req.body;
    console.log('PATCH Y DELETE facturas')
    mySqlCon.query('update facturas set estado= ? where id = ?',
    [fac.estado,req.params.id],(err,result)=>{
        if(!err){
            res.send('updated successfully');            
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

// router.delete('/facturas/:id', security, (req,res)=>{
//     let fac = req.body;
//     console.log('Patch facturas')
//     mySqlCon.query('update facturas set estado= ANULADA where id = ?',
//     [fac.estado,req.params.id],(err,result)=>{
//         if(!err){
//             res.send('updated successfully');            
//         }else{
//             console.log(err.sqlMessage);
//             res.status(500).send(err.sqlMessage);
//         }
//     })
// });

router.delete('/facturas/:id',security, (req, res)=>{
    console.log('DELETE facturas')
    mySqlCon.query('delete from facturas where id = ?',
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