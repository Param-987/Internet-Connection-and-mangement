const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const fileUpload = require("express-fileupload");
const connection = require("./db_service");
const fs = require("fs");

const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload());


router.get("/data", (req, res) => {
  connection.query(
    `SELECT * from users where emailid = '${req.cookies.email}'`,
    (err, result, field) => {
      res.send(result.rows[0]);
    }
  );
});

router.post("/edit/:id/:dob/:img", (req, res) => {
  connection.query(
    `UPDATE users SET emailid = '${req.body.email}' 
        ,uname = '${req.body.name}',
         password = '${req.body.password}',
         roll_no = '${req.body.rollno}' ,
         description = '${req.body.description}'
          WHERE emailid = '${req.params.id}'`,
    function (err, result) {
      if (err) throw err;
      res.render("user", {
        name: toTitleCase(req.body.name),
        email: req.body.email,
        DOB: D_O_B(JSON.stringify(req.params.dob)),
        desc: toTitleCase(req.body.description),
        message: "",
        pic: req.params.img,
      });
    }
  );
});

router.post("/dp", (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  var file = req.files.image;
  var type = file.mimetype;
  var imgName = file.name;
  var email = req.cookies.email; 
  connection.query(
    `Select image from users where emailid = '${email}'`,
    async (err, result, field) => {
      if (err) console.log(err);

      let file = "public/photos/upload/" + result.rows[0].image;
     const pia = await getres(file); 
      if(pia) fs.unlinkSync(file);
    } 
  );
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/photos/upload/" + file.name, function (err) {
      if (err) return res.status(500).send(err);
      connection.query(
        `UPDATE users SET image = '${file.name}' where emailid = '${req.cookies.email}'`,
      );
    });
  }

  connection.query(
    `SELECT * from users where emailid = '${email}'`,
    (err, result, field) => {
      if (err) throw err;
      res.render("user", {
        name: toTitleCase(result.rows[0].uname),
        email: email,
        DOB: D_O_B(JSON.stringify(result.rows[0].dob)),
        desc: toTitleCase(result.rows[0].description),
        message: "",
        pic: file.name,
      });
    }
  );
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function D_O_B(str) {
  var paro = str.slice(1, 11).split("-");
  return `${Number(paro[2]) + 1}/${paro[1]}/${paro[0]}`;
}

   const fileExists = async(file) => {
        return  await new Promise((resolve) => {
           fs.access(file, fs.constants.F_OK,async (err) => {
            err ? resolve(false) : resolve(true);
          });
        });
      };

      const getres = async(file)=>{
        const a = await  fileExistsSync(file);
         return a;
      }

      const fileExistsSync = async(file) => {
        try {
          fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK)
          .then((resp)=>console.log(resp));
          return true;
        } catch (err) {
          return false;
        }
      };




module.exports = router;
