const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const  http = require('http');
const path = require('path');
const connection = require('./db_service') 
const router = express.Router()

app.use(cors({origin:'*'}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

router.get('/',(req,res)=>{
    res.render('addbbc',{msg:''})
  });
  
  router.get('/get',async(req,res)=>{
    connection.query(`SELECT * FROM isps`,(err,result,field)=>{
      if(err) throw err
      res.send(result.rows);
    })
  })

  router.get('/bbcselected',(req,res)=>{
    res.render('bbcselected');
  })

  router.get('/data',(req,res)=>{
    var sql = `SELECT cname,offer,dspeed, setup_cost ,monthly_cost ,annual_cost ,
    date_from ,date_to,package,cost,duration FROM isps INNER JOIN isp_selected on isp_selected.id = isps.id ORDER BY date_from DESC;`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      res.status(200).send(result.rows);
    });
  })
  
router.post('/buy',(req,res)=>{
    var id = Number(req.body.isp);
    var date_from = req.body.date;
    var package = req.body.package;
    var cost = (req.body.cost);
    var dur = Number(req.body.dur);
    
    var month = Number(date_from.split('-')[1]);
    var year = Number(date_from.split('-')[0]);
    if(package === 'monthly'){
         month = month+dur;
        if(month>12){ year +=1; month %=12;
    }}
    else year +=dur;
    var date_to = `${year}-${month}-${Number(date_from.split('-')[2])}`
    const query = `INSERT INTO isp_selected (id,date_from,date_to,package,cost,duration)
    VALUES (${id},'${date_from}','${date_to}','${package}','${cost}',${dur})`
    connection.query(query,(err, result)=> {
        if (err) throw err;
      });
    res.render('addbbc',{msg:'Your Request is recieved...'});
  })

module.exports = router
  