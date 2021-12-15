const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connection = require("./db_service");

const router = express.Router();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get('/',(req,res)=>{
    res.render('viewcomplaints')
})

router.get('/get',(req,res)=>{
    var ctrl = req.cookies.control;
    if(ctrl==='user'){
        var email = req.cookies.email;
        connection.query(`SELECT * from complaints where cemail= '${email}' order by cdate desc`,
        (err,result,fields)=>{
            if(err) throw err;
            res.setHeader('control',ctrl).send(result.rows);
        })
    }
    else{
        connection.query(`SELECT * from complaints ORDER BY cdate  `,(err,result,fields)=>{
            if(err) throw err;
            res.setHeader('control',ctrl).send(result.rows);
        })

    }
})

router.get('/delete/:id',(req,res)=>{
    connection.query(`DELETE FROM complaints where cid = '${req.params.id}'`,(err,result)=>{
        if(err) throw err;
        res.render('viewcomplaints')
    })
})

router.post('/',(req,res)=>{
    var cemail = req.cookies.email
    var cdescription = req.body.complaint
    var date  = new Date();
    var dated  = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`
    connection.query(`INSERT INTO complaints(cdate,cdescription,cemail) 
    VALUES ('${dated}','${cdescription}','${cemail}')`
    ,(err,result)=>{
        if (err) throw err;
        connection.query(`SELECT * FROM users WHERE emailid = '${cemail}'`,(err,result,field)=>{
            if(err) throw err;
            res.render("user", {
                    name: toTitleCase(result.rows[0].uname),
                    email: result.rows[0].emailid,
                    DOB: D_O_B(JSON.stringify(result.rows[0].dob)),
                    desc: toTitleCase(result.rows[0].description),
                    pic: result.rows[0].image,
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

function D_O_B(str) {
    var paro = str.slice(1,11).split('-');
    return `${Number(paro[2])+1}/${paro[1]}/${paro[0]}`
  }






module.exports = router
