const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser');
const axios = require('axios')
const mysql = require('mysql')
const cors = require('cors');
const connection = require('./db_service')  // database connection
const http = require('http');
const methodOverride = require('method-override')
const path = require('path'); 
const login = require('./login')
const admin = require('./admin') // for adding a new admin 
const modem = require('./router') // for adding a new admin 
const ip = require('./ip_address')  // for Ip address
const speed = require('./speed')  // for internet speed test  
const bbc = require('./bbc')  // for internet speed test  
app.set('view engine', 'ejs');

app.use(session ({
  name:"sid",
  secret:"key that will sign cookie",
  resave:false,
  saveUninitialized:false,
  cookies : {
    maxAge:1000*60*60*2,
    sameSite:true,
    secure:false
  }
}))

app.use(cors({origin:'*'}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use('/admin',admin)  // use admin router
app.use('/router',modem)  // use modem router
app.use('/api/ip',ip)   // use ip router
app.use('/api/speed',speed)  // use speed router
app.use('/bbc',bbc)  // use speed router
app.use('/login',login)
 
app.get('/ses',(req,res)=>{
  console.log(__dirname);
  res.render('/success.html');
})

  // res.send('got ur response')
  // res.send(req.session);
  // const {userId} = req.session
  // console.log(userId);





// app.post('/logout',(req,res)=>{
//   req.session.destroy(err=>{
//     if(err){
//       return res.redirect('/home')
//     }
//     res.clearCookie('sid')
//     res.redirect('/')
//   })

// })


app.get('/dep',(req,res)=>{
  connection.connect(function(err) {
    connection.query("SELECT * FROM department", function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  });
})
 

app.listen(1337,()=>{console.log('server listen at port 3000')})
