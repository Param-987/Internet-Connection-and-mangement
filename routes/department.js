const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db_service')  // database connection
const  http = require('http');
const path = require('path');

const router = express.Router()

app.use(cors({origin:'*'}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('./public'))

router.get('/',(req,res)=>{
    res.render('department',{msg:''})
})
router.get('/data',(req,res)=>{
    connection.query(`SELECT * FROM department`,(err,result,fields)=>{
        if(err) res.send(res.sqlMessage) 
        
        if(req.cookies.Auth) return res.setHeader('ctrl',true).send(result.rows);
        else return res.setHeader('ctrl',false).send(result.rows);
    })
})
router.post('/data',(req,res)=>{
    connection.query(`INSERT INTO department(dep_name) values('${req.body.dep}')`,(err,result)=>{
        if(err) return err.sqlMessage
        res.status(200).send('Hello');
    })
})
router.get('/delete/:id',(req,res)=>{
    connection.query(`DELETE FROM department where dep_name = '${req.params.id}' `,(err,result)=>{
        if(err) return res.render('department',{msg:'The Deaprtment is under control an admin and a router is  installed in it . First remove them '})
        res.render('department',{msg:''});
    })
})


module.exports = router;