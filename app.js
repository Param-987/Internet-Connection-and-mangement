const express = require('express')
const app = express()
const axios = require('axios')
const mysql = require('mysql')
const connection = require('./db_service')  // database connection
var http = require('http');


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('../public'))

app.get('/api/ip',(req,res)=>{
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) { ip = ''+ip;
      var date = new Date();
      var currdate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      var currtime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      connection.query(`insert into ip_address(ipaddress,Date_on,Time_on,Roll_no)
      VALUES (?,?,?,?)`,[ip,currdate,currtime,"20bcs150"], function (err, result) {
        if (err) throw err;
        console.log('done succesfully');
      });
      res.send(ip);
    });
  });
})




const FastSpeedtest = require("fast-speedtest-api");
 
let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
});

app.get('/dep',(req,res)=>{
  connection.connect(function(err) {
    connection.query("SELECT * FROM department", function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.send(result)
    });
  });
})
 
app.get('/api/speed',(req,res)=>{
  speedtest.getSpeed().then(s => {  s=''+s;  res.send(s)
  }).catch(e => { console.error(e.message);
  });
})
app.listen(1337,()=>{console.log('server listen at port 3000')})
