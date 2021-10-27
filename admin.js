const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");
const path = require("path");
const connection = require("./db_service");
const { json } = require("body-parser");

const router = express.Router();
app.use(express.static('public'))
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'))

router.get('/viewadmin',(req,res)=>{
  res.render('viewadmin',{ email:' ',fname:' ',phone:' '})
})

router.get('/adminform',(req,res)=>{res.render('adminform')})

// getting the data of the admin
router.get("/",  (req, res) => {
  connection.query(`SELECT * FROM admin`, function (err, result, fields) {
    if (err) throw err;
    var res1 = result;
    connection.query(`SELECT * FROM admin_dep`, (err, result, fields) => {
      if (err) throw err;
      var res2 = result;
      res.send({ res1, res2 });
    });
  });
});
// action completed

// add a new data to the admin db
router.post("/", function (req, res, next) {
  var fname = req.body.fname;
  var email = req.body.email;
  var password = req.body.pass;
  var date = req.body.date;
  var phone = req.body.phone;
  var depart = req.body.department;
  res.sendFile(path.join(__dirname, "public", "success.html"));

  // form data of routers added to database
  connection.query(
    `INSERT INTO admin (name,emailid, password,Date_on,phone_no) 
  VALUES (?,?,?,?,?)`,
    [fname, email, password, date, phone],
    function (err, result) {
      if (err) throw err;
      console.log("record inserted");
    }
  );

  for (x in depart) {
    connection.query(
      `INSERT INTO admin_dep (email,dep_head) 
    VALUES (?,?)`,
      [email, depart[x]],
      function (err, result) {
        if (err) throw err;
        console.log("record inserted");
      }
    );
  }
}); // completed added



router.get('/edit/:id',(req,res)=>{
 connection.query(`SELECT * FROM admin where emailid = ? `,[req.params.id], function (err, result, fields) {
    if(err) throw err;
    res.send(result)
  //   res.render('viewadmin',{email:result[0].emailid,fname:result[0].name,phone:result[0].phone_no,date:result[0].date_on
  // })
  })
  // res.send('gat vict')
})
router.post('/edit/update/:id',(req,res,next)=>{
  // console.log(req.body.email);
  connection.query(`UPDATE admin SET emailid = ? ,name = ?, phone_no =?  WHERE emailid = ?`,
  [req.body.email,req.body.name,req.body.phone,req.params.id], function (err, result) {
    if (err) throw err;
    res.render('viewadmin',{ email:' ',fname:' ',phone:' '})

  });
})

router.get('/delete/:email',(req,res)=>{
  connection.query(`DELETE FROM admin WHERE emailid = '${(req.params.email)}'`, function (err, result) {
    if (err) throw err;
    connection.query(`DELETE FROM admin_dep WHERE email = '${(req.params.email)}'`, function (err, result) {
      if (err) throw err;
    res.render('viewadmin',{ email:' ',fname:' ',phone:' '})
    });
  });
})

module.exports = router;
