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

const router = express.Router();

app.use(cookieParser());
app.use(fileUpload());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


router.get("/", (req, res) => {
  res.render("login",{msg:''});
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  res.clearCookie("email");
  res.clearCookie("Auth");
  res.clearCookie("control");
  res.redirect("/index.html");
});

router.post("/signup", (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  var file = req.files.profile;
  var type = file.mimetype;
  var imgName = file.name;
  const { full_name, email, rollno, password, description, DOB } = req.body;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/photos/upload/" + file.name, function (err) {
      if (err) return res.status(500).send(err);
      connection.query(
        `INSERT INTO users (roll_no,uname,emailid,password,description,dob,image)  VALUES (?,?,?,?,?,?,?)`,
        [rollno, full_name, email, password, description, DOB, imgName],
        (err, result) => {
          if (err) throw err;
          cook(res, email, password, "user");
          return res.render("user", {
            name: toTitleCase(full_name),
            email: email,
            DOB:  D_O_B(JSON.stringify(DOB)),
            desc: toTitleCase(description),
            message: "",
            pic: imgName,
          });
        }
      );
    });
  }
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  connection.query("SELECT * FROM users", function (err, result, fields) {
    var x = result.find((user) => {
      return user.emailid === email && user.password === password;
    });
    if (x) {
     
      cook(res, email, password, "user");
      return res.render("user", {
        name: toTitleCase(x.uname),
        email: x.emailid,
        DOB: D_O_B(JSON.stringify(x.dob)),
        desc: toTitleCase(x.description),
        message: "",
        pic: x.image,
      });
    }
    connection.query("SELECT * FROM admin", function (err, result, fields) {
      if (err) throw err;
      var y = result.find((admin) => {
        return admin.emailid === email && admin.password === password;
      });
      if (y) {
        cook(res, email, password, "admin");
        return res.render("admin", { name: y.name });
      } else {
        return res.render("login",{msg:'Please Enter Correct Credentials'});
      }
    });
  });
});

function cook(res, email, password, control) {
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
    })
    .cookie("control", control, {
      sameSite: "lax",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 100 * 10000000),
    });
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function D_O_B(str) {
  var paro = str.slice(1,11).split('-');
  return `${Number(paro[2])+1}/${paro[1]}/${paro[0]}`
}

module.exports = router;
