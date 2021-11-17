const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); 
const axios = require("axios");
const mysql = require("mysql");
const cors = require("cors");
const connection = require("./routes/db_service"); // database connection 1
const http = require("http");
const path = require("path"); 
const fileUpload = require('express-fileupload');
const login = require("./routes/login"); // 2
const admin = require("./routes/admin"); // for adding a new admin  3
const modem = require("./routes/router"); // for adding a new admin  4
const ip = require("./routes/ip_address"); // for Ip address   5
const speed = require("./routes/speed"); // for internet speed test  6
const complaints = require("./routes/complaints");  //7
const bbc = require("./routes/bbc"); // for internet speed test  8
const department = require("./routes/department")
const user = require('./routes/user')
app.set("view engine", "ejs");  
    
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());   
app.use("/api/speed", speed); // use speed router
app.use("/department",department) // for departments view
app.use("/login", login);
  
app.use((req,res,next)=>{
  if( req.cookies.Auth) next();
  else res.sendFile(__dirname+'/public/index.html') 
})  
app.use('/user',user)
app.use("/router", modem); // use modem router
app.use("/complaints", complaints);
app.use("/bbc", bbc); // use speed router
app.use("/api/ip", ip); // use ip router 

app.use((req,res,next)=>{ 
  if( req.cookies.control === 'admin') next();
  else res.status(404).send('<h1> ERROR 404!!!! <br>The Page Not found</h1>');
}) 

app.use("/admin", admin); // use admin router
     
app.get('*',(req,res)=>{
    res.status(404).send('<h1> ERROR 404!!!! <br>The Page Not found</h1>');
  })
app.listen(1337, () => {
  console.log("server listen at port 1337");
});
  