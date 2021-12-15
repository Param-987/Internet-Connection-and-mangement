const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const router = express.Router()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

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