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

router.get('/',(re,res)=>{
    res.render('speed');
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


router.get('/get',(req,res)=>{
    speedtest.getSpeed().then(s => {  s=''+s;  res.send(s)
    }).catch(e => { console.error(e.message);
    });
  })


  module.exports = router;