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

router.get("/isAuth", (req, res) => {
  if (req.cookies !== undefined && req.cookies.Auth === "true") {
    res.send({ true: true, auth: req.cookies.auth, email: req.cookies.email });
  } else {
    res.send(false);
  }
});

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const { full_name, email, rollno, password, description } = req.body;
  connection.query(
    `INSERT INTO users(roll_no,uname,emailid,password,description) VALUES (?,?,?,?,?)`,
    [rollno, full_name, email, password, description],
    (err, result) => {
      if (err) throw err;
      console.log("1 record inserted");
      res.render("login");
    }
  );
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  connection.query("SELECT * FROM users", function (err, result, fields) {
    var x = result.find((user) => {
      return user.emailid === email && user.password === password;
    });
    if (x) {
      cook(res,email, password);
      return res.render("user",{
        name:toTitleCase(x.uname),
        email:x.emailid,
        DOB:'20-03-2001',
       desc:toTitleCase(x.description)
      });
    }
    connection.query("SELECT * FROM admin", function (err, result, fields) {
      if (err) throw err;
      var y = result.find((admin) => {
        return admin.emailid === email && admin.password === password;
      });
      if (y) {
        cook(res, email, password);
        return res.render("admin", { name: y.name });
      } else { return  res.render("login"); }
    });
  });
});

function cook(res,  email, password) {
  res
    .cookie("email", email, {
      sameSite: "lax",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 100 * 10000000),
    })
    .cookie("Auth", true, {
      sameSite: "lax",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 100 * 10000000),
    });
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

module.exports = router;
