const express = require('express')
const app = express()
// const https = require('https')
const bodyParser = require('body-parser');
const connection = require('./db_service')  // database connection

const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

router.get('/',(req,res)=>{
  res.render('ip')
})

router.get('/data',(req,res)=>{
  connection.query(`SELECT * FROM ip_address where email = '${req.cookies.email}' Order by Date_on,time desc`,(err,result,field)=>{
    if(err) res.status(404).send('<h1><em>404</em> Error Occured!!!</h1>');
    res.send(result.rows);
  })
})

router.get('/delete/:id',(req,res)=>{
     connection.query(`DELETE FROM ip_address WHERE ipid = ?`,[req.params.id],(err,result)=>{
      if (err) throw err;
      res.render('IP')
     })
})

router.post('/post',(req, res) => {
  var date = new Date();
        var currdate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        var currtime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        connection.query(`insert into ip_address(ipaddress,date_on,time,email)
        VALUES ('${req.body.ip}','${currdate}','${currtime}','${req.cookies.email}')`,
         (err, result)=> {
           if(err) res.status(404).send('Not able to post')
           else res.status(200).send('Posted Successfully')
         })
})

// router.get('/get',(req,res)=>{
//   http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
//     resp.on('data', function(ip) { ip = ''+ip;
//       var date = new Date();
//       var currdate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
//       var currtime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//       connection.query(`insert into ip_address(ipaddress,Date_on,time,email)
//       VALUES (?,?,?,?)`,[ip,currdate,currtime,req.cookies.email], function (err, result) {
//         if (err) throw err;
//         res.send(ip);
//       });
//     });
//   });
// })


module.exports = router;