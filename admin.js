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
  res.sendFile(path.join(__dirname,'public','routerform.html'))
})

router.post('/', function(req, res, next) {
  var fname = req.body.fname;
  var email = req.body.email;
  var password = req.body.pass;
  var date = req.body.date
  var phone = req.body.phone;
  var depart = req.body.department;
    res.sendFile(path.join(__dirname,'public','success.html'));
 
    // form data of routers added to database
  connection.query(`INSERT INTO admin (name,emailid, password,Date_on,phone_no) 
  VALUES (?,?,?,?,?)`,[fname,email,password,date,phone], function(err, result) {
    if (err) throw err;
    console.log('record inserted');
  });

   for(x in depart){
    connection.query(`INSERT INTO admin_dep (email,dep_head) 
    VALUES (?,?)`,[email,depart[x]], function(err, result) {
      if (err) throw err;
      console.log('record inserted');
    });

   }
});  // completed added 

  module.exports = router;