const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");
const path = require("path");
const fileUpload = require("express-fileupload");
const connection = require("./db_service");
const fs = require('fs')

const router = express.Router();

app.use(cookieParser());
app.use(fileUpload());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get('/data',(req,res)=>{
    connection.query(`SELECT * from users where emailid = ?`,[req.cookies.email],(err,result,field)=>{
        res.send(result[0])
    })
})

router.post('/edit/:id/:dob/:img',(req,res)=>{
    connection.query(
        `UPDATE users SET emailid = ? ,uname = ?, password =? ,roll_no = ? ,description = ? WHERE emailid = ?`,
        [req.body.email, req.body.name, req.body.password, req.body.rollno,req.body.description,req.params.id],
        function (err, result) {
          if (err) throw err;
          res.render('user',{
            name: toTitleCase(req.body.name),
            email: req.body.email,
            DOB:  D_O_B(JSON.stringify(req.params.dob)),
            desc: toTitleCase(req.body.description),
            message: "",
            pic: req.params.img, 

          })
        }
      );    
})


 
router.post('/dp',(req,res)=>{
    if (!req.files) return res.status(400).send("No files were uploaded.");
  var file = req.files.image;
  var type = file.mimetype;
  var imgName = file.name;
  var email = req.cookies.email;
  connection.query(`Select image from users where emailid = ?`,[email],(err,result,field)=>{
      if(err) throw err;
      fs.unlinkSync("public/photos/upload/" + result[0].image);
  })
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" 
  ) {
    file.mv("public/photos/upload/" + file.name, function (err) {
        if (err) return res.status(500).send(err);
        connection.query(
          `UPDATE users SET image = ? where emailid = ?`,
          [file.name,req.cookies.email]) })}

          connection.query(`SELECT * from users where emailid = ?`,[email],(err,result,field)=>{
              if(err) throw err;
              res.render("user", {
              name: toTitleCase(result[0].uname),
              email: email,
              DOB:  D_O_B(JSON.stringify(result[0].dob)),
              desc: toTitleCase(result[0].description),
              message: "",
              pic: file.name, 
            });
          })
})


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  function D_O_B(str) {
    var paro = str.slice(1,11).split('-');
    return `${Number(paro[2])+1}/${paro[1]}/${paro[0]}`
  }







module.exports =  router;