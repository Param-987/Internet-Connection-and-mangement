const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");
const path = require("path");
const connection = require("./db_service");
// const { json } = require("body-parser");

const router = express.Router();
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"));

router.get("/dep", (req, res) => {
  connection.query(
    "SELECT dep_name FROM department WHERE dep_name not in (select dep_head FROM admin_dep);",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
    ); 
  });



router.get("/viewadmin", (req, res) => {
  res.render("viewadmin");
});

router.get("/adminform", (req, res) => {
  res.render("adminform", { msg: "",color:'' });
});

// getting the data of the admin
router.get("/viewadmin/data", (req, res) => {
  connection.query(`SELECT * FROM admin`, function (err, result, fields) {
    if (err) throw err;
    var res1 = result;
    connection.query(`SELECT * FROM admin_dep`, (err, result, fields) => {
      if (err) throw err;
      var res2 = result;
      res.setHeader('emailid',req.cookies.email).send({ res1, res2 });
    });
  });
});
// action completed

// add a new data to the admin db
router.post("/", function (req, res, next) {

// var cond = true;
   var {fname,email,pass,date,phone,department} = req.body;
  // form data of routers added to database
  connection.query(
    `INSERT INTO admin(name,emailid, password,Date_on,phone_no) 
  VALUES (?,?,?,?,?)`, [fname, email, pass, date, phone],(err, result)=> {
      if (err){ console.log('Param')
         console.log(err);
        return res.render('adminform',{msg:'ERROR!!!  Email entered already belongs to an Admin',color:'color:#630000'})
       }
      if (typeof department == "string"){ department =new Array(department) ;}
      for (var x in department) {
       connection.query(
      `INSERT INTO admin_dep (email,dep_head) VALUES (?,?)`, [email, department[x]], (err, result)=> {
      }
      )} 
      res.render("adminform", { msg: "Admin Created Successfully",color:'color:greenyellow'}) ;
  });
}); // completed added

router.get("/edit/:id", (req, res) => {
  connection.query(
    `SELECT * FROM admin where emailid = ? `,
    [req.params.id],
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});
router.post("/edit/update/:id", (req, res, next) => {
  connection.query(
    `UPDATE admin SET emailid = ? ,name = ?, phone_no =?,password = ?  WHERE emailid = ?`,
    [req.body.email, req.body.name, req.body.phone,req.body.password, req.params.id],
    function (err, result) {
      if (err) return res.send(err.sqlMessage);
      res.render("viewadmin");
    }
  );
});

router.get("/delete/:email", (req, res) => {
  connection.query(
    `DELETE FROM admin WHERE emailid = '${req.params.email}'`,
    function (err, result) {
      if (err) return res.send(err.sqlMessage);
      console.log('Param')
      connection.query(
        `DELETE FROM admin_dep WHERE email = '${req.params.email}'`,
        function (err, result) { 
          if (err){ console.log(err);
             return res.send(err.sqlMessage); }
          if(req.params.email === req.cookies.email) res.redirect('http://localhost:1337/');
          else res.render("viewadmin");
        }
      );
    }
  );
});

module.exports = router;
