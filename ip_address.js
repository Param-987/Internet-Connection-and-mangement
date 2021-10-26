const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const axios = require('axios')
const mysql = require('mysql')
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
  res.render('ip')
})

router.get('/get',(req,res)=>{
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) { ip = ''+ip;
      var date = new Date();
      var currdate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      var currtime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      connection.query(`insert into ip_address(ipaddress,Date_on,time,email)
      VALUES (?,?,?,?)`,[ip,currdate,currtime,"20bcs151@iiitdmj.ac.in"], function (err, result) {
        if (err) throw err;
        console.log('done succesfully');
      });
      res.send(ip);
    });
  });
})


module.exports = router;