const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");
const path = require("path");
const connection = require("./db_service");

const router = express.Router();

app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get('/',(req,res)=>{
    res.render('viewcomplaints')
})

router.get('/get',(req,res)=>{
    var ctrl = req.cookies.control;
    if(ctrl==='user'){
        var email = req.cookies.email;
        connection.query(`SELECT * FROm complaints where cemail= ?`,[email],(err,result,fields)=>{
            if(err) throw err;
            res.setHeader('control',ctrl).send(result);
        })
    }
    else{
        connection.query(`SELECT * FROm complaints ORDER BY cdate `,(err,result,fields)=>{
            if(err) throw err;
            res.setHeader('control',ctrl).send(result);
        })

    }
})

router.get('/delete/:id',(req,res)=>{
    console.log(req.params.id);
    // res.send('paro')
    connection.query('DELETE FROM complaints where cid =  ?',[req.params.id],(err,result)=>{
        if(err) throw err;
        res.render('viewcomplaints')
    })
})

router.post('/',(req,res)=>{
    var cemail = req.cookies.email
    var cdescription = req.body.complaint
    var date  = new Date();
    var dated  = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`
    connection.query(`INSERT INTO complaints(cdate,cdescription,cemail) VALUES (?,?,?)`,
    [dated,cdescription,cemail],(err,result)=>{
        if (err) throw err;
        connection.query(`SELECT * FROM users WHERE emailid = ?`,[cemail],(err,result,field)=>{
            if(err) throw err;
            res.render("user", {
                    name: toTitleCase(result[0].uname),
                    email: result[0].emailid,
                    DOB: "20-03-2001",
                    desc: toTitleCase(result[0].description),
                    message:'Complaint has been sent succesfully'
                  })
        })
    })
})


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}






module.exports = router
