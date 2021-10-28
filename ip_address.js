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

router.get('/data',(req,res)=>{
  connection.query(`SELECT * FROM ip_address where email = ? Order by Date_on desc`,[req.cookies.email],(err,result,field)=>{
    if(err) throw err;
    res.send(result);
  })
})

router.get('/delete/:id',(req,res)=>{
     console.log(req.params.id);
     connection.query(`DELETE FROM ip_address WHERE ipid = ?`,[req.params.id],(err,result)=>{
      if (err) throw err;
      res.render('IP')
     })
    //  res.send('got it')
})

router.get('/get',(req,res)=>{
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) { ip = ''+ip;
      var date = new Date();
      var currdate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      var currtime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      connection.query(`insert into ip_address(ipaddress,Date_on,time,email)
      VALUES (?,?,?,?)`,[ip,currdate,currtime,req.cookies.email], function (err, result) {
        if (err) throw err;
        res.send(ip);
      });
    });
  });
})


module.exports = router;