const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios')
const mysql = require('mysql')
const cors = require('cors');
const  http = require('http');
const path = require('path');
const connection = require('./db_service') 

const router = express.Router()

app.use(cors({origin:'*'}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

router.get('/',(req,res)=>{
  res.render('viewrouter',{rname:'',rpassword:'',Mdate:'',dep:'',rs:'',rd:''})
})

router.get('/get',(req,res)=>{
  connection.query("SELECT * FROM router", function (err, result, fields) {
    if (err) throw err;
    res.setHeader('control',req.cookies.control).send(result)
  });
})

router.get('/delete/:id',(req,res)=>{
  connection.query(`DELETE FROM router WHERE rname = '${req.params.id}'`, function (err, result) {
    if (err) throw err;
    res.render('viewrouter',{rname:'',rpassword:'',Mdate:'',dep:'',rs:'',rd:''})
  });
})



router.get('/routerform',(req,res)=>{res.render('routerform')})

router.get('/edit/:id',(req,res)=>{
  connection.query(`SELECT * FROM router WHERE rname = '${req.params.id}'`, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
  
})

router.post('/edit/update/:id',(req,res,next)=>{
    connection.query(`UPDATE router SET rname = ?, rpassword = ? , malfunction_date = ?,dep_install = ?, rep_status = ? ,rep_date = ?  WHERE rname = ?`,
    [req.body.rname,req.body.rpassword,req.body.Mdate,req.body.dep,req.body.rs,req.body.rd,req.params.id],
     function (err, result) {
      if (err) throw err;
      res.render('viewrouter',{rname:'',rpassword:'',Mdate:'',dep:'',rs:'',rd:''})
      
  });
})

router.post('/', function(req, res, next) {
  var rname = req.body.rname;
  var password = req.body.pass;
  var date = req.body.date
  var depart = req.body.department;
 
    // form data of routers added to database
  connection.query(`INSERT INTO router (rname,rpassword,Date_of_install,dep_install) 
  VALUES (?,?,?,?)`,[rname,password,date,depart], function(err, result) {
    if (err) {
        res.send('U entered some wrong credentials ,probably router name entered is previously employed');
    }else { 
        res.send('Record added succesfully')
    }
  });
});  // completed added 

  module.exports = router;