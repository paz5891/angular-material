const express = require ("express");
const mySqlCon = require ("../db/database");
const security = require ("../security/security");
const router = express.Router();


router.get('/facturas/:id/productos',security,(req,res)=>{
    console.log('GET productos_facturas con id de factura')
    mySqlCon.query("select productos_facturas.id, productos_facturas.producto_id, productos_facturas.cantidad, productos_facturas.subtotal, productos_facturas.creado_por from facturas join productos_facturas on facturas.id = productos_facturas.factura_id join productos on productos_facturas.producto_id = productos.id where facturas.id = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});


router.get('/productos-facturas',security,(req, res)=>{
    console.log('get productos_facturas')
    mySqlCon.query("select * from productos_facturas",(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
        }
    })
});

router.post('/productos-facturas',security,(req,res)=>{
    let emp = req.body;
    console.log('insert productos_facturas')
    mySqlCon.query('insert into productos_facturas (cantidad,creado_por,factura_id,producto_id,subtotal) values (?,?,?,?,?)',//no se agrego el id xq es autoincrementable
    [emp.cantidad,emp.creado_por,emp.factura_id,emp.producto_id,emp.subtotal], (err,result)=>{
        if(!err){
            res.send('created Succesfully');
        }else{
            console.log(err);
        }
    })
});


router.put('/productos-facturas',security,(req,res)=>{
    let emp = req.body;
    console.log('update productos_facturas')
    mySqlCon.query('update productos_facturas set producto_id=?, factura_id=?, cantidad=?, subtotal=?, creado_por=? where id = ?',
    [emp.producto_id,emp.factura_id,emp.cantidad,emp.subtotal,emp.creado_por,emp.id],(err,result)=>{
        if(!err){
            res.send('updated Succesfully');
        }else{
            console.log(err);
        }
    })
});


router.delete('/productos-facturas/:id',security, (req, res)=>{
    console.log('DELETE productos_facturas')
    mySqlCon.query('delete from productos_facturas where id = ?',
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