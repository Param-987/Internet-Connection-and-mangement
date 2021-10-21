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
  res.render('login')
})

router.post('/',(req,res)=>{
    const {email,password }= req.body;
       connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        var x = result.find((user)=>{
          return user.emailid === email && user.password === password;
        })
        if(x) return res.redirect('/user.html');
        connection.query("SELECT * FROM admin", function (err, result, fields) {
          if (err) throw err;
          var y = result.find((admin)=>{
            return admin.emailid === email && admin.password === password;
          })
          if(y) return res.render('admin',{name:y.name});
          else return res.redirect('/login.html')
  
        })
    });
})


module.exports = router;