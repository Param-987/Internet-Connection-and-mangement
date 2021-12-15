const express = require('express')
const app = express()
const  http = require('http');
const path = require('path');
const connection = require('./db_service') 

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

router.get("/dep", (req, res) => {
  connection.query(
    "SELECT dep_name FROM department WHERE dep_name not in (select dep_install FROM router);",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result.rows);
    }
    ); 
  });

 router.get('/query',(req,res)=>{
   const query = `SELECT * FROM router WHERE dep_install like '${"%"+req.query.router+"%"}'`
   connection.query(query,(err,result,fields)=>{
     if(err) return console.log(err);
     res.setHeader('control',req.cookies.control).send(result.rows)
   })
 }) 

router.get('/',(req,res)=>{
  res.render('viewrouter')
})

router.get('/get',(req,res)=>{
  connection.query("SELECT * FROM router", function (err, result, fields) {
    if (err) throw err;
    res.setHeader('control',req.cookies.control).send(result.rows) // header set to ensure that admin is viewing to provide cred operation to him 
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
    res.send(result.rows)
  });
  
})

router.post('/edit/update/:id',(req,res,next)=>{
  const {rname,rpassword,Mdate,dep,rs,rd} = req.body;
  const query = `UPDATE router SET rname ='${rname}', rpassword ='${rpassword}',dep_install ='${dep}' 
    WHERE rname = '${req.params.id}'`
    connection.query(query,
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
    const query = `INSERT INTO router(rname,rpassword,date_of_install,dep_install) 
    VALUES ('${rname}','${password}','${date}','${depart}')`
  connection.query(query,function(err, result) {
    if (err) {
        res.render('routerform',{msg:'Router with entered name entered is previously deployed',color:'color:#630000'});
    }else { 
      res.render('routerform',{msg:'New Router with credentials Added',color:'color:greenyellow'})
    }
  });
});  // completed added 

  module.exports = router;