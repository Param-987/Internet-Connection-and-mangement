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
    console.log(req.body);
    
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
        console.log('record inserted');
        res.send('Record added succesfully')
    }
  });
});  // completed added 

  module.exports = router;