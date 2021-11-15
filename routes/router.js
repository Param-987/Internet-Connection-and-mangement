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

router.get("/dep", (req, res) => {

  connection.query(
    "SELECT dep_name FROM department WHERE dep_name not in (select dep_install FROM router);",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
    ); 
  });

 router.get('/query',(req,res)=>{
   console.log(req.query);
   connection.query('SELECT * FROM ROUTER WHERE rname = ?',[req.query.router],(err,result,fields)=>{
     if(err) return console.log(err);
     res.setHeader('control',req.cookies.control).send(result)
   })
  //  res.send('PAram')
 }) 

router.get('/',(req,res)=>{
  res.render('viewrouter')
})

router.get('/get',(req,res)=>{
  connection.query("SELECT * FROM router", function (err, result, fields) {
    if (err) throw err;
    res.setHeader('control',req.cookies.control).send(result) // header set to ensure that admin is viewing to provide cred operation to him 
  });
})

router.get('/delete/:id',(req,res)=>{
  connection.query(`DELETE FROM router WHERE rname = '${req.params.id}'`, function (err, result) {
    if (err) throw err;
    res.render('viewrouter')
  });
})



router.get('/routerform',(req,res)=>{res.render('routerform',{msg:'',color:'green'})})

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
      res.render('viewrouter')
      
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
        res.render('routerform',{msg:'Router with entered name entered is previously deployed',color:'color:#630000'});
    }else { 
      res.render('routerform',{msg:'New Router with credentials Added',color:'color:greenyellow'})
    }
  });
});  // completed added 

  module.exports = router;